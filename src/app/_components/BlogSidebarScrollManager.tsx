"use client";

import { useEffect, useLayoutEffect } from "react";

interface BlogSidebarScrollManagerProps {
  sidebarId: string; // Pass the ID of your sidebar
}

export default function BlogSidebarScrollManager({
  sidebarId,
}: BlogSidebarScrollManagerProps) {
  // Restore scroll position on mount
  useLayoutEffect(() => {
    const sidebarElement = document.getElementById(sidebarId);
    const savedScroll = sessionStorage.getItem("sidebarScroll");

    if (sidebarElement && savedScroll) {
      requestAnimationFrame(() => {
        sidebarElement.scrollTop = parseInt(savedScroll, 10);
      });
    }
  }, [sidebarId]);

  // Save scroll position whenever sidebar scrolls
  useEffect(() => {
    const sidebarElement = document.getElementById(sidebarId);

    if (!sidebarElement) return;

    const saveScrollPosition = () => {
      sessionStorage.setItem("sidebarScroll", String(sidebarElement.scrollTop));
    };

    sidebarElement.addEventListener("scroll", saveScrollPosition);

    return () => {
      sidebarElement.removeEventListener("scroll", saveScrollPosition);
    };
  }, [sidebarId]);

  return null;
}
