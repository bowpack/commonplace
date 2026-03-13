"use client";

import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

type Step = "storyteller" | "dossier" | "questions" | "ready";

interface DossierEntry {
  fieldKey: string;
  label: string;
  placeholder: string;
  value: string;
}

const DOSSIER_FIELDS: Omit<DossierEntry, "value">[] = [
  {
    fieldKey: "relationship",
    label: "What's your relationship to them?",
    placeholder: "e.g., They're my mother",
  },
  {
    fieldKey: "birthplace",
    label: "Where do you think they were born?",
    placeholder: "e.g., Columbus, Ohio",
  },
  {
    fieldKey: "birth_year",
    label: "What year were they born?",
    placeholder: "e.g., 1952",
  },
  {
    fieldKey: "siblings",
    label: "Do they have siblings? Who?",
    placeholder: "e.g., Two brothers, Jim and Tom",
  },
  {
    fieldKey: "spouse",
    label: "Are they or were they married? To whom?",
    placeholder: "e.g., Married to my dad, Robert, since 1978",
  },
  {
    fieldKey: "children",
    label: "Do they have children?",
    placeholder: "e.g., Three kids — me, my sister Sarah, and my brother Dave",
  },
  {
    fieldKey: "career",
    label: "What did they do for work?",
    placeholder: "e.g., She was a teacher for 30 years",
  },
  {
    fieldKey: "places_lived",
    label: "Where have they lived?",
    placeholder: "e.g., Ohio, then California, now Florida",
  },
  {
    fieldKey: "always_wondered",
    label: "Is there something you've always wanted to ask them but never have?",
    placeholder: "e.g., Why they moved away from their hometown so suddenly",
  },
];

