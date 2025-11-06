"use client";

import { useHeaderHeight } from "@/app/_context/HeaderHeightContext";

export default function HeaderHeightSync({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) {
  const { headerHeight, isReady } = useHeaderHeight();

  return (
    <div
      className={className}
      {...props}
      style={{
        paddingTop: headerHeight, // Dynamically apply padding
        height: "100dvh",
        transition: "padding-top 0.2s ease-in-out, opacity 0.3s ease-in-out",
        opacity: isReady ? 1 : 0, // Fade-in effect
      }}
    >
      {children}
    </div>
  );
}
