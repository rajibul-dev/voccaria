"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/_hooks/useAuth";
import LoadingScreen from "./LoadingScreen";

export default function ClientAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch current user using React Query
  // `user`:
  //   - undefined → query hasn't resolved yet
  //   - null      → not authenticated (401)
  //   - object    → authenticated user
  const { user, isLoading } = useUser();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Special case:
  // OAuth providers (Google/Discord) redirect back with query params.
  // During this moment, cookies/session may not be available yet,
  // so we must NOT redirect prematurely.
  const isOAuthRedirect = searchParams.get("googleLogin") === "success";

  // 🔑 CRITICAL GUARD
  // This ref ensures the redirect logic runs ONLY ONCE.
  //
  // Why?
  // - React 18/19 + App Router can re-run effects during hydration
  // - React Query may revalidate
  // - Router state may update
  //
  // Without this, multiple redirects can occur mid-render,
  // causing React error #310 (tree shape mismatch).
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    // Do nothing while:
    // - auth state is still loading
    // - we're in the middle of an OAuth redirect flow
    if (isLoading || isOAuthRedirect) return;

    // Ensure redirect logic runs only once
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;

      // If user is explicitly null, they are NOT authenticated
      // Redirect them to the auth page
      if (!user) {
        console.log("ClientAuthGuard - No user found, redirecting to /auth");
        router.replace("/auth");
      }
    }
  }, [user, isLoading, isOAuthRedirect, router]);

  // While auth state is loading (initial page load / refresh),
  // show a blocking loading screen to prevent UI flicker.
  if (isLoading && !isOAuthRedirect) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // OAuth redirect case:
  // Render immediately and let the backend/session settle.
  if (isOAuthRedirect) {
    return <>{children}</>;
  }

  // Authenticated user → render protected content
  if (user) {
    return <>{children}</>;
  }

  // Fallback:
  // User is not authenticated and redirect is in progress.
  // Render a minimal loading screen to avoid unmount errors.
  return <LoadingScreen message="Redirecting..." />;
}
