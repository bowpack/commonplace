import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    bookId: v.id("books"),
    promptQueueId: v.optional(v.id("promptQueue")),
    userId: v.id("users"),
    responseType: v.union(
      v.literal("text"),
      v.literal("voice"),
      v.literal("photo")
    ),
    rawText: v.optional(v.string()),
    audioStorageId: v.optional(v.id("_storage")),
    photoStorageId: v.optional(v.id("_storage")),
    transcription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const responseId = await ctx.db.insert("responses", args);

    // Mark the prompt queue entry as answered if linked
    if (args.promptQueueId) {
      await ctx.db.patch(args.promptQueueId, {
        status: "answered",
        answeredAt: Date.now(),
      });
    }

    return responseId;
  },
});

export const getByBook = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("responses")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();
  },
});

export const getByPromptQueue = query({
  args: { promptQueueId: v.id("promptQueue") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("responses")
      .withIndex("by_promptQueueId", (q) =>
        q.eq("promptQueueId", args.promptQueueId)
      )
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("responses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateTranscription = mutation({
  args: {
    id: v.id("responses"),
    transcription: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { transcription: args.transcription });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
