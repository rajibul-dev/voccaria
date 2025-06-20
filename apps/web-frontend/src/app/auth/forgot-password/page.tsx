"use client";

import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import FancyInput from "@/app/_components/FancyInput";
import { useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsLoading(true);

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

    setIsLoading(false);

    const jsonResponse = await res.json();
    if (res.ok) {
      console.log("Password reset link sent:", jsonResponse);
      toast.success("Password reset link sent! Please check your email.");
      setEmail("");
    } else {
      console.error("Error sending password reset link:", jsonResponse);
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-3xl font-bold text-slate-800 max-sm:text-2xl dark:text-slate-200">
        Forgot Password
      </h1>
      <section className="w-full">
        <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
          Please enter your email address to receive a password reset link.
        </p>
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
            className="manual-auth-btn attractive-text-shadow w-full"
            disabled={isLoading}
          >
            Send Reset Link
          </button>
        </form>
      </section>
    </div>
  );
}
