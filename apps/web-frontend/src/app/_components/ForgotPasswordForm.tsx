// ForgotPasswordForm.tsx
"use client";

import { isGmail } from "@/_helpers/isGmail";
import { useForgotPassword } from "@/app/_hooks/useAuth";
import { useState } from "react";
import FancyInput from "./FancyInput";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize the mutation hook
  const { forgotPassword, isSending } = useForgotPassword();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Reset success state before new attempt
    setIsSuccess(false);

    // Call the mutate function from the hook
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: () => {
          setIsSuccess(false);
        },
      },
    );
  }

  return (
    <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
      <FancyInput
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
        inputClassName="mb-6"
        required
      >
        Email
      </FancyInput>
      <button
        type="submit"
        className="manual-auth-btn attractive-text-shadow w-full disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send Reset Link"}
      </button>

      {/* Display success message and Gmail link only if the mutation was successful */}
      {isSuccess && isGmail(email) && (
        <p className="mt-4 text-center text-base text-slate-700 dark:text-slate-200">
          Check your email for password reset link:{" "}
          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-my-pink-600 dark:text-my-pink-400 font-semibold underline-offset-4 hover:underline"
          >
            Open Gmail
          </a>
        </p>
      )}
    </form>
  );
}
