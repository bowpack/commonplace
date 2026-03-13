"use client";

import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Id } from "../../../convex/_generated/dataModel";

export default function AdminPage() {
  const [phone, setPhone] = useState("");
  const [storytellerName, setStorytellerName] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<Id<"books"> | null>(
    null
  );

  const prompts = useQuery(api.prompts.getAll);
  const sendSMS = useAction(api.twilio.sendSMS);
  const createUser = useMutation(api.users.create);
  const createBook = useMutation(api.books.create);
  const addListener = useMutation(api.books.addListener);
  const enqueuePrompt = useMutation(api.promptQueue.enqueue);
  const markSent = useMutation(api.promptQueue.markSent);

  // Get responses for the selected book
  const responses = useQuery(
    api.responses.getByBook,
    selectedBookId ? { bookId: selectedBookId } : "skip"
  );

  const promptQueue = useQuery(
    api.promptQueue.getByBook,
    selectedBookId ? { bookId: selectedBookId } : "skip"
  );

  async function handleQuickSetup() {
    if (!phone || !storytellerName) return;

    // Create storyteller user
    const storytellerId = await createUser({
      type: "storyteller",
      name: storytellerName,
      phone: phone,
    });

    // Create listener user (admin/Matt for now)
    const listenerId = await createUser({
      type: "listener",
      name: "Admin",
      email: "admin@commonplace.com",
    });

    // Create book
    const slug = storytellerName.toLowerCase().replace(/\s+/g, "-");
    const bookId = await createBook({
      title: `${storytellerName}'s Story`,
      storytellerId,
      slug,
    });

    // Add listener
    await addListener({
      bookId,
      listenerId,
      role: "primary",
    });

    setSelectedBookId(bookId);
    alert(`Book created! Slug: /${slug}`);
  }

  async function handleSendPrompt(promptId: Id<"prompts">) {
    if (!selectedBookId || !phone) return;

    const prompt = prompts?.find((p) => p._id === promptId);
    if (!prompt) return;

    // Enqueue the prompt
    const queueId = await enqueuePrompt({
      bookId: selectedBookId,
      promptId,
    });

    // Send via SMS
    try {
      await sendSMS({
        to: phone,
        body: prompt.textA,
      });
      await markSent({ id: queueId });
      alert("Prompt sent!");
    } catch (error) {
      alert(`Error sending SMS: ${error}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Commonplace Admin</h1>

      {/* Quick Setup */}
      <section className="mb-12 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Setup</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Storyteller name"
            value={storytellerName}
            onChange={(e) => setStorytellerName(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <input
            type="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <Button onClick={handleQuickSetup}>Create Book</Button>
        </div>
        {selectedBookId && (
          <p className="text-sm text-green-600">
            Book active: {selectedBookId}
          </p>
        )}
      </section>

      {/* Send Prompts */}
      {selectedBookId && prompts && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Send a Prompt ({prompts.length} available)
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {prompts
              .sort((a, b) => a.sequenceOrder - b.sequenceOrder)
              .map((prompt) => (
                <div
                  key={prompt._id}
                  className="p-4 border rounded-lg flex items-start gap-4"
                >
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      #{prompt.sequenceOrder} &middot; {prompt.category} &middot;{" "}
                      {prompt.emotionalWeight}
                    </p>
                    <p className="font-medium">{prompt.textA}</p>
                    <p className="text-sm text-gray-600 mt-1">{prompt.textB}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendPrompt(prompt._id)}
                  >
                    Send A
                  </Button>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Prompt Queue */}
      {promptQueue && promptQueue.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Prompt Queue</h2>
          <div className="space-y-2">
            {promptQueue.map((entry) => (
              <div
                key={entry._id}
                className="p-3 border rounded flex justify-between items-center"
              >
                <span className="text-sm">
                  Status: <strong>{entry.status}</strong>
                  {entry.sentAt &&
                    ` | Sent: ${new Date(entry.sentAt).toLocaleString()}`}
                  {entry.answeredAt &&
                    ` | Answered: ${new Date(entry.answeredAt).toLocaleString()}`}
                </span>
                <span className="text-xs text-gray-500">
                  Attempts: {entry.attemptCount}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Responses */}
      {responses && responses.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Responses ({responses.length})
          </h2>
          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response._id} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {response.responseType}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(response._creationTime).toLocaleString()}
                  </span>
                </div>
                {response.rawText && (
                  <p className="text-gray-800">{response.rawText}</p>
                )}
                {response.transcription && (
                  <div className="mt-2 p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500 mb-1">Transcription:</p>
                    <p className="text-gray-800">{response.transcription}</p>
                  </div>
                )}
                {response.audioStorageId && (
                  <p className="text-sm text-blue-600 mt-2">
                    Audio file attached
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!selectedBookId && (
        <div className="text-center text-gray-500 py-12">
          <p>Set up a storyteller above to get started.</p>
        </div>
      )}
    </div>
  );
}
