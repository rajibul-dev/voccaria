"use client";

import { Toaster } from "react-hot-toast";
import IsOldPageProvider from "./_context/IsOldPage";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SidebarProvider } from "./_context/SidebarContext";
import { PopoverManagerProvider } from "./_components/Popover";
import { AuthProvider } from "./_context/AuthContext";
import { User } from "@/_types/user";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { createTheme, ThemeProvider } from "@mui/material";

const muiTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: {
      textTransform: "capitalize",
    },
  },
});

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

  return (
    <AppRouterCacheProvider>
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
    </AppRouterCacheProvider>
  );
}
