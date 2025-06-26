"use client";

import { useState, useEffect } from "react";
import FancyInput from "./FancyInput";
import Link from "next/link";
import toast from "react-hot-toast";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { isGmail } from "@/_helpers/isGmail";

export default function SignupFormEmailPassword() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

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

    setIsSubmitting(true);
    try {
      const res = await fetch(`${expressBackendBaseRESTOrigin}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: displayName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      setIsSuccess(true);
      setCountdown(30);
      toast.success("Please check your email to verify your account");
    } catch (error) {
      toast.error("Something went wrong during registration");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendVerificationLink() {
    if (!email) return toast.error("Email missing");

    try {
      const res = await fetch(
        `${expressBackendBaseRESTOrigin}/auth/request-new-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not resend link");
        return;
      }
      toast.success("Verification link resent!");
      setCountdown(30);
    } catch (err) {
      console.error(err);
      toast.error("Resend failed");
    }
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
            disabled={isSubmitting}
            className="manual-auth-btn attractive-text-shadow disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
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
              disabled={countdown !== null && countdown > 0}
              className="text-my-pink-600 dark:text-my-pink-400 cursor-pointer font-semibold underline-offset-4 hover:underline disabled:opacity-70 disabled:hover:no-underline"
            >
              {countdown && countdown > 0
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
