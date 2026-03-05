"use client";

import { useAuthGuard } from "@/hooks/use-auth-guard";
import { SignupForm } from "@/components/signup-form";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import Link from "next/link";

export default function SignupPage() {
  const { isLoading } = useAuthGuard();

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            Shadcn Dashboard
          </Link>
          <SignupForm />
        </div>
      </div>
    </LoadingOverlay>
  );
}
