"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  spinnerSize?: "sm" | "md" | "lg";
}

const spinnerSizes = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingOverlay({
  isLoading,
  children,
  className,
  spinnerSize = "lg",
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      <div
        className={cn(
          "transition-all duration-300",
          isLoading && "blur-sm pointer-events-none select-none",
          className
        )}
      >
        {children}
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2
              className={cn(
                "animate-spin text-primary",
                spinnerSizes[spinnerSize]
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
