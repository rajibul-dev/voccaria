"use client";

import { useState } from "react";
import MiaPageSectionTrackingMobile from "../_old-components/mia-page-section-tracking-mobile";
import MenuIcon from "/public/menu.svg";

import styles from "./old-page-section-tracker.module.css";

const miaPageSectionTrackingData = [
  {
    name: "About Me",
    selector: "about",
  },
  {
    name: "Patreon",
    selector: "patreon",
  },
  {
    name: "How we teach",
    selector: "mission",
  },
  {
    name: "Objective",
    selector: "objective",
  },
  {
    name: "Lesson Options",
    selector: "lesson-options",
  },
  {
    name: "Paid Lessons",
    selector: "pricing",
  },
  {
    name: "Schedule a Lesson",
    selector: "scheduling",
  },
  {
    name: "Contact Me",
    selector: "contact",
  },
  {
    name: "Testimonials",
    selector: "testimonials",
  },
];

export default function OldPageSectionTracking() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <div
        className={`${styles.menuContainer} font-medium hover:bg-gray-100/50`}
        onClick={() => setNavOpen((cur) => !cur)}
      >
        <MenuIcon className={`${styles.menuIcon}`} />
        <span className={`${styles.menuLabel}`}>On this page</span>
      </div>

      <MiaPageSectionTrackingMobile
        navOpen={navOpen}
        onOpen={setNavOpen}
        links={miaPageSectionTrackingData}
      />
    </>
  );
}
