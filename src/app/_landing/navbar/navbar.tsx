"use client";

import { useState } from "react";
import Image from "next/image";

// styles
import styles from "./navbar.module.css";

// image and icon
import miaLogo from "../../../../public/images/mia-heart-logo.png";
import menuIcon from "../../../../public/menu.svg";

// components
import DesktopNav from "./components/desktop-nav";
import MobileNav from "./components/mobile-nav";
import OldLogo from "@/app/_components/OldLogo";

// page navigation data
const navData = [
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

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header id="header" className={styles.block}>
      <div className={`${styles.container}`}>
        <OldLogo />

        <DesktopNav links={navData} />

        <Image
          src={menuIcon}
          className={styles.menuIcon}
          alt="3-line menu icon"
          placeholder="empty"
          onClick={() => setNavOpen((cur) => !cur)}
          priority
        />
        <MobileNav
          navOpen={navOpen}
          onOpen={setNavOpen}
          links={navData}
          menuIcon={menuIcon}
        />
      </div>
    </header>
  );
}
