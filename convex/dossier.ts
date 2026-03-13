import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addEntry = mutation({
  args: {
    bookId: v.id("books"),
    submittedBy: v.id("users"),
    fieldKey: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    // Upsert: update if exists, insert if not
    const existing = await ctx.db
      .query("dossierEntries")
      .withIndex("by_bookId_fieldKey", (q) =>
        q.eq("bookId", args.bookId).eq("fieldKey", args.fieldKey)
      )
      .filter((q) => q.eq(q.field("submittedBy"), args.submittedBy))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
      return existing._id;
    }

    return await ctx.db.insert("dossierEntries", args);
  },
});

export const getByBook = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dossierEntries")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();
  },
});

export const getByBookAndSubmitter = query({
  args: {
    bookId: v.id("books"),
    submittedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dossierEntries")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .filter((q) => q.eq(q.field("submittedBy"), args.submittedBy))
      .collect();
  },
});

export const getField = query({
  args: {
    bookId: v.id("books"),
    fieldKey: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dossierEntries")
      .withIndex("by_bookId_fieldKey", (q) =>
        q.eq("bookId", args.bookId).eq("fieldKey", args.fieldKey)
      )
      .collect();
  },
});
