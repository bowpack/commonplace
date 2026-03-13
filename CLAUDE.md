# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Commonplace

Commonplace is a memoir-building app that sends SMS prompts to a "storyteller" (parent/grandparent), collects their text/voice/photo responses, and assembles them into book chapters for "listener" family members. The storyteller never needs an app — everything happens via text message through Twilio.

## Commands

- `npm run dev` — Start Next.js dev server (port 3000)
- `npx convex dev` — Start Convex dev server (run alongside Next.js dev)
- `npm run build` — Production build
- `npm run lint` — ESLint

Both `npm run dev` and `npx convex dev` need to run simultaneously during development.

## Architecture

**Frontend:** Next.js 16 (App Router) with React 19, Tailwind CSS 4, shadcn/ui components.

**Backend:** Convex (real-time backend-as-a-service). All data mutations and queries live in `convex/`. Convex functions use `api.*` (public) and `internal.*` (server-only) patterns — see `convex/_generated/api.d.ts`.

**Auth:** Clerk (`@clerk/nextjs`). ClerkProvider wraps the app in `layout.tsx`, middleware is in `src/middleware.ts` (Clerk's `clerkMiddleware`).

**SMS pipeline:** Twilio. Inbound webhook at `src/app/api/twilio/incoming/route.ts` receives texts/voice memos/photos. Outbound SMS sent via `convex/twilio.ts`.

**Scheduling:** A Convex cron (`convex/crons.ts`) runs `scheduling.runScheduler` every 6 hours. It processes all active books: sends next prompts based on pacing settings, sends nudges after 24h, skips after 48h, and alerts listeners after 72h of no response.

**Voice transcription:** Deepgram (API key in env, integration in progress).

**AI:** Anthropic Claude API for chapter generation from responses.

### Key domain model (see `convex/schema.ts`)

- **users** — three types: `storyteller`, `listener`, `contributor`
- **books** — a memoir project linking a storyteller to listeners, with status lifecycle: setup → ready → active → paused → completed
- **prompts** — question bank with categories (origins, school, leaving_home, building, middle, later, crosscutting), A/B text variants, and emotional weight
- **promptQueue** — tracks which prompts were sent to which book, with status and attempt counts
- **responses** — storyteller answers (text, voice, photo) linked to prompt queue entries
- **chapters** — AI-generated memoir chapters from responses
- **dossierEntries** — biographical facts about the storyteller used to personalize prompts

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Environment Variables

See `.env.local.example`. Convex, Clerk, Twilio, Deepgram, and Anthropic keys are required. Twilio credentials must also be set as Convex environment variables in the dashboard.
