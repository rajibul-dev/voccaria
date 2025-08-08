"use client";

import clsx from "clsx";
import { useLayoutEffect, useState, useEffect } from "react";
import { IoMoon } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";

type Theme = "dark" | "light" | null;

export default function DarkModeToggler({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and system preference
  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    let initialTheme: Theme;
    if (storedTheme === "dark" || storedTheme === "light") {
      initialTheme = storedTheme;
    } else {
      initialTheme = systemPrefersDark ? "dark" : "light";
    }

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme to document
  function applyTheme(newTheme: Theme) {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleDarkMode() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={clsx(
          "cursor-pointer rounded-sm px-2 py-1.5 transition-colors *:h-7 *:w-7",
          className,
        )}
      >
        <div className="h-7 w-7" /> {/* Placeholder */}
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={clsx(
        "cursor-pointer rounded-sm px-2 py-1.5 transition-colors *:h-7 *:w-7 *:fill-slate-600 *:transition-colors hover:bg-slate-100 *:dark:fill-slate-200 hover:dark:bg-slate-700",
        className,
      )}
    >
      {theme === "light" ? <IoMoon /> : <MdLightMode />}
    </button>
  );
}
