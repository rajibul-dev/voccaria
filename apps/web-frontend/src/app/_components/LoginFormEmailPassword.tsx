"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogin } from "@/app/_hooks/useAuth";
import FancyInput from "./FancyInput";

export default function LoginFormEmailPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginMutation = useLogin();

  useEffect(() => {
    router.prefetch("/app");
  }, [router]);

  async function handleLogin() {
    loginMutation.mutate({ email, password });
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
        name="password"
        value={password}
        onChange={setPassword}
        required
        isPassword
        autoComplete="current-password"
      >
        Password
      </FancyInput>

      <button
        type="submit"
        className="manual-auth-btn attractive-text-shadow disabled:cursor-not-allowed disabled:opacity-50"
        disabled={loginMutation.isPending} // Use the loading state from the hook
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>

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
