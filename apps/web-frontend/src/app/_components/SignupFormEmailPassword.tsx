"use client";

import { useState } from "react";
import FancyInput from "./FancyInput";
import Link from "next/link";

export default function SignupFormEmailPassword() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form className="flex flex-col gap-4">
      <FancyInput
        type="text"
        name="name"
        value={displayName}
        onChange={setDisplayName}
      >
        Display Name
      </FancyInput>

      <FancyInput type="email" name="email" value={email} onChange={setEmail}>
        Email
      </FancyInput>

      <FancyInput
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
      >
        Password
      </FancyInput>

      <FancyInput
        type="password"
        name="confirm-password"
        value={confirmPassword}
        onChange={setConfirmPassword}
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
