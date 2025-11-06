"use client";

import Link from "next/link";
import { useLayoutEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useLayoutEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <section className="mt-32 max-sm:mt-55">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 dark:text-primary-500 text-my-pink-600 dark:text-my-pink mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            500
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Internal Server Error.
          </p>
          <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-300">
            {error.message}
          </p>
          <Link
            href="/"
            className="bg-my-pink-600 hover:bg-my-pink-800 focus:ring-my-pink-300 dark:focus:ring-my-pink-900 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
