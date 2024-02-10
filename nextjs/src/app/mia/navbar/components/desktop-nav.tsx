"use client";

import React, { useEffect, useRef, useState } from "react";

// styles
import styles from "./desktop-nav.module.css";

interface DesktopNavProps {
  links: { name: string; selector: string }[];
}

let scrollTimeout: any;

const DesktopNav: React.FC<DesktopNavProps> = ({ links }) => {
  const [active, setActive] = useState("");
  const [clicked, setClicked] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // Find elements
    links.forEach((link) => {
      sectionRefs.current[link.selector] = document?.getElementById(
        link.selector,
      ) as HTMLDivElement; // Assume sections are divs
    });

    // Scroll Event Listener
    const handleScroll = () => {
      if (clicked) return;

      const sections = Object.entries(sectionRefs.current);
      const headerOffset =
        document?.querySelector("header")?.getBoundingClientRect().height || 0;

      for (const [selector, sectionRef] of sections) {
        if (!sectionRef) continue;

        const sectionTop = sectionRef.getBoundingClientRect().top;
        const sectionBottom = sectionRef.getBoundingClientRect().bottom;

        // Consider element in view if it's partially visible
        const isInView =
          sectionTop - headerOffset <= 0 && sectionBottom - headerOffset >= 0;

        if (isInView) {
          setActive(selector);
          break; // Exit if match is found
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [links, clicked]);

  function handleClick(link: string) {
    clearTimeout(scrollTimeout);
    setActive(link);
    setClicked(true);

    const targetElement = document?.getElementById(link);
    const headerOffset = document
      ?.querySelector("header")
      ?.getBoundingClientRect().height;
    const elementPosition = targetElement?.getBoundingClientRect().top;
    const offsetPosition =
      (elementPosition || 0) + window.pageYOffset - (headerOffset || 0);

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    scrollTimeout = setTimeout(() => setClicked(false), 1000);
  }

  return (
    <nav className={styles.contianer}>
      <ul className={styles.flex}>
        {links.map((link) => {
          return (
            <li
              className={`${styles.link} ${
                active === link.selector ? styles.active : ""
              }`}
              key={link.selector}
              onClick={() => handleClick(link.selector)}
            >
              {link.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNav;
