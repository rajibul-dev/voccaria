"use client";

import { usePathname } from "next/navigation";

export function useIsRootClient() {
  const pathname = usePathname();
  return pathname === "/";
}
