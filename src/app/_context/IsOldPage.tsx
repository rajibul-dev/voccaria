"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useLayoutEffect, useState } from "react";

interface IsOldPageProps {
  pathname: string | null;
  isRoot: boolean;
}

const ContextObj = createContext<IsOldPageProps | null>(null);

export default function IsOldPageProvider({ children }: any) {
  const pathname = usePathname() || "";
  const [isRoot, setIsRoot] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const isRoot = pathname === "/";
    setIsRoot(isRoot);

    if (isRoot) {
      html.classList.add("old-scaling");
    } else {
      html.classList.remove("old-scaling");
    }
  }, [pathname]);

  return (
    <ContextObj.Provider value={{ pathname, isRoot: Boolean(isRoot) }}>
      {children}
    </ContextObj.Provider>
  );
}

export function useIsOldPage() {
  const context = useContext<IsOldPageProps | null>(ContextObj);

  if (!context) {
    throw new Error("Context was used outside of boundary");
  }

  return context;
}
