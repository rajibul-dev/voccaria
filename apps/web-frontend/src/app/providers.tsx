"use client";

import { User } from "@/_types/user";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PopoverManagerProvider } from "./_components/Popover";
import { AuthProvider } from "./_context/AuthContext";
import IsOldPageProvider from "./_context/IsOldPage";
import { SidebarProvider } from "./_context/SidebarContext";
import { darkTheme, lightTheme } from "./_theme/muiTheme";

const queryClient = new QueryClient();

export function Providers({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const pathname = usePathname();
  const isRoot = pathname === "/";
  // const isInApp = pathname.startsWith("/app");
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={muiTheme}>
          <AuthProvider initialUser={initialUser}>
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
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
