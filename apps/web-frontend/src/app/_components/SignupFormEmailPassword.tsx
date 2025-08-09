"use client";

import { useState, useEffect } from "react";
import FancyInput from "./FancyInput";
import Link from "next/link";
import toast from "react-hot-toast";
import { isGmail } from "@/_helpers/isGmail";
import { useRegister, useResendVerificationEmail } from "@/app/_hooks/useAuth";

export default function SignupFormEmailPassword() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Initialize mutations with clean destructuring
  const { register, isRegistering, error: registerError } = useRegister();
  const { resendEmail, isResending } = useResendVerificationEmail();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev && prev > 0 ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  async function handleSignup() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Use the clean direct function call
    register(
      { name: displayName, email, password },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setCountdown(30);
        },
      },
    );
  }

  async function handleResendVerificationLink() {
    if (!email) {
      toast.error("Email missing");
      return;
    }

    // Use the clean direct function call
    resendEmail(
      { email },
      {
        onSuccess: () => {
          setCountdown(30);
        },
      },
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignup();
      }}
      className="flex flex-col gap-4"
    >
      {!isSuccess ? (
        <>
          <FancyInput
            type="text"
            name="name"
            value={displayName}
            onChange={setDisplayName}
            required
          >
            Display Name
          </FancyInput>

          <FancyInput
            type="email"
            name="email"
            value={email}
            onChange={setEmail}
            required
          >
            Email
          </FancyInput>

          <FancyInput
            isPassword
            name="password"
            value={password}
            onChange={setPassword}
            required
          >
            Password
          </FancyInput>

          <FancyInput
            isPassword
            name="confirm-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
          >
            Re-enter Password
          </FancyInput>

          <button
            type="submit"
            disabled={isRegistering}
            className="manual-auth-btn attractive-text-shadow disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isRegistering ? "Creating Account..." : "Create Account"}
          </button>
        </>
      ) : (
        <div className="text-center text-base text-slate-700 dark:text-slate-200">
          <p>
            Thank you for registering! Please check your email (<b>{email}</b>)
            for a verification link.
            {isGmail(email) && (
              <>
                {" "}
                <span className="mt-2">
                  <a
                    href="https://mail.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-my-pink-600 dark:text-my-pink-400 font-semibold underline-offset-4 hover:underline"
                  >
                    Open Gmail
                  </a>
                </span>
              </>
            )}
          </p>

          <p className="mt-4">
            Didn’t receive it?&nbsp;
            <button
              type="button"
              onClick={handleResendVerificationLink}
              disabled={(countdown !== null && countdown > 0) || isResending}
              className="text-my-pink-600 dark:text-my-pink-400 cursor-pointer font-semibold underline-offset-4 hover:underline disabled:opacity-70 disabled:hover:no-underline"
            >
              {isResending
                ? "Sending..."
                : countdown && countdown > 0
                  ? `Try again in ${countdown}s`
                  : "Resend Link"}
            </button>
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <span className="dark:text-gray-100">Already have an account?</span>{" "}
        <Link
          className="text-my-pink-600 dark:text-my-pink-400 font-medium underline-offset-4 hover:underline"
          href="/auth/login"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
