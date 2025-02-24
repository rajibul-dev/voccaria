"use client";

import { useLayoutEffect } from "react";

export default function useDisableBodyScroll() {
  useLayoutEffect(() => {
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
