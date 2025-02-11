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

  useEffect(() => {
    const header = document.getElementById("header");
    if (!header) return;

    const updateHeight = () => setHeaderHeight(header.offsetHeight);

    // Observe height changes
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);

    // Initial set
    updateHeight();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={className}
      {...props}
      style={{ paddingTop: headerHeight, height: "100dvh" }}
    >
      {children}
    </div>
  );
}
