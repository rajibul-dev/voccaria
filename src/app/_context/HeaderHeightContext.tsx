"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface HeaderHeightContextProps {
  headerHeight: number;
  isReady: boolean;
}

const HeaderHeightContext = createContext<HeaderHeightContextProps>({
  headerHeight: 0,
  isReady: false,
});

export function HeaderHeightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isReady, setIsReady] = useState(false); // Opacity control

  useEffect(() => {
    const header = document.getElementById("header");
    if (!header) return;

    const updateHeight = () => {
      setHeaderHeight(header.offsetHeight);
      setIsReady(true); // Enable opacity transition after first update
    };

    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);

    updateHeight();

    return () => observer.disconnect();
  }, []);

  return (
    <HeaderHeightContext.Provider value={{ headerHeight, isReady }}>
      {children}
    </HeaderHeightContext.Provider>
  );
}

export function useHeaderHeight() {
  return useContext(HeaderHeightContext);
}
