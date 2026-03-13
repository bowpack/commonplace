import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    storytellerId: v.id("users"),
    slug: v.string(),
    settings: v.optional(
      v.object({
        pacingDays: v.number(),
        heavyTopicsEnabled: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Check slug uniqueness
    const existing = await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) {
      throw new Error("This URL is already taken. Please choose a different one.");
    }

    return await ctx.db.insert("books", {
      title: args.title,
      storytellerId: args.storytellerId,
      slug: args.slug,
      status: "setup",
      settings: args.settings ?? {
        pacingDays: 2.5,
        heavyTopicsEnabled: false,
      },
    });
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getById = query({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByListenerId = query({
  args: { listenerId: v.id("users") },
  handler: async (ctx, args) => {
    const bookListeners = await ctx.db
      .query("bookListeners")
      .withIndex("by_listenerId", (q) => q.eq("listenerId", args.listenerId))
      .collect();
    const books = await Promise.all(
      bookListeners.map((bl) => ctx.db.get(bl.bookId))
    );
    return books.filter(Boolean);
  },
});

export const launch = mutation({
  args: { id: v.id("books") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "active",
      launchedAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("books"),
    status: v.union(
      v.literal("setup"),
      v.literal("ready"),
      v.literal("active"),
      v.literal("paused"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const addListener = mutation({
  args: {
    bookId: v.id("books"),
    listenerId: v.id("users"),
    role: v.union(v.literal("primary"), v.literal("collaborator")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookListeners", args);
  },
});

export const getListeners = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const bookListeners = await ctx.db
      .query("bookListeners")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();
    const listeners = await Promise.all(
      bookListeners.map(async (bl) => {
        const user = await ctx.db.get(bl.listenerId);
        return user ? { ...user, role: bl.role } : null;
      })
    );
    return listeners.filter(Boolean);
  },
});
