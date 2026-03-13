import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.optional(v.string()),
    type: v.union(
      v.literal("storyteller"),
      v.literal("listener"),
      v.literal("contributor")
    ),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_phone", ["phone"])
    .index("by_email", ["email"]),

  books: defineTable({
    title: v.string(),
    storytellerId: v.id("users"),
    status: v.union(
      v.literal("setup"),
      v.literal("ready"),
      v.literal("active"),
      v.literal("paused"),
      v.literal("completed")
    ),
    slug: v.string(),
    settings: v.object({
      pacingDays: v.number(),
      heavyTopicsEnabled: v.boolean(),
    }),
    launchedAt: v.optional(v.number()),
  })
    .index("by_storytellerId", ["storytellerId"])
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  bookListeners: defineTable({
    bookId: v.id("books"),
    listenerId: v.id("users"),
    role: v.union(v.literal("primary"), v.literal("collaborator")),
  })
    .index("by_bookId", ["bookId"])
    .index("by_listenerId", ["listenerId"]),

  dossierEntries: defineTable({
    bookId: v.id("books"),
    submittedBy: v.id("users"),
    fieldKey: v.string(),
    value: v.string(),
  })
    .index("by_bookId", ["bookId"])
    .index("by_bookId_fieldKey", ["bookId", "fieldKey"]),

  prompts: defineTable({
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
    isUniversal: v.boolean(),
    sourceListenerId: v.optional(v.id("users")),
  })
    .index("by_category", ["category"])
    .index("by_sequenceOrder", ["sequenceOrder"])
    .index("by_isUniversal", ["isUniversal"]),

  promptQueue: defineTable({
    bookId: v.id("books"),
    promptId: v.optional(v.id("prompts")),
    customText: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("answered"),
      v.literal("skipped"),
      v.literal("expired")
    ),
    attemptCount: v.number(),
    sentAt: v.optional(v.number()),
    answeredAt: v.optional(v.number()),
  })
    .index("by_bookId", ["bookId"])
    .index("by_bookId_status", ["bookId", "status"]),

  responses: defineTable({
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
  })
    .index("by_bookId", ["bookId"])
    .index("by_promptQueueId", ["promptQueueId"])
    .index("by_userId", ["userId"]),

  chapters: defineTable({
    bookId: v.id("books"),
    title: v.string(),
    content: v.string(),
    timePeriod: v.optional(v.string()),
    sortYear: v.optional(v.number()),
    version: v.number(),
    status: v.union(v.literal("draft"), v.literal("published")),
  })
    .index("by_bookId", ["bookId"])
    .index("by_bookId_sortYear", ["bookId", "sortYear"]),

  chapterSources: defineTable({
    chapterId: v.id("chapters"),
    responseId: v.id("responses"),
  })
    .index("by_chapterId", ["chapterId"])
    .index("by_responseId", ["responseId"]),

  editions: defineTable({
    bookId: v.id("books"),
    editionNumber: v.number(),
    lockedAt: v.number(),
    chapterSnapshot: v.string(),
  }).index("by_bookId", ["bookId"]),

  notifications: defineTable({
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
    read: v.boolean(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_read", ["userId", "read"])
    .index("by_bookId", ["bookId"]),
});
