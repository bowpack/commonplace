import { v } from "convex/values";
import { action } from "./_generated/server";

export const sendSMS = action({
  args: {
    to: v.string(),
    body: v.string(),
  },
  handler: async (_ctx, args) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      throw new Error("Twilio credentials not configured");
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + btoa(`${accountSid}:${authToken}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: args.to,
        From: fromNumber,
        Body: args.body,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Twilio API error: ${error}`);
    }

    return await response.json();
  },
});
