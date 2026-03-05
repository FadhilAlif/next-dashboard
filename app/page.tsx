"use client";

import Link from "next/link";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useUserStore } from "@/stores/user-store";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function Home() {
  const { isLoading, isAuthenticated } = useAuthGuard();
  const user = useUserStore((state) => state.user);

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        {isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">
              Welcome back, {user?.name}!
            </h1>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <main className="flex flex-col items-center gap-8 p-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-6"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-2xl font-semibold">Shadcn Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold text-center">
              Next.js Dashboard Boilerplate
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-md">
              A modern dashboard starter with TanStack Query, Zustand, and
              shadcn/ui components.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 hover:bg-accent hover:text-accent-foreground"
              >
                Sign Up
              </Link>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Demo credentials: admin@example.com / admin123</p>
            </div>
          </main>
        )}
      </div>
    </LoadingOverlay>
  );
}
