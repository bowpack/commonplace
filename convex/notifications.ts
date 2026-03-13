import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    userId: v.id("users"),
    bookId: v.id("books"),
    type: v.union(
      v.literal("story_answered"),
      v.literal("story_skipped"),
      v.literal("chapter_ready"),
      v.literal("nudge_listener"),
      v.literal("reinforcement")
    ),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      ...args,
      read: false,
    });
  },
});

export const getUnreadForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_userId_read", (q) =>
        q.eq("userId", args.userId).eq("read", false)
      )
      .collect();
  },
});

export const getForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(50);
  },
});

export const markRead = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { read: true });
  },
});

export const markAllRead = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_userId_read", (q) =>
        q.eq("userId", args.userId).eq("read", false)
      )
      .collect();

    for (const notification of unread) {
      await ctx.db.patch(notification._id, { read: true });
    }
  },
});
