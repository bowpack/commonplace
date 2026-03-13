import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Commonplace",
  description:
    "Frequently asked questions about Commonplace — how it works, privacy, and getting started.",
};

export default function FAQPage() {
  return (
    <section className="max-w-3xl mx-auto px-8 py-20">
      <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-lg text-stone-600 text-center mb-16">
        Everything you need to know before getting started.
      </p>

      <div className="space-y-16">
        {/* Storyteller experience */}
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-8">
            About the storyteller experience
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                What if my parent isn&apos;t great with technology?
              </h3>
              <p className="text-stone-600">
                That&apos;s the whole point. There&apos;s no app to download, no
                account to create, no password to remember. They receive a text
                message and reply to it — that&apos;s it. If they can text,
                they can use Commonplace.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Do they need a smartphone?
              </h3>
              <p className="text-stone-600">
                They need a phone that can send and receive text messages. A
                smartphone is better because it allows voice memos and photos,
                but a basic phone that does SMS works for text-only responses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                What kind of questions do you ask?
              </h3>
              <p className="text-stone-600">
                We start with light, easy prompts — childhood memories, favorite
                places, early jobs — and gradually move into deeper territory as
                your storyteller gets comfortable. Questions are thoughtful and
                open-ended, designed to unlock stories rather than feel like an
                interrogation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Can I see the questions before they&apos;re sent?
              </h3>
              <p className="text-stone-600">
                Yes. You can preview upcoming prompts in the app and skip or
                replace any question that doesn&apos;t feel right for your
                storyteller.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                What if they don&apos;t respond to a question?
              </h3>
              <p className="text-stone-600">
                No pressure. We&apos;ll send a gentle nudge after a day. If they
                still don&apos;t reply, we skip that question and move on to the
                next one. Not every question will resonate, and that&apos;s
                fine.
              </p>
            </div>
          </div>
        </div>

        {/* Stories & chapters */}
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-8">
            About the stories and chapters
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                How are chapters written?
              </h3>
              <p className="text-stone-600">
                When your storyteller replies, their words are shaped into a
                narrative chapter using AI. The chapter preserves their voice and
                meaning while polishing it into something that reads
                beautifully. It&apos;s their story — we just help it land on the
                page.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Will it actually sound like them?
              </h3>
              <p className="text-stone-600">
                That&apos;s the goal, and families tell us it does. The AI is
                tuned to preserve the storyteller&apos;s natural phrasing,
                humor, and personality — not to impose a generic writing style.
                If your mom says &ldquo;scared the life out of me,&rdquo;
                that&apos;s exactly how it&apos;ll read.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Can I edit the chapters?
              </h3>
              <p className="text-stone-600">
                Not yet, but it&apos;s on our roadmap. For now, you can flag
                anything that doesn&apos;t feel right and we&apos;ll take a look.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy & data */}
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-8">
            Privacy and your data
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Are our stories used to train AI?
              </h3>
              <p className="text-stone-600">
                No. Your stories are never used to train AI models — not ours,
                not our AI provider&apos;s, not anyone&apos;s. They&apos;re used
                once to generate your chapter, and that&apos;s it.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Who can see our stories?
              </h3>
              <p className="text-stone-600">
                Only the family members you invite. Stories are private to your
                account. Our team doesn&apos;t read your stories unless you
                contact us with a specific issue and give us permission.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                What happens to our stories if we cancel?
              </h3>
              <p className="text-stone-600">
                Your data is kept for 30 days after cancellation in case you
                change your mind. After that, everything is permanently deleted.
                You can request an export of all your stories and chapters
                before canceling.
              </p>
            </div>
          </div>
        </div>

        {/* Sensitive situations */}
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-8">
            Sensitive situations
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Is this appropriate for someone with memory issues?
              </h3>
              <p className="text-stone-600">
                It depends on the individual. For someone in the early stages
                of memory loss, Commonplace can be a gentle, meaningful way to
                capture what they still remember — and many families have told
                us they wish they&apos;d started sooner. If your storyteller
                finds the questions confusing or distressing, you can pause at
                any time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                What if a question touches on something painful?
              </h3>
              <p className="text-stone-600">
                Your storyteller can skip any question — just ignore it or reply
                &ldquo;skip.&rdquo; We also let you preview and remove
                questions in advance if you know certain topics are sensitive.
                The experience should feel comfortable, never forced.
              </p>
            </div>
          </div>
        </div>

        {/* Getting started */}
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-8">
            Getting started
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                How long does setup take?
              </h3>
              <p className="text-stone-600">
                About two minutes. You&apos;ll tell us your storyteller&apos;s
                name and phone number, share a few details about what
                you&apos;d love to hear about, and that&apos;s it. They&apos;ll
                get their first text the same day.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Can multiple family members read along?
              </h3>
              <p className="text-stone-600">
                Yes. You can invite family members to read the stories as
                they&apos;re captured. Everyone gets their own login and can
                follow along at their own pace.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Can I set up more than one storyteller?
              </h3>
              <p className="text-stone-600">
                Yes. Each storyteller is a separate book within your account.
                You can have as many as you&apos;d like — each one is billed
                separately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
