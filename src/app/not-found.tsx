"use client";

import Link from "next/link";
import { useLayoutEffect } from "react";

export default function NotFound() {
  useLayoutEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <section className="mt-30 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-my-pink-600 dark:text-my-pink-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Page not found
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, that page doesn't exist. You'll find lots to explore on the
            home page.
          </p>
          <Link
            href="/"
            className="bg-my-pink-600 hover:bg-my-pink-800 focus:ring-my-pink-300 dark:focus:ring-my-pink-900 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
