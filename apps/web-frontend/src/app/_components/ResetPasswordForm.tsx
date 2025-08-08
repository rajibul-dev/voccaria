"use client";

import { useResetPassword } from "@/app/_hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FancyInput from "./FancyInput";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  // Initialize the mutation hook
  const resetPasswordMutation = useResetPassword();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Client-side validations before attempting mutation
    if (!email) {
      toast.error("Email is missing from the URL.");
      console.error("No email provided");
      return;
    }

    if (!token) {
      toast.error("Token is missing from the URL.");
      console.error("No token provided");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      console.error("Passwords do not match");
      return;
    }

    // Call the mutate function from the hook
    resetPasswordMutation.mutate(
      {
        token,
        email,
        password: newPassword,
      },
      // toast and redirects are handled inside the mutate function
    );
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const emailFromUrl = urlParams.get("email");

    if (!tokenFromUrl || !emailFromUrl) {
      toast.error("Invalid password reset link. Missing token or email.");
      // redirect if link is invalid
      router.replace("/auth/login");
      return;
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  }, [router]);

  return (
    <form
      className="mx-auto flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <FancyInput
        value={newPassword}
        onChange={setNewPassword}
        name="password"
        type="password"
        required
      >
        New Password
      </FancyInput>

      <FancyInput
        name="confirm-password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        required
      >
        Confirm New Password
      </FancyInput>

      <button
        type="submit"
        className="manual-auth-btn attractive-text-shadow w-full disabled:cursor-not-allowed disabled:opacity-50"
        disabled={resetPasswordMutation.isPending}
      >
        {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
