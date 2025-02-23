"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirstPostOfFirstCategory } from "@/lib/sanityFetchers";

export default function BlogHeroButton() {
  const [lastRead, setLastRead] = useState<string | null>(null);
  const [firstPost, setFirstPost] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSlug = localStorage.getItem("lastReadPost");
      setLastRead(savedSlug);
    }
  }, []);

  useEffect(() => {
    getFirstPostOfFirstCategory()
      .then((slug) => setFirstPost(slug))
      .catch((error) => console.error("Failed to fetch first post:", error));
  }, []);

  const handleContinue = () => {
    if (lastRead) {
      router.push(`/blog/${lastRead}`);
    } else if (firstPost) {
      router.push(`/blog/${firstPost}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <button
      onClick={handleContinue}
      className="dark:bg-my-pink-600 dark:hover:bg-my-pink-500 hover:bg-dull-violet-500 bg-dull-violet-600 cursor-pointer rounded-lg px-5 text-lg font-medium whitespace-nowrap text-gray-50 transition-colors max-sm:max-w-50 max-sm:grow-1 max-sm:px-4 max-sm:text-base dark:text-gray-50"
    >
      {lastRead ? "Continue reading" : "Start reading"}
    </button>
  );
}
