import { ReactNode } from "react";
import { HeaderHeightProvider } from "../_context/HeaderHeightContext";
import { SidebarProvider } from "../_context/SidebarContext";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <HeaderHeightProvider>{children}</HeaderHeightProvider>
    </SidebarProvider>
  );
}
