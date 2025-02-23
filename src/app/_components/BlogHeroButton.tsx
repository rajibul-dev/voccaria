"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogHeroButton({
  firstPostSlug,
}: {
  firstPostSlug: string;
}) {
  const [lastRead, setLastRead] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSlug = localStorage.getItem("lastReadPost");
      setLastRead(savedSlug);
    }
  }, []);

  const handleContinue = () => {
    if (lastRead) {
      router.push(`/blog/${lastRead}`);
    } else if (firstPostSlug) {
      router.push(`/blog/${firstPostSlug}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <button
      onClick={handleContinue}
      className="dark:bg-my-pink-600 dark:hover:bg-my-pink-500 hover:bg-dull-violet-500 bg-dull-violet-600 cursor-pointer rounded-lg px-5 text-lg font-medium whitespace-nowrap text-white transition-colors max-sm:max-w-50 max-sm:grow-1 max-sm:px-4 max-sm:text-base"
    >
      {lastRead ? "Continue reading" : "Start reading"}
    </button>
  );
}
