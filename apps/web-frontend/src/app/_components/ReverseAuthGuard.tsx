"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_hooks/useAuth";

export default function ReverseAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect if we're still loading
    if (isLoading) return;

    // If user is authenticated, redirect to app
    if (user) {
      console.log(
        "ReverseAuthGuard - User authenticated, redirecting to /app/dashboard",
      );
      router.replace("/app/dashboard");
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-my-pink-600 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is not authenticated
  if (!user) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  return null;
}
