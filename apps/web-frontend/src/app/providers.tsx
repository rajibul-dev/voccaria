"use client";

import { Toaster } from "react-hot-toast";
import IsOldPageProvider from "./_context/IsOldPage";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SidebarProvider } from "./_context/SidebarContext";
import { PopoverManagerProvider } from "./_components/Popover";
import { AuthProvider } from "./_context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <AuthProvider>
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
                  success: {
                    duration: 4000,
                  },
                  error: {
                    duration: 10000,
                  },
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "var(--white-primary)",
                    color: "var(--gray-800)",
                    zIndex: 3,
                  },
                }}
              />
              {children}
            </IsOldPageProvider>
          </SidebarProvider>
        </PopoverManagerProvider>
      </AuthProvider>
    </AppRouterCacheProvider>
  );
}
