import { ReactNode } from "react";
import { HeaderHeightProvider } from "../_context/HeaderHeightContext";

export default function Layout({ children }: { children: ReactNode }) {
  return <HeaderHeightProvider>{children}</HeaderHeightProvider>;
}
