import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Commonplace",
  description: "Terms of service for using Commonplace.",
};

export default function TermsPage() {
  return (
    <section className="max-w-3xl mx-auto px-8 py-20">
      <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-stone-500 mb-12">Effective: March 2026</p>

      <div className="space-y-10 text-stone-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            What Commonplace is
          </h2>
          <p>
            Commonplace is a memoir-building service. You sign up a storyteller
            — typically a parent or grandparent — and we send them questions via
            text message. Their responses are used to generate beautifully
            written memoir chapters that your family can read and keep.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Accounts and eligibility
          </h2>
          <p>
            You must be at least 18 years old to create an account. You&apos;re
            responsible for keeping your login credentials secure. One account
            per person — don&apos;t share your account or let someone else use
            it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Storyteller consent
          </h2>
          <p>
            When you sign up a storyteller, you&apos;re telling us that they
            know about Commonplace and are okay receiving text messages from us.
            We&apos;ll introduce ourselves in their first message and make it
            easy for them to opt out at any time. Don&apos;t sign someone up
            without their knowledge.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Who owns the stories
          </h2>
          <p className="mb-3">
            The storyteller owns their stories. You, as the person who set up
            the account, have access to read and share them with family members
            you invite.
          </p>
          <p>
            By using Commonplace, you grant us a limited license to process,
            store, and display the stories within the service — including
            sending them to our AI provider to generate chapters. We won&apos;t
            use the stories for any other purpose, and we won&apos;t share them
            outside your family&apos;s account.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Acceptable use
          </h2>
          <p>
            Use Commonplace for its intended purpose: preserving family stories.
            Don&apos;t use it to send spam, harass anyone, or collect
            information about people without their knowledge. Don&apos;t attempt
            to access other users&apos; accounts or data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Subscription and billing
          </h2>
          <p>
            Commonplace costs $1 for your first month, then $7 per month after
            that. You can cancel anytime. When you cancel, your subscription
            continues through the end of your current billing period — you
            won&apos;t be charged again, and you&apos;ll keep access until the
            period ends.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Cancellation and your data
          </h2>
          <p>
            When you cancel, your stories and chapters are kept for 30 days in
            case you change your mind. After that, everything is permanently
            deleted. If you want to export your data or have it deleted
            immediately, contact us.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            AI-generated chapters
          </h2>
          <p>
            Memoir chapters are generated with the help of AI. They&apos;re
            based on your storyteller&apos;s words, but they&apos;re not
            verbatim transcriptions — the AI shapes the responses into
            narrative prose while preserving the storyteller&apos;s voice and
            meaning. Chapters may occasionally contain inaccuracies. You can
            review all chapters in the app.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Limitation of liability
          </h2>
          <p>
            Commonplace is provided as-is. We do our best to keep the service
            reliable and your data safe, but we can&apos;t guarantee
            uninterrupted service or that chapters will be perfectly accurate.
            We&apos;re not liable for indirect, incidental, or consequential
            damages arising from your use of the service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Termination
          </h2>
          <p>
            We may suspend or terminate your account if you violate these terms.
            You can delete your account at any time by contacting us. In either
            case, the data retention policy described above applies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Changes to these terms
          </h2>
          <p>
            We may update these terms from time to time. If we make significant
            changes, we&apos;ll let you know by email. Continuing to use
            Commonplace after changes take effect means you accept the updated
            terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3">
            Contact us
          </h2>
          <p>
            Questions about these terms? Email us at{" "}
            <a
              href="mailto:hello@commonplace.app"
              className="text-stone-900 underline hover:text-stone-600"
            >
              hello@commonplace.app
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
