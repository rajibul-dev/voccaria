"use client";
import { useEffect, useState } from "react";

export default function HeaderHeightSync({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
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
    <div
      className={className}
      {...props}
      style={{
        paddingTop: headerHeight,
        height: "100dvh",
        transition: "padding-top 0.2s ease-in-out, opacity 0.3s ease-in-out",
        opacity: isReady ? 1 : 0, // Fade-in effect
      }}
    >
      {children}
    </div>
  );
}
