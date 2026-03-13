import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const enqueue = mutation({
  args: {
    bookId: v.id("books"),
    promptId: v.optional(v.id("prompts")),
    customText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("promptQueue", {
      bookId: args.bookId,
      promptId: args.promptId,
      customText: args.customText,
      status: "pending",
      attemptCount: 0,
    });
  },
});

export const markSent = mutation({
  args: { id: v.id("promptQueue") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "sent",
      sentAt: Date.now(),
      attemptCount: 1,
    });
  },
});

export const markAnswered = mutation({
  args: { id: v.id("promptQueue") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "answered",
      answeredAt: Date.now(),
    });
  },
});

export const markSkipped = mutation({
  args: { id: v.id("promptQueue") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "skipped" });
  },
});

export const incrementAttempt = mutation({
  args: { id: v.id("promptQueue") },
  handler: async (ctx, args) => {
    const entry = await ctx.db.get(args.id);
    if (!entry) throw new Error("Prompt queue entry not found");
    await ctx.db.patch(args.id, {
      attemptCount: entry.attemptCount + 1,
    });
  },
});

export const getByBook = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();
  },
});

export const getCurrentForBook = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    // Get the most recent sent or pending prompt for this book
    const queue = await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId_status", (q) =>
        q.eq("bookId", args.bookId).eq("status", "sent")
      )
      .first();

    if (queue) return queue;

    return await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId_status", (q) =>
        q.eq("bookId", args.bookId).eq("status", "pending")
      )
      .first();
  },
});

export const getAnsweredForBook = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId_status", (q) =>
        q.eq("bookId", args.bookId).eq("status", "answered")
      )
      .collect();
  },
});

export const getLastAnsweredSequenceOrder = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const answered = await ctx.db
      .query("promptQueue")
      .withIndex("by_bookId_status", (q) =>
        q.eq("bookId", args.bookId).eq("status", "answered")
      )
      .collect();

    let maxOrder = 0;
    for (const entry of answered) {
      if (entry.promptId) {
        const prompt = await ctx.db.get(entry.promptId);
        if (prompt && prompt.sequenceOrder > maxOrder) {
          maxOrder = prompt.sequenceOrder;
        }
      }
    }
    return maxOrder;
  },
});
