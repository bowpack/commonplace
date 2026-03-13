"use client";

import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
      <Link href="/" className="text-xl font-serif font-bold tracking-tight text-stone-900">
        Commonplace
      </Link>
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
  );
}
