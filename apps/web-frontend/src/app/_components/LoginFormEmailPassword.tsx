"use client";

import { useState } from "react";
import FancyInput from "./FancyInput";
import Link from "next/link";

export default function LoginFormEmailPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="flex flex-col gap-4">
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

      <button className="manual-auth-btn attractive-text-shadow">Login</button>

      <Link
        className="text-center text-sm text-gray-500 underline-offset-4 hover:underline"
        href={"/auth/forgot-password"}
      >
        Forgot password?
      </Link>

      <div className="mt-6">
        <span>Don't have an account?</span>{" "}
        <Link
          className="text-my-pink-600 font-medium underline-offset-4 hover:underline"
          href={"/auth/register"}
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
