"use client";

import { useState } from "react";
import FancyInput from "./FancyInput";
import Link from "next/link";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";

export default function SignupFormEmailPassword() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup() {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${expressBackendBaseRESTOrigin}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayName,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        console.error("Signup failed:", data.message);
        return;
      }
    } catch (error) {
      console.error("Something went wrong:", error);
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
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
        required
      >
        Password
      </FancyInput>

      <FancyInput
        type="password"
        name="confirm-password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        required
      >
        Re-enter Password
      </FancyInput>

      <button className="manual-auth-btn attractive-text-shadow">
        Create Account
      </button>

      <div className="mt-6 text-center">
        <span className="dark:text-gray-100">Already have an account?</span>{" "}
        <Link
          className="text-my-pink-600 dark:text-my-pink-400 font-medium underline-offset-4 hover:underline"
          href={"/auth/login"}
        >
          Login
        </Link>
      </div>
    </form>
  );
}
