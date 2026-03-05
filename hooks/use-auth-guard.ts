"use client";

import { useEffect, useSyncExternalStore, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/stores/user-store";

const publicRoutes = ["/login", "/signup"];

// Custom hook to check hydration state without triggering cascading renders
function useHydrated() {
  return useSyncExternalStore(
    useCallback(() => () => {}, []), // Server snapshot
    useCallback(() => true, []), // Client snapshot
    useCallback(() => false, []) // Hydration fallback
  );
}

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isHydrated = useHydrated();

  // Handle redirects
  useEffect(() => {
    if (!isHydrated) return;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isAuthenticated && !isPublicRoute && pathname !== "/") {
      router.push("/login");
    }

    if (isAuthenticated && isPublicRoute) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, pathname, router, isHydrated]);

  return { isLoading: !isHydrated, isAuthenticated };
}
