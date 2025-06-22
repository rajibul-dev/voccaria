"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [verifying, setVerifying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    if (!token || !email) {
      toast.error("Invalid verification link.");
      router.replace("/auth/login");
      return;
    }

    async function verifyEmail() {
      try {
        const res = await fetch(
          `${expressBackendBaseRESTOrigin}/auth/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ verificationToken: token, email }),
          },
        );

        const jsonResponse = await res.json();

        if (res.ok) {
          toast.success("Email verified successfully!");
        } else {
          toast.error(jsonResponse.message || "Verification failed.");
        }
      } catch (err) {
        toast.error("Something went wrong verifying your email.");
        console.error(err);
      } finally {
        setVerifying(false);
        router.replace("/auth/login");
      }
    }

    verifyEmail();
  }, [router]);

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Verifying your email...
      </h1>
      {verifying && (
        <p className="mt-4 text-gray-500 dark:text-gray-400">Please wait.</p>
      )}
    </div>
  );
}
