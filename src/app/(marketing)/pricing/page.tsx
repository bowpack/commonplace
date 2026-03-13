import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing | Commonplace",
  description:
    "Simple pricing for Commonplace. $1 for the first month, $7/month after that. Cancel anytime.",
};

export default function PricingPage() {
  return (
    <section className="max-w-3xl mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">
          Simple pricing. No surprises.
        </h1>
        <p className="text-lg text-stone-600">
          One plan. Everything included. Cancel anytime.
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-stone-200 p-8 mb-16">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-stone-500 mb-2">
            First month
          </p>
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-5xl font-bold text-stone-900">$1</span>
          </div>
          <p className="text-stone-500 text-sm">then $7/month</p>
        </div>

        <ul className="space-y-3 mb-8 text-stone-700">
          <li className="flex gap-3">
            <span className="text-stone-400 flex-shrink-0">&#10003;</span>
            Weekly prompts sent to your storyteller
          </li>
          <li className="flex gap-3">
            <span className="text-stone-400 flex-shrink-0">&#10003;</span>
            AI-generated memoir chapters in their voice
          </li>
          <li className="flex gap-3">
            <span className="text-stone-400 flex-shrink-0">&#10003;</span>
            Voice memo and photo support
          </li>
          <li className="flex gap-3">
            <span className="text-stone-400 flex-shrink-0">&#10003;</span>
            Share with family members
          </li>
          <li className="flex gap-3">
            <span className="text-stone-400 flex-shrink-0">&#10003;</span>
            Cancel anytime — no contracts
          </li>
        </ul>

        <Link href="/sign-up" className="block">
          <Button size="lg" className="w-full text-lg py-6">
            Start preserving their stories
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-2xl font-serif font-bold text-stone-900 text-center mb-8">
          Common questions about pricing
        </h2>

        <div>
          <h3 className="font-semibold text-stone-900 mb-2">
            Why $1 for the first month?
          </h3>
          <p className="text-stone-600">
            We want you to see the magic before you commit. Most families
            receive their first chapter within a week — that&apos;s enough to
            know if this is right for your family.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900 mb-2">
            Are there any hidden fees?
          </h3>
          <p className="text-stone-600">
            No. $1 the first month, $7/month after that. That&apos;s it. No
            setup fees, no per-message charges, no surprise costs.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900 mb-2">
            What happens if I cancel?
          </h3>
          <p className="text-stone-600">
            You keep access through the end of your billing period. After that,
            your stories are kept for 30 days in case you change your mind, then
            permanently deleted. You can also request an export of your data
            before canceling.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900 mb-2">
            Can I pause instead of canceling?
          </h3>
          <p className="text-stone-600">
            Yes. You can pause your subscription at any time, and your
            storyteller will stop receiving prompts. Your stories and chapters
            are preserved. Resume whenever you&apos;re ready.
          </p>
        </div>
      </div>
    </section>
  );
}
