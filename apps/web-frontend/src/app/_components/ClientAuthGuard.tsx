"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/_hooks/useAuth";

export default function ClientAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading, isError } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOAuthRedirect = searchParams.get("googleLogin") === "success";

  useEffect(() => {
    // Don't redirect if we're still loading or if this is an OAuth redirect
    if (isLoading || isOAuthRedirect) return;

    // If we're not loading and there's no user, redirect to auth
    if (!user && !isError) {
      console.log("ClientAuthGuard - No user found, redirecting to /auth");
      router.replace("/auth");
    }
  }, [user, isLoading, isError, isOAuthRedirect, router]);

  // Show loading state while checking auth
  if (isLoading && !isOAuthRedirect) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-my-pink-600 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // For OAuth redirects, always render children immediately (let toast handle feedback)
  if (isOAuthRedirect) {
    return <>{children}</>;
  }

  // For normal cases, only render if user is authenticated
  if (user) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  return null;
}
