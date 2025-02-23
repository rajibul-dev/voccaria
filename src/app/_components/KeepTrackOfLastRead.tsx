"use client";

import { useEffect } from "react";

export default function KeepTrackOfLastRead({ slug }: { slug: string }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastReadPost", slug);
    }
  }, [slug]);

  return null;
}
