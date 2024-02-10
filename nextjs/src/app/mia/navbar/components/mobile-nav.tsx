"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";

// styles
import styles from "./mobile-nav.module.css";
import Overlay from "@/app/components/overlay";
import { createPortal } from "react-dom";
import useOutsideClick from "@/app/hooks/useOutsideClick";

interface MobileNavProps {
  links: { name: string; selector: string }[];
  navOpen: boolean;
  menuIcon: any;
  onOpen: any;
}

const MobileNav: React.FC<MobileNavProps> = ({
  links,
  menuIcon,
  navOpen,
  onOpen,
}) => {
  const ref: any = useOutsideClick(() => onOpen(false));

  // disable body scroll when modal open
  useEffect(() => {
    if (navOpen) {
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [navOpen]);

  function handleClick(selector: string) {
    const element = document?.getElementById(selector);
    const headerOffset =
      document?.querySelector("header")?.getBoundingClientRect().height || 0;
    const elementPosition = element?.getBoundingClientRect().top;
    const offsetPosition =
      (elementPosition || 0) + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    onOpen(false);
  }

  // Check if document is defined before rendering
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <Overlay isOpen={navOpen}></Overlay>
      <nav
        ref={ref}
        className={clsx(styles.container, navOpen && styles.come)}
      >
        <Image
          className={styles.menuIcon}
          src={menuIcon}
          alt="3-line menu icon"
          onClick={() => onOpen(false)}
        />
        <ul className={styles.flex}>
          {links.map((link) => (
            <li
              className={styles.link}
              key={link.selector}
              onClick={() => handleClick(link.selector)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </nav>
    </>,
    document?.body,
  );
};

export default MobileNav;
