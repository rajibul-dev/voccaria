"use client";

import { useState } from "react";
import MiaPageSectionTrackingMobile from "../_old-components/mia-page-section-tracking-mobile";
import MenuIcon from "@/_assets/icons/menu.svg";

import styles from "./old-page-section-tracker.module.css";

const miaPageSectionTrackingData = [
  {
    name: "About Me",
    selector: "about",
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
  {
    name: "Patreon",
    selector: "patreon",
  },
];

export default function OldPageSectionTracking() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <div
        className={`${styles.menuContainer} group rounded-lg font-medium hover:bg-gray-100/50`}
        onClick={() => setNavOpen((cur) => !cur)}
      >
        <MenuIcon
          className={`${styles.menuIcon} group-hover:fill-my-pink-600 fill-slate-700 stroke-5`}
        />
        <span
          className={`${styles.menuLabel} group-hover:text-my-pink-600 text-slate-700`}
        >
          On this page
        </span>
      </div>

      <MiaPageSectionTrackingMobile
        navOpen={navOpen}
        onOpen={setNavOpen}
        links={miaPageSectionTrackingData}
      />
    </>
  );
}
