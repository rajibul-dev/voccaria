"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { PopoverManagerProvider } from "./_components/Popover";
import IsOldPageProvider from "./_context/IsOldPage";
import { SidebarProvider } from "./_context/SidebarContext";
import { ThemeProvider } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import { darkTheme, lightTheme } from "./_theme/muiTheme";

// Create a singleton QueryClient for the client-side
// This ensures the same client is used across the client-side application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes to match individual query settings
      retry: 1, // Retry once on failure
      refetchOnWindowFocus: false, // Prevent automatic refetch on window focus
    },
  },
});

export function Providers({
  children,
  dehydratedState, // Now accepting dehydratedState from SSR
}: {
  children: React.ReactNode;
  dehydratedState: DehydratedState; // Type for dehydrated state
}) {
  const [muiMode, setMuiMode] = useState<"light" | "dark">("light");

  useLayoutEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setMuiMode("dark");
    else setMuiMode("light");

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setMuiMode(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const muiTheme = muiMode === "dark" ? darkTheme : lightTheme;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          {/* Hydrate the client-side cache with server-fetched data */}
          <HydrationBoundary state={dehydratedState}>
            <PopoverManagerProvider>
              <SidebarProvider>
                <IsOldPageProvider>{children}</IsOldPageProvider>
              </SidebarProvider>
            </PopoverManagerProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
