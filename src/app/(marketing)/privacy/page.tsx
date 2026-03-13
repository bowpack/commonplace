import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Commonplace",
  description:
    "How Commonplace handles your family's stories, personal data, and privacy.",
};

export default function PrivacyPage() {
  return (
    <section className="max-w-3xl mx-auto px-8 py-20">
      <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-stone-500 mb-12">Last updated: March 2026</p>

      <div className="space-y-10 text-stone-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            The short version
          </h2>
          <p>
            Your family&apos;s stories belong to your family. We don&apos;t sell
            your data, we don&apos;t use your stories to train AI models, and we
            don&apos;t share your information with anyone who isn&apos;t
            directly involved in delivering the service. Everything below
            explains exactly what we collect, why, and how we protect it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            What we collect
          </h2>
          <p className="mb-3">
            We collect only what we need to deliver the service:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account information</strong> — your name, email address,
              and password, managed through our authentication provider (Clerk).
            </li>
            <li>
              <strong>Storyteller information</strong> — their name, phone
              number, and any biographical details you share during setup.
            </li>
            <li>
              <strong>Story responses</strong> — text messages, voice memos, and
              photos your storyteller sends in reply to our prompts.
            </li>
            <li>
              <strong>Usage data</strong> — basic analytics like when you log in
              and which chapters you&apos;ve read.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            How we use your information
          </h2>
          <p>
            We use your information to do exactly what you signed up for:
            deliver prompts to your storyteller, receive their responses, and
            generate memoir chapters. We also use it to send you notifications
            when new chapters are ready and to improve the service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            AI and your stories
          </h2>
          <p className="mb-3">
            This is the part people care about most, so we&apos;ll be direct:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Your stories are <strong>never used to train AI models</strong>.
              Not ours, not anyone else&apos;s.
            </li>
            <li>
              When we generate memoir chapters, your storyteller&apos;s
              responses are sent to our AI provider (Anthropic) for processing.
              This is a one-time operation to create the chapter — the AI
              provider does not store or retain your stories afterward.
            </li>
            <li>
              The generated chapters are stored in your account and belong to
              your family.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Voice memo processing
          </h2>
          <p>
            When your storyteller sends a voice memo, we use a transcription
            service (Deepgram) to convert their speech to text. The audio is
            processed and the transcription is stored with their response. The
            transcription provider does not retain the audio after processing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Text messages and phone numbers
          </h2>
          <p>
            We use Twilio to send and receive text messages. Your
            storyteller&apos;s phone number is shared with Twilio solely for the
            purpose of delivering and receiving SMS messages. Twilio processes
            messages according to their own privacy policy, and we encourage you
            to review it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Data storage and security
          </h2>
          <p>
            Your data is stored on our backend provider (Convex) with
            encryption at rest and in transit. We use industry-standard security
            practices to protect your information, including secure
            authentication, encrypted connections, and access controls that
            ensure only authorized users can see your family&apos;s stories.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            What happens if you cancel
          </h2>
          <p>
            If you cancel your subscription, your account and all associated
            data — including stories, chapters, and storyteller information —
            will be retained for 30 days in case you change your mind. After
            that, we permanently delete everything. If you want your data
            deleted immediately, contact us and we&apos;ll take care of it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Third-party services
          </h2>
          <p className="mb-3">
            We use the following services to deliver Commonplace. Each handles a
            specific part of the experience:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Clerk</strong> — authentication and account management
            </li>
            <li>
              <strong>Convex</strong> — database and backend infrastructure
            </li>
            <li>
              <strong>Twilio</strong> — SMS messaging
            </li>
            <li>
              <strong>Deepgram</strong> — voice memo transcription
            </li>
            <li>
              <strong>Anthropic</strong> — AI-powered chapter generation
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Changes to this policy
          </h2>
          <p>
            If we make meaningful changes to this policy, we&apos;ll notify you
            by email before they take effect. We won&apos;t quietly reduce your
            privacy protections.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Contact us
          </h2>
          <p>
            If you have questions about your privacy or want to request data
            deletion, email us at{" "}
            <a
              href="mailto:privacy@commonplace.app"
              className="text-stone-900 underline hover:text-stone-600"
            >
              privacy@commonplace.app
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
