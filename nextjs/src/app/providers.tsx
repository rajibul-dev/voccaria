"use client";

import chakraTheme from "@/config/chakraui";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider
      theme={chakraTheme}
      cssVarsRoot=":root"
    >
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
    </ChakraProvider>
  );
}