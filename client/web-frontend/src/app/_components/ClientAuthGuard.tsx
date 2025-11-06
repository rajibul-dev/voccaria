"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/_hooks/useAuth";
import LoadingScreen from "./LoadingScreen";

export default function ClientAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOAuthRedirect = searchParams.get("googleLogin") === "success";

  useEffect(() => {
    // Don't redirect if we're still loading or if this is an OAuth redirect
    if (isLoading || isOAuthRedirect) return;

    // If we're not loading and there's no user, redirect to auth immediately
    if (!user && !error) {
      console.log("ClientAuthGuard - No user found, redirecting to /auth");
      router.replace("/auth");
    }
  }, [user, isLoading, error, isOAuthRedirect, router]);

  // Show loading state while checking auth
  if (isLoading && !isOAuthRedirect) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // For OAuth redirects, always render children immediately (let toast handle feedback)
  if (isOAuthRedirect) {
    return <>{children}</>;
  }

  // For normal cases, only render if user is authenticated
  if (user) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting - show minimal loading
  return <LoadingScreen message="Redirecting..." />;
}
