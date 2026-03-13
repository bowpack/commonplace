import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run the prompt scheduler every 6 hours
crons.interval(
  "prompt-scheduler",
  { hours: 6 },
  internal.scheduling.runScheduler
);

export default crons;
