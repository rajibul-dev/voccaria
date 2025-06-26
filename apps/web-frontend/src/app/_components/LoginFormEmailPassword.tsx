"use client";

import { startTransition, useEffect, useState } from "react";
import FancyInput from "./FancyInput";
import Link from "next/link";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "../_context/AuthContext";

export default function LoginFormEmailPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    router.prefetch("/app");
  }, []);

  async function handleLogin() {
    setIsLoading(true);
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

      const jsonResponse = await res.json();

      if (!res.ok) {
        toast.error(jsonResponse.message || "Failed to login");
        return;
      }
      // Schedule user state update without blocking UI
      startTransition(() => {
        setUser(jsonResponse.data.user);
      });

      // Move to /app right away
      router.replace("/app");

      // Toast after short delay (for hydration + nice UX)
      setTimeout(() => {
        toast.success(
          `Login successful! Welcome ${jsonResponse.data.user.name || "User"}!`,
        );
      }, 300);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
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
