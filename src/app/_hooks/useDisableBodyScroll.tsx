"use client";

import { useEffect } from "react";

export default function useDisableBodyScroll() {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return null;
}

export function DisableBodyScroll() {
  useDisableBodyScroll();
  return null;
}
