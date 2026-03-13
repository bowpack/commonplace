/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as books from "../books.js";
import type * as chapters from "../chapters.js";
import type * as crons from "../crons.js";
import type * as dossier from "../dossier.js";
import type * as notifications from "../notifications.js";
import type * as promptQueue from "../promptQueue.js";
import type * as prompts from "../prompts.js";
import type * as responses from "../responses.js";
import type * as scheduling from "../scheduling.js";
import type * as twilio from "../twilio.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  books: typeof books;
  chapters: typeof chapters;
  crons: typeof crons;
  dossier: typeof dossier;
  notifications: typeof notifications;
  promptQueue: typeof promptQueue;
  prompts: typeof prompts;
  responses: typeof responses;
  scheduling: typeof scheduling;
  twilio: typeof twilio;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
