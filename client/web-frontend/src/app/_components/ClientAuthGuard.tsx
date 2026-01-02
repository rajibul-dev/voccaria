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
  const { user, status } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isOAuthRedirect = searchParams.get("googleLogin") === "success";

  useEffect(() => {
    if (isOAuthRedirect) return;

    if (status === "error") {
      console.log("ClientAuthGuard - unauthenticated, redirecting");
      router.replace("/auth");
    }
  }, [status, isOAuthRedirect, router]);

  if (status === "pending" && !isOAuthRedirect) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (isOAuthRedirect) {
    return <>{children}</>;
  }

  if (status === "success" && user) {
    return <>{children}</>;
  }

  return <LoadingScreen message="Redirecting..." />;
}
