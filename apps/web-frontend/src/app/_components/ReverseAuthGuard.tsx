"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_hooks/useAuth";
import LoadingScreen from "./LoadingScreen";

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

    // If user is authenticated, redirect to app immediately
    if (user) {
      console.log(
        "ReverseAuthGuard - User authenticated, redirecting to /app/dashboard",
      );
      router.replace("/app/dashboard");
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // Only render children if user is not authenticated
  if (!user) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting - show minimal loading
  return <LoadingScreen message="Redirecting to dashboard..." />;
}
