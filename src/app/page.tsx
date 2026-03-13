import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <span className="text-xl font-serif font-bold tracking-tight text-stone-900">
          Commonplace
        </span>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton>
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm text-stone-600 hover:text-stone-900 mr-2">
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          The stories that matter most
          <br />
          are the ones never written down.
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Commonplace gently guides your parent or grandparent through their
          life&apos;s stories — one text message at a time — and turns their
          words into a beautiful memoir your family will treasure for
          generations.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="text-lg px-8 py-6">
            Start your family&apos;s story
          </Button>
        </Link>
        <p className="text-sm text-stone-500 mt-4">
          $1 to start. Pay nothing if it&apos;s not for them.
        </p>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-16">
          Here&apos;s how it works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-stone-600">
                1
              </span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              They get a text
            </h3>
            <p className="text-stone-600">
              Your storyteller receives a simple question via text message.
              No apps to download. No accounts to create. Just a text.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-stone-600">
                2
              </span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              They talk or type
            </h3>
            <p className="text-stone-600">
              They reply with a voice memo or text. Sixty seconds here, a few
              sentences there. We guide the conversation — they just share.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-serif font-bold text-stone-600">
                3
              </span>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              A memoir takes shape
            </h3>
            <p className="text-stone-600">
              Their answers become beautifully written chapters — in their own
              voice, in their own words. A life story that grows over time.
            </p>
          </div>
        </div>
      </section>

      {/* Emotional hook */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            Every family has stories that only one person remembers.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-4">
            The way your grandmother met your grandfather. What your dad was
            like before you were born. The job that almost didn&apos;t happen.
            The move that changed everything.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-4">
            These stories used to pass down naturally — around dinner tables, on
            long drives, during quiet evenings. But life got busy. The moments
            slipped by. And with them, the details that make a life vivid and
            real.
          </p>
          <p className="text-lg text-stone-900 font-medium leading-relaxed">
            Commonplace brings that tradition back. One question at a time. One
            story at a time. Before it&apos;s too late.
          </p>
        </div>
      </section>

      {/* The experience */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-serif font-bold text-stone-900 text-center mb-16">
          What to expect
        </h2>
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">Day 1</span>
            </div>
            <div>
              <p className="text-stone-800">
                Your storyteller gets a warm welcome message. We ask a few easy
                questions to get to know them — name, birthplace, the basics.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">
                Day 3
              </span>
            </div>
            <div>
              <p className="text-stone-800">
                The first real question arrives. Something light and
                nostalgic — their earliest memory, their childhood home, what
                they did for fun as a kid.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">
                Week 2
              </span>
            </div>
            <div>
              <p className="text-stone-800">
                You get a notification: your first chapter is ready. You read
                your mom&apos;s words — polished, beautiful, but unmistakably
                her voice — and you learn something you never knew.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-24 text-right">
              <span className="text-sm font-medium text-stone-500">
                Month 3
              </span>
            </div>
            <div>
              <p className="text-stone-800">
                A living memoir is taking shape. Dozens of stories, organized
                chronologically, with a timeline you can scroll through. Family
                members are adding their own perspectives. The picture gets
                fuller.
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
                they never knew. Not through secondhand stories, but in their
                own words. That&apos;s the point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple perspectives */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
            Every story has more than one side.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            When your mom mentions a coworker who taught her everything, we can
            reach out and ask for their version too. When your uncle remembers
            the family road trip differently — that&apos;s where it gets
            interesting.
          </p>
          <div className="bg-white rounded-lg p-8 text-left max-w-xl mx-auto shadow-sm">
            <p className="text-stone-800 italic leading-relaxed mb-4">
              &ldquo;I started at the factory the summer I turned seventeen. The
              foreman was a giant named Bill who scared the life out of
              me.&rdquo;
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Tom, who worked alongside Jane that summer, remembers Bill
              differently: &ldquo;He was a teddy bear. Jane was just too shy to
              see it.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
          Don&apos;t wait for the right moment.
        </h2>
        <p className="text-lg text-stone-600 mb-8">
          The best time to start was years ago. The second best time is now.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="text-lg px-8 py-6">
            Start your family&apos;s story
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8">
        <div className="max-w-6xl mx-auto px-8 text-center text-sm text-stone-500">
          <p>Commonplace &middot; Preserving what matters, one story at a time.</p>
        </div>
      </footer>
    </div>
  );
}
