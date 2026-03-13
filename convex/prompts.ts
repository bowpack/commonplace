import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("prompts").collect();
  },
});

export const getByCategory = query({
  args: {
    category: v.union(
      v.literal("origins"),
      v.literal("school"),
      v.literal("leaving_home"),
      v.literal("building"),
      v.literal("middle"),
      v.literal("later"),
      v.literal("crosscutting")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("prompts")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getNextInSequence = query({
  args: { afterOrder: v.number() },
  handler: async (ctx, args) => {
    const all = await ctx.db
      .query("prompts")
      .withIndex("by_sequenceOrder")
      .collect();
    return all.find((p) => p.sequenceOrder > args.afterOrder) ?? null;
  },
});

export const seed = internalMutation({
  args: {
    prompts: v.array(
      v.object({
        textA: v.string(),
        textB: v.string(),
        category: v.union(
          v.literal("origins"),
          v.literal("school"),
          v.literal("leaving_home"),
          v.literal("building"),
          v.literal("middle"),
          v.literal("later"),
          v.literal("crosscutting")
        ),
        sequenceOrder: v.number(),
        emotionalWeight: v.union(
          v.literal("light"),
          v.literal("medium"),
          v.literal("heavy")
        ),
        conditions: v.optional(v.array(v.string())),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Check if already seeded
    const existing = await ctx.db.query("prompts").first();
    if (existing) {
      return { seeded: false, message: "Prompts already exist" };
    }

    for (const prompt of args.prompts) {
      await ctx.db.insert("prompts", {
        ...prompt,
        isUniversal: true,
      });
    }

    return { seeded: true, count: args.prompts.length };
  },
});

export const addCustom = mutation({
  args: {
    textA: v.string(),
    textB: v.optional(v.string()),
    category: v.union(
      v.literal("origins"),
      v.literal("school"),
      v.literal("leaving_home"),
      v.literal("building"),
      v.literal("middle"),
      v.literal("later"),
      v.literal("crosscutting")
    ),
    sequenceOrder: v.number(),
    emotionalWeight: v.union(
      v.literal("light"),
      v.literal("medium"),
      v.literal("heavy")
    ),
    sourceListenerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("prompts", {
      textA: args.textA,
      textB: args.textB ?? "",
      category: args.category,
      sequenceOrder: args.sequenceOrder,
      emotionalWeight: args.emotionalWeight,
      isUniversal: false,
      sourceListenerId: args.sourceListenerId,
    });
  },
});
