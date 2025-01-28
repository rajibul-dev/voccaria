"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import ScaleShiftSpinner from "../_components/ScaleShiftSpinner";

interface IsOldPageProps {
  pathname: string | null;
  isRoot: boolean;
}

const ContextObj = createContext<IsOldPageProps | null>(null);

export default function IsOldPageProvider({ children }: any) {
  const pathname = usePathname() || "";
  const [isRoot, setIsRoot] = useState<boolean | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const isRoot = pathname === "/";
    setIsRoot(isRoot);

    if (isRoot) {
      html.classList.add("old-scaling");
    } else {
      html.classList.remove("old-scaling");
    }
  }, [pathname]);

  if (isRoot === null) {
    return (
      <div className="flex items-center justify-center w-full h-dvh">
        <ScaleShiftSpinner />
      </div>
    );
  }

  return (
    <ContextObj.Provider value={{ pathname, isRoot }}>
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
