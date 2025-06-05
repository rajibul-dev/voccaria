"use client";

import { useState } from "react";
import FancyInput from "./FancyInput";
import Link from "next/link";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";

export default function LoginFormEmailPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const res = await fetch(`${expressBackendBaseRESTOrigin}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        console.error("Login failed:", data.message);
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
        handleLogin();
      }}
      className="flex flex-col gap-4"
    >
      <FancyInput
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
      >
        Email
      </FancyInput>

      <FancyInput
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
        required
        autoComplete="current-password"
      >
        Password
      </FancyInput>

      <button className="manual-auth-btn attractive-text-shadow">Login</button>

      <Link
        className="text-center text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-300"
        href={"/auth/forgot-password"}
      >
        Forgot password?
      </Link>

      <div className="mt-6 text-center">
        <span className="text-gray-800 dark:text-gray-100">
          Don't have an account?
        </span>{" "}
        <Link
          className="text-my-pink-600 dark:text-my-pink-400 font-medium underline-offset-4 hover:underline"
          href={"/auth/register"}
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
