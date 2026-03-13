import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8">
      <div className="max-w-6xl mx-auto px-8 text-center text-sm text-stone-500">
        <p className="mb-4">Commonplace &middot; Their stories, in their words, for your family.</p>
        <div className="flex justify-center gap-6">
          <Link href="/pricing" className="hover:text-stone-700">Pricing</Link>
          <Link href="/faq" className="hover:text-stone-700">FAQ</Link>
          <Link href="/privacy" className="hover:text-stone-700">Privacy</Link>
          <Link href="/terms" className="hover:text-stone-700">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
