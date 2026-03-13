import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const from = formData.get("From") as string;
    const body = formData.get("Body") as string;
    const numMedia = parseInt(formData.get("NumMedia") as string) || 0;

    // Find the storyteller by phone number
    const user = await convex.query(api.users.getByPhone, { phone: from });
    if (!user) {
      // Unknown number — respond with a generic message
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Message>Thanks for reaching out! We don't have this number on file yet. If you've been invited to share your story, please check with your family member who set this up.</Message>
        </Response>`,
        { headers: { "Content-Type": "text/xml" } }
      );
    }

    // Find the active book for this storyteller
    const books = await convex.query(api.books.getBySlug, { slug: "" });
    // For now, we'll look up by storyteller — we need a proper query for this
    // TODO: Add getByStorytellerId query

    // Handle media attachments (voice memos, photos)
    if (numMedia > 0) {
      for (let i = 0; i < numMedia; i++) {
        const mediaUrl = formData.get(`MediaUrl${i}`) as string;
        const mediaContentType = formData.get(
          `MediaContentType${i}`
        ) as string;

        if (
          mediaContentType?.startsWith("audio/") ||
          mediaContentType?.startsWith("video/")
        ) {
          // Voice memo — download, store, and transcribe
          await handleVoiceMemo(user._id, mediaUrl, mediaContentType);
        } else if (mediaContentType?.startsWith("image/")) {
          // Photo — download and store
          await handlePhoto(user._id, mediaUrl);
        }
      }
    }

    // Handle text body if present
    if (body && body.trim()) {
      // Store the text response
      // We need the current book and prompt queue entry
      // For now, log it
      console.log(`Text response from ${from}: ${body}`);
    }

    // Respond with empty TwiML (acknowledge receipt)
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
      { headers: { "Content-Type": "text/xml" } }
    );
  } catch (error) {
    console.error("Twilio webhook error:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
      { headers: { "Content-Type": "text/xml" }, status: 200 }
    );
  }
}

async function handleVoiceMemo(
  _userId: string,
  mediaUrl: string,
  _contentType: string
) {
  // Download the media from Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;

  const response = await fetch(mediaUrl, {
    headers: {
      Authorization: "Basic " + btoa(`${accountSid}:${authToken}`),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download media: ${response.statusText}`);
  }

  const audioBuffer = await response.arrayBuffer();

  // TODO: Upload to Convex storage
  // TODO: Send to Deepgram for transcription
  // TODO: Create response record in Convex

  console.log(
    `Downloaded voice memo: ${audioBuffer.byteLength} bytes`
  );
}

async function handlePhoto(_userId: string, mediaUrl: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;

  const response = await fetch(mediaUrl, {
    headers: {
      Authorization: "Basic " + btoa(`${accountSid}:${authToken}`),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download photo: ${response.statusText}`);
  }

  const photoBuffer = await response.arrayBuffer();

  // TODO: Upload to Convex storage
  // TODO: Create response record in Convex

  console.log(`Downloaded photo: ${photoBuffer.byteLength} bytes`);
}
