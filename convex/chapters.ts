import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    bookId: v.id("books"),
    title: v.string(),
    content: v.string(),
    timePeriod: v.optional(v.string()),
    sortYear: v.optional(v.number()),
    sourceResponseIds: v.array(v.id("responses")),
  },
  handler: async (ctx, args) => {
    const { sourceResponseIds, ...chapterData } = args;

    const chapterId = await ctx.db.insert("chapters", {
      ...chapterData,
      version: 1,
      status: "draft",
    });

    // Link source responses
    for (const responseId of sourceResponseIds) {
      await ctx.db.insert("chapterSources", {
        chapterId,
        responseId,
      });
    }

    return chapterId;
  },
});

export const getByBook = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chapters")
      .withIndex("by_bookId_sortYear", (q) => q.eq("bookId", args.bookId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("chapters") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getWithSources = query({
  args: { id: v.id("chapters") },
  handler: async (ctx, args) => {
    const chapter = await ctx.db.get(args.id);
    if (!chapter) return null;

    const sources = await ctx.db
      .query("chapterSources")
      .withIndex("by_chapterId", (q) => q.eq("chapterId", args.id))
      .collect();

    const responses = await Promise.all(
      sources.map((s) => ctx.db.get(s.responseId))
    );

    return {
      ...chapter,
      sources: responses.filter(Boolean),
    };
  },
});

export const update = mutation({
  args: {
    id: v.id("chapters"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    timePeriod: v.optional(v.string()),
    sortYear: v.optional(v.number()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const chapter = await ctx.db.get(id);
    if (!chapter) throw new Error("Chapter not found");

    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }

    // Increment version if content changed
    if (updates.content) {
      updates.version = chapter.version + 1;
    }

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(id, updates);
    }
  },
});

export const publish = mutation({
  args: { id: v.id("chapters") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "published" });
  },
});
