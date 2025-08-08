"use client";

import { useVerifyEmail } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const verifyEmailMutation = useVerifyEmail();
  const hasVerified = useRef(false); // Prevent multiple verification attempts

  useEffect(() => {
    // Prevent running multiple times
    if (hasVerified.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    if (!token || !email) {
      toast.error("Invalid verification link.");
      router.replace("/auth/login");
      return;
    }

    hasVerified.current = true;
    verifyEmailMutation.mutate({ verificationToken: token, email });
  }, [router]); // Remove verifyEmailMutation from dependencies

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {verifyEmailMutation.isPending
          ? "Verifying your email..."
          : verifyEmailMutation.isSuccess
            ? "Email Verified!"
            : "Verification Failed"}
      </h1>
      {verifyEmailMutation.isPending && (
        <p className="mt-4 text-gray-500 dark:text-gray-400">Please wait.</p>
      )}
    </div>
  );
}
