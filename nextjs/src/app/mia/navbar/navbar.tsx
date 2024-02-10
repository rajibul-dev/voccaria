"use client";

import Image from "next/image";

// styles
import styles from "./navbar.module.css";

// image and icon
import miaLogo from "../../../../public/images/mia-heart-logo.png";
import menuIcon from "../../../../public/menu.svg";

// components
import DesktopNav from "./components/desktop-nav";
import MobileNav from "./components/mobile-nav";
import { useState } from "react";

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
    name: "Objective",
    selector: "objective",
  },
  {
    name: "Lesson Options",
    selector: "lesson-options",
  },
  {
    name: "Pricing",
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
    <header className={styles.block}>
      <div className={`${styles.container}`}>
        <Image
          src={miaLogo}
          className={styles.logo}
          alt="Mia heart logo | Voccaria"
          placeholder="blur"
          blurDataURL="../../../../public/images/mia-heart-logo.png"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />

        <DesktopNav links={navData} />

        <Image
          src={menuIcon}
          className={styles.menuIcon}
          alt="3-line menu icon"
          placeholder="empty"
          onClick={() => setNavOpen((cur) => !cur)}
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
