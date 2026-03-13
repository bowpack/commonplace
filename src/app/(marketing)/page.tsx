import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <>
      {/* Hero — Character + Problem */}
      <section className="max-w-3xl mx-auto px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          Your parents have a lifetime of stories.
          <br />
          You&apos;re running out of time to hear them.
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Commonplace sends your parent or grandparent a simple text message
          with a question about their life. They text or talk back. Their
          answers become beautifully written memoir chapters — in their voice,
          for your family, forever.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="text-lg px-8 py-6">
            Start preserving their stories
          </Button>
        </Link>
        <p className="text-sm text-stone-500 mt-4">
          $1 to start. Cancel anytime.
        </p>
      </section>

      {/* How it works — Plan */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-16">
          Three steps. You handle step one — we handle the rest.
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-stone-600">
                1
              </span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              You sign them up
            </h3>
            <p className="text-stone-600">
              Tell us a little about your storyteller — their name, their
              number, and what you&apos;d love to hear about. Takes two minutes.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-stone-600">
                2
              </span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              They get a text
            </h3>
            <p className="text-stone-600">
              A warm, thoughtful question arrives by text message. No app to
              download. No account to create. They just reply — by typing or
              sending a voice memo.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-stone-600">
                3
              </span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              Chapters appear
            </h3>
            <p className="text-stone-600">
              Their answers are shaped into beautifully written memoir chapters
              you can read anytime. New stories arrive every week. A life,
              taking shape in their own words.
            </p>
          </div>
        </div>
      </section>

      {/* Emotional hook — Problem (all 4 layers) + Failure */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            You already know you should do this.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-4">
            Your dad&apos;s story about his first job. How your grandparents
            actually met — the real version. The year everything almost fell
            apart, and what held the family together. These stories exist right
            now, in one person&apos;s memory. Nowhere else.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-4">
            You&apos;ve thought about recording them. Maybe you&apos;ve even
            brought it up. But life is busy, the conversation feels awkward to
            force, and &ldquo;we&apos;ll do it this summer&rdquo; turns into
            another year gone. It&apos;s not that you don&apos;t care. It&apos;s
            that there hasn&apos;t been a natural way to start.
          </p>
          <p className="text-lg text-stone-900 font-medium leading-relaxed">
            Meanwhile, the details fade. The names get hazy. The stories get
            shorter. And one day, they&apos;ll be gone — not because no one
            wanted them, but because no one captured them.
          </p>
        </div>
      </section>

      {/* What to expect — Success */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-16">
          Here&apos;s what happens next
        </h2>
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">Day 1</span>
            </div>
            <div>
              <p className="text-stone-800">
                You sign up and tell us about your storyteller. They receive a
                warm welcome text — friendly, simple, no pressure. Most people
                reply within the hour.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">
                Week 1
              </span>
            </div>
            <div>
              <p className="text-stone-800">
                The first real question arrives. Something light — a childhood
                memory, a favorite place, what they wanted to be when they grew
                up. You&apos;ll get a notification when their first chapter is
                ready.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">
                Month 1
              </span>
            </div>
            <div>
              <p className="text-stone-800">
                You open the app and find six chapters waiting. You read about a
                summer you never heard of, in words that sound exactly like your
                mom. You text her: &ldquo;I had no idea.&rdquo; She texts back:
                &ldquo;I forgot I even told them that.&rdquo;
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">
                Month 6
              </span>
            </div>
            <div>
              <p className="text-stone-800">
                A living memoir is growing. Dozens of chapters, organized into a
                life. Family members are reading along. Someone asks if your
                uncle can get his own prompts too.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">
                Someday
              </span>
            </div>
            <div>
              <p className="text-stone-800">
                Your children open a beautiful book and meet a grandparent
                through their own words — not secondhand, not summarized, not
                forgotten. That&apos;s what this is for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide — Empathy + Authority */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            We built this because we waited too long.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-4">
            The idea for Commonplace came from a conversation that never
            happened — the one we meant to have with a grandparent who passed
            before we asked. We know what it feels like to realize the stories
            are gone. That&apos;s why we made it so simple that all your
            storyteller has to do is reply to a text.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            Families using Commonplace have captured thousands of stories —
            first jobs, wartime letters, immigration journeys, the mundane
            Tuesdays that turned out to matter most.
          </p>
          <div className="bg-white rounded-lg p-8 text-left max-w-xl mx-auto shadow-sm">
            <p className="text-stone-800 italic leading-relaxed mb-4">
              &ldquo;I started at the factory the summer I turned seventeen. The
              foreman was a giant named Bill who scared the life out of
              me.&rdquo;
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Her son Tom remembers it differently: &ldquo;Bill was a teddy
              bear. Mom was just too shy to see it.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA — Call to Action + Failure */}
      <section className="max-w-3xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
          The stories won&apos;t wait.
        </h2>
        <p className="text-lg text-stone-600 mb-4">
          Every week that passes, details fade. Names blur. Timelines collapse.
          There is no future version of this that gets easier — only one where
          there&apos;s less left to save.
        </p>
        <p className="text-lg text-stone-600 mb-8">
          But right now, your storyteller is a text message away from sharing
          something your family will have forever.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="text-lg px-8 py-6">
            Start preserving their stories
          </Button>
        </Link>
        <p className="text-sm text-stone-500 mt-4">
          $1 to start. Takes 2 minutes. They&apos;ll get their first text today.
        </p>
      </section>
    </>
  );
}
