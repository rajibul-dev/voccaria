"use client";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { useState } from "react";
import toast from "react-hot-toast";
import FancyInput from "./FancyInput";
import { isGmail } from "@/_helpers/isGmail";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsLoading(true);
    setIsSuccess(false);

    try {
      const res = await fetch(
        `${expressBackendBaseRESTOrigin}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const jsonResponse = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        toast.success("Password reset link sent! Please check your email.");
      } else {
        toast.error(
          jsonResponse.message || "Failed to send password reset link.",
        );
        setIsSuccess(false);
        console.error("Error sending password reset link:", jsonResponse);
      }
    } catch (error) {
      console.error("Error sending password reset link:", error);
      toast.error("Failed to send password reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>

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
