"use client";

import { useEffect, useRef } from "react";

import { analytics, type SectionId } from "@/_libs/analytics";

const sections: SectionId[] = [
  "about",
  "mission",
  "objective",
  "lesson-options",
  "pricing",
  "scheduling",
  "contact",
  "testimonials",
  "patreon",
];

const DWELL_TIME_MS = 750;

export default function SectionViewAnalytics() {
  const viewedSections = useRef(new Set<SectionId>());
  const pendingSection = useRef<SectionId | null>(null);
  const dwellTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const getActiveSection = (): SectionId | null => {
      const headerOffset =
        document.querySelector("header")?.getBoundingClientRect().height || 0;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        const isInView =
          rect.top - headerOffset <= 0 && rect.bottom - headerOffset >= 0;

        if (isInView) {
          return section;
        }
      }

      return null;
    };

    const clearPendingTimer = () => {
      if (dwellTimer.current !== null) {
        clearTimeout(dwellTimer.current);
        dwellTimer.current = null;
      }

      pendingSection.current = null;
    };

    const scheduleSectionView = (section: SectionId) => {
      if (viewedSections.current.has(section)) return;
      if (pendingSection.current === section) return;

      clearPendingTimer();

      pendingSection.current = section;

      dwellTimer.current = setTimeout(() => {
        if (pendingSection.current !== section) return;

        analytics.sectionViewed(section);
        viewedSections.current.add(section);

        pendingSection.current = null;
        dwellTimer.current = null;
      }, DWELL_TIME_MS);
    };

    const handleScroll = () => {
      const activeSection = getActiveSection();

      if (!activeSection) {
        clearPendingTimer();
        return;
      }

      scheduleSectionView(activeSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Evaluate the initial position immediately.
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearPendingTimer();
    };
  }, []);

  return null;
}
