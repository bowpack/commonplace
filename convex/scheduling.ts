import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery, query } from "./_generated/server";
import { internal, api } from "./_generated/api";

const HOURS_6 = 6 * 60 * 60 * 1000;
const HOURS_24 = 24 * 60 * 60 * 1000;
const HOURS_48 = 48 * 60 * 60 * 1000;
const HOURS_72 = 72 * 60 * 60 * 1000;

// Get the scheduling state for a book
export const getBookSchedulingState = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const book = await ctx.db.get(args.bookId);
    if (!book || book.status !== "active") return null;

    // Get the most recent sent prompt
    const sentPrompts = await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId_status", (q) =>
        q.eq("bookId", args.bookId).eq("status", "sent")
      )
      .collect();

    // Get answered prompts to know where we are in the sequence
    const answeredPrompts = await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId_status", (q) =>
        q.eq("bookId", args.bookId).eq("status", "answered")
      )
      .collect();

    // Get the storyteller
    const storyteller = await ctx.db.get(book.storytellerId);

    return {
      book,
      storyteller,
      currentSentPrompt: sentPrompts[0] ?? null,
      answeredCount: answeredPrompts.length,
    };
  },
});

// The main scheduling action that runs on the cron
export const runScheduler = internalAction({
  args: {},
  handler: async (ctx) => {
    // Get all active books
    const activeBooks = await ctx.runQuery(
      internal.scheduling.getActiveBooks
    );

    for (const book of activeBooks) {
      await processBook(ctx, book._id);
    }
  },
});

async function processBook(
  ctx: { runQuery: typeof Function.prototype; runMutation: typeof Function.prototype; runAction: typeof Function.prototype },
  bookId: string
) {
  const state = await ctx.runQuery(api.scheduling.getBookSchedulingState, {
    bookId: bookId as any,
  });

  if (!state || !state.storyteller?.phone) return;

  const now = Date.now();

  if (state.currentSentPrompt) {
    // There's an outstanding prompt — check if we need to nudge
    const sentAt = state.currentSentPrompt.sentAt ?? 0;
    const elapsed = now - sentAt;
    const attempts = state.currentSentPrompt.attemptCount;

    if (elapsed > HOURS_72) {
      // 72h+ — notify listener to prod in person
      await ctx.runMutation(internal.scheduling.notifyListenerToNudge, {
        bookId: bookId as any,
      });
    } else if (elapsed > HOURS_48 && attempts < 3) {
      // 48h — mark skipped, queue an easier prompt
      await ctx.runMutation(internal.scheduling.skipAndQueueNext, {
        promptQueueId: state.currentSentPrompt._id,
        bookId: bookId as any,
      });
    } else if (elapsed > HOURS_24 && attempts < 2) {
      // 24h — send the b-variant nudge
      await ctx.runAction(internal.scheduling.sendNudge, {
        promptQueueId: state.currentSentPrompt._id as any,
        phone: state.storyteller.phone,
        bookId: bookId as any,
      });
    }
    // Otherwise, wait
  } else {
    // No outstanding prompt — check if it's time to send one
    // Find the last answered prompt to check pacing
    const lastAnswered = await ctx.runQuery(
      internal.scheduling.getLastAnsweredTime,
      { bookId: bookId as any }
    );

    const pacingMs = (state.book.settings.pacingDays ?? 2.5) * 24 * 60 * 60 * 1000;
    const timeSinceLastAnswer = now - (lastAnswered ?? 0);

    if (timeSinceLastAnswer >= pacingMs || !lastAnswered) {
      // Time to send the next prompt
      await ctx.runAction(internal.scheduling.sendNextPrompt, {
        bookId: bookId as any,
        phone: state.storyteller.phone,
      });
    }
  }
}

export const getActiveBooks = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("books")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
  },
});

export const getLastAnsweredTime = internalQuery({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const answered = await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId_status", (q) =>
        q.eq("bookId", args.bookId).eq("status", "answered")
      )
      .order("desc")
      .first();
    return answered?.answeredAt ?? null;
  },
});

export const notifyListenerToNudge = internalMutation({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const listeners = await ctx.db
      .query("bookListeners")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();

    for (const bl of listeners) {
      await ctx.db.insert("notifications", {
        userId: bl.listenerId,
        bookId: args.bookId,
        type: "nudge_listener",
        message:
          "Your storyteller hasn't responded in a few days. Maybe check in with them in person?",
        read: false,
      });
    }
  },
});

export const skipAndQueueNext = internalMutation({
  args: {
    promptQueueId: v.id("promptQueue"),
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    // Mark current as skipped
    await ctx.db.patch(args.promptQueueId, { status: "skipped" });

    // Notify listeners about the skip
    const listeners = await ctx.db
      .query("bookListeners")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();

    for (const bl of listeners) {
      await ctx.db.insert("notifications", {
        userId: bl.listenerId,
        bookId: args.bookId,
        type: "story_skipped",
        message: "A question was skipped. This might be something to ask about in person.",
        read: false,
      });
    }
  },
});

export const sendNudge = internalAction({
  args: {
    promptQueueId: v.any(),
    phone: v.string(),
    bookId: v.any(),
  },
  handler: async (ctx, args) => {
    // Get the prompt to send the b-variant
    const entry = await ctx.runQuery(api.promptQueue.getByBook, {
      bookId: args.bookId,
    });
    const currentEntry = entry?.find(
      (e: { _id: string }) => e._id === args.promptQueueId
    );

    if (!currentEntry?.promptId) return;

    const prompts = await ctx.runQuery(api.prompts.getAll);
    const prompt = prompts?.find(
      (p: { _id: string }) => p._id === currentEntry.promptId
    );
    if (!prompt) return;

    // Send the b-variant as a nudge
    const nudgeText = prompt.textB || `Just checking in — ${prompt.textA}`;

    await ctx.runAction(api.twilio.sendSMS, {
      to: args.phone,
      body: nudgeText,
    });

    // Increment attempt count
    await ctx.runMutation(api.promptQueue.incrementAttempt, {
      id: args.promptQueueId,
    });
  },
});

export const sendNextPrompt = internalAction({
  args: {
    bookId: v.any(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the last answered sequence order
    const lastOrder = await ctx.runQuery(
      api.promptQueue.getLastAnsweredSequenceOrder,
      { bookId: args.bookId }
    );

    // Get the next prompt in sequence
    const nextPrompt = await ctx.runQuery(api.prompts.getNextInSequence, {
      afterOrder: lastOrder,
    });

    if (!nextPrompt) {
      // No more prompts — book might be complete
      return;
    }

    // TODO: Check dossier conditions to skip inapplicable prompts
    // TODO: Personalize prompt text with dossier data

    // Enqueue and send
    const queueId = await ctx.runMutation(api.promptQueue.enqueue, {
      bookId: args.bookId,
      promptId: nextPrompt._id,
    });

    await ctx.runAction(api.twilio.sendSMS, {
      to: args.phone,
      body: nextPrompt.textA,
    });

    await ctx.runMutation(api.promptQueue.markSent, { id: queueId });
  },
});
