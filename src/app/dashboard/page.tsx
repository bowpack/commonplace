"use client";

import { useQuery } from "convex/react";
import { useUser, UserButton } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user: clerkUser } = useUser();

  // Get the listener's user record
  const listenerUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  // Get the listener's books
  const books = useQuery(
    api.books.getByListenerId,
    listenerUser?._id ? { listenerId: listenerUser._id } : "skip"
  );

  // Get notifications
  const notifications = useQuery(
    api.notifications.getForUser,
    listenerUser?._id ? { userId: listenerUser._id } : "skip"
  );

  // If no books yet, show setup prompt
  if (books && books.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-4">
            Welcome to Commonplace
          </h1>
          <p className="text-stone-600 mb-8">
            Let&apos;s set up your family&apos;s story. It only takes a few
            minutes.
          </p>
          <Link href="/dashboard/setup">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const book = books?.[0];

  // Get responses and prompt queue for the active book
  const responses = useQuery(
    api.responses.getByBook,
    book?._id ? { bookId: book._id } : "skip"
  );

  const promptQueue = useQuery(
    api.promptQueue.getByBook,
    book?._id ? { bookId: book._id } : "skip"
  );

  const chapters = useQuery(
    api.chapters.getByBook,
    book?._id ? { bookId: book._id } : "skip"
  );

  const answeredCount =
    promptQueue?.filter((p) => p.status === "answered").length ?? 0;
  const skippedCount =
    promptQueue?.filter((p) => p.status === "skipped").length ?? 0;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-lg font-serif font-bold text-stone-900">
            Commonplace
          </span>
          <div className="flex items-center gap-4">
            {book && (
              <Link
                href={`/@${book.slug}`}
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                View memoir
              </Link>
            )}
            <UserButton />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Book Header */}
        {book && (
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-bold text-stone-900">
              {book.title}
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              Status: {book.status} &middot; commonplace.com/@{book.slug}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-3xl font-bold text-stone-900">{answeredCount}</p>
            <p className="text-sm text-stone-500">Stories shared</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-3xl font-bold text-stone-900">
              {chapters?.length ?? 0}
            </p>
            <p className="text-sm text-stone-500">Chapters written</p>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <p className="text-3xl font-bold text-stone-900">
              {responses?.length ?? 0}
            </p>
            <p className="text-sm text-stone-500">Total responses</p>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-stone-900">
              Recent activity
            </h2>
          </div>
          <div className="divide-y">
            {notifications && notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-4 ${n.read ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        n.read ? "bg-stone-300" : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm text-stone-800">{n.message}</p>
                      <p className="text-xs text-stone-500 mt-1">
                        {new Date(n._creationTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-stone-500">
                <p>No activity yet. Stories will appear here as they come in.</p>
              </div>
            )}
          </div>
        </div>

        {/* Skipped questions notice */}
        {skippedCount > 0 && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              {skippedCount} question{skippedCount > 1 ? "s were" : " was"}{" "}
              skipped. These might be topics worth bringing up in person.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