export default function SetupPage() {
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const [step, setStep] = useState<Step>("storyteller");

  // Storyteller info
  const [storytellerName, setStorytellerName] = useState("");
  const [storytellerPhone, setStorytellerPhone] = useState("");
  const [slug, setSlug] = useState("");

  // Dossier
  const [dossier, setDossier] = useState<DossierEntry[]>(
    DOSSIER_FIELDS.map((f) => ({ ...f, value: "" }))
  );

  // Custom questions
  const [customQuestions, setCustomQuestions] = useState<string[]>([""]);

  const createUser = useMutation(api.users.create);
  const createBook = useMutation(api.books.create);
  const addListener = useMutation(api.books.addListener);
  const addDossierEntry = useMutation(api.dossier.addEntry);
  const launchBook = useMutation(api.books.launch);
  const sendSMS = useAction(api.twilio.sendSMS);

  function handleDossierChange(index: number, value: string) {
    const updated = [...dossier];
    updated[index] = { ...updated[index], value };
    setDossier(updated);
  }

  function handleSlugChange(name: string) {
    setStorytellerName(name);
    setSlug(
      name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  }

  async function handleLaunch() {
    if (!clerkUser) return;

    // Create listener user
    const listenerId = await createUser({
      clerkId: clerkUser.id,
      type: "listener",
      name:
        clerkUser.fullName ?? clerkUser.primaryEmailAddress?.emailAddress ?? "",
      email: clerkUser.primaryEmailAddress?.emailAddress,
    });

    // Create storyteller user
    const storytellerId = await createUser({
      type: "storyteller",
      name: storytellerName,
      phone: storytellerPhone,
    });

    // Create book
    const bookId = await createBook({
      title: `${storytellerName}'s Story`,
      storytellerId,
      slug,
    });

    // Add listener to book
    await addListener({
      bookId,
      listenerId,
      role: "primary",
    });

    // Save dossier entries
    for (const entry of dossier) {
      if (entry.value.trim()) {
        await addDossierEntry({
          bookId,
          submittedBy: listenerId,
          fieldKey: entry.fieldKey,
          value: entry.value.trim(),
        });
      }
    }

    // Launch the book
    await launchBook({ id: bookId });

    // Send welcome SMS to storyteller
    const listenerName =
      clerkUser.firstName ?? clerkUser.fullName ?? "your family";
    const welcomeMessage = `Hi ${storytellerName}! 👋 This is Commonplace. ${listenerName} signed you up for something special — a way to share your life's stories so your family can treasure them forever.\n\nOver the coming weeks, we'll text you simple questions about your life. You can reply by typing or sending a voice memo. There are no wrong answers — just your memories, in your own words.\n\nReady to start? We'll send your first question in a day or two. In the meantime, reply with the city and state where you were born.`;

    try {
      await sendSMS({
        to: storytellerPhone,
        body: welcomeMessage,
      });
    } catch (error) {
      console.error("Failed to send welcome SMS:", error);
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
          Set up your family&apos;s story
        </h1>
        <p className="text-stone-600 mb-8">
          We&apos;ll guide your storyteller through their memories. You just need
          to tell us a little about them first.
        </p>

        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {(["storyteller", "dossier", "questions", "ready"] as Step[]).map(
            (s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded ${
                  step === s
                    ? "bg-stone-900"
                    : (["storyteller", "dossier", "questions", "ready"] as Step[]).indexOf(s) <
                      (["storyteller", "dossier", "questions", "ready"] as Step[]).indexOf(step)
                    ? "bg-stone-400"
                    : "bg-stone-200"
                }`}
              />
            )
          )}
        </div>

        {/* Step 1: Storyteller Info */}
        {step === "storyteller" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-stone-900">
              Who is this for?
            </h2>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Their name
              </label>
              <input
                type="text"
                value={storytellerName}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="e.g., Jane Smith"
                className="w-full border border-stone-300 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Their phone number
              </label>
              <input
                type="tel"
                value={storytellerPhone}
                onChange={(e) => setStorytellerPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full border border-stone-300 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              <p className="text-xs text-stone-500 mt-1">
                This is where they&apos;ll receive story prompts via text
                message.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Their story URL
              </label>
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                <span className="px-4 py-3 bg-stone-100 text-stone-500 text-sm">
                  commonplace.com/@
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "")
                    )
                  }
                  className="flex-1 px-4 py-3 text-stone-900 focus:outline-none"
                />
              </div>
            </div>
            <Button
              onClick={() => setStep("dossier")}
              disabled={!storytellerName || !storytellerPhone || !slug}
              className="w-full py-6"
              size="lg"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Dossier */}
        {step === "dossier" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                What do you know about {storytellerName}?
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                This helps us ask better questions. Fill in what you can — skip
                what you don&apos;t know.
              </p>
            </div>
            {dossier.map((entry, i) => (
              <div key={entry.fieldKey}>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  {entry.label}
                </label>
                <input
                  type="text"
                  value={entry.value}
                  onChange={(e) => handleDossierChange(i, e.target.value)}
                  placeholder={entry.placeholder}
                  className="w-full border border-stone-300 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            ))}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("storyteller")}
                className="flex-1 py-6"
                size="lg"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep("questions")}
                className="flex-1 py-6"
                size="lg"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Custom Questions */}
        {step === "questions" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">
                Anything specific you want to ask?
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                We have dozens of great questions ready to go. But if there&apos;s
                something you&apos;ve always wanted to know, add it here.
              </p>
            </div>
            {customQuestions.map((q, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => {
                    const updated = [...customQuestions];
                    updated[i] = e.target.value;
                    setCustomQuestions(updated);
                  }}
                  placeholder="e.g., Why did you and Aunt Carol stop talking in the 90s?"
                  className="w-full border border-stone-300 rounded-lg px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            ))}
            <button
              onClick={() => setCustomQuestions([...customQuestions, ""])}
              className="text-sm text-stone-600 hover:text-stone-900"
            >
              + Add another question
            </button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("dossier")}
                className="flex-1 py-6"
                size="lg"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep("ready")}
                className="flex-1 py-6"
                size="lg"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Ready to Launch */}
        {step === "ready" && (
          <div className="space-y-8 text-center">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                You&apos;re all set.
              </h2>
              <p className="text-stone-600 mb-3">
                When you press Go, {storytellerName} will receive a warm welcome
                text from Commonplace. We recommend giving them a heads up in
                person first — it makes a big difference.
              </p>
              <p className="text-stone-500 text-sm">
                No rush. You can close this page and come back to press Go
                whenever the time is right. Your setup is saved.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-left shadow-sm border">
              <h3 className="text-sm font-medium text-stone-500 mb-4">
                Here&apos;s what happens next
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-stone-600">1</span>
                  </div>
                  <p className="text-stone-800 text-sm">
                    {storytellerName} gets a welcome text explaining what this is
                    and why you signed them up.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-stone-600">2</span>
                  </div>
                  <p className="text-stone-800 text-sm">
                    We ask them a few quick questions about themselves to
                    personalize their experience.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-stone-600">3</span>
                  </div>
                  <p className="text-stone-800 text-sm">
                    In a day or two, their first real story question arrives.
                    From there, we handle everything.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-stone-600">4</span>
                  </div>
                  <p className="text-stone-800 text-sm">
                    You&apos;ll get updates as stories come in. We&apos;ll nudge you
                    when there&apos;s something to celebrate.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("questions")}
                className="flex-1 py-6"
                size="lg"
              >
                Back
              </Button>
              <Button onClick={handleLaunch} className="flex-1 py-6" size="lg">
                Press Go
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
