"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Toaster } from "react-hot-toast";
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
import clsx from "clsx";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isRoot = pathname === "/";
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
                <IsOldPageProvider>
                  <Toaster
                    position="bottom-center"
                    gutter={12}
                    containerStyle={{
                      margin: "8px",
                    }}
                    toastOptions={{
                      className: clsx(
                        "!bg-gray-100 !text-gray-800 !font-medium leading-[1.3] !border !border-gray-300 [&>div]:!my-0",
                        {
                          "dark:!bg-gray-700 dark:!text-gray-200 !text-base dark:!border-gray-600":
                            !isRoot,
                          "": isRoot,
                        },
                      ),
                      success: {
                        duration: 3000,
                      },
                      error: {
                        duration: 10000,
                      },
                      style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "13px 16px",
                        zIndex: 3,
                      },
                    }}
                  />
                  {children}
                </IsOldPageProvider>
              </SidebarProvider>
            </PopoverManagerProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
