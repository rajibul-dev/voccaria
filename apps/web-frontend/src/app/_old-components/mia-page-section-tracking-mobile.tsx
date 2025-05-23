"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import MenuIcon from "/public/menu.svg";
import { createPortal } from "react-dom";
import useOutsideClick from "@/app/_hooks/useOutsideClick";

// components
const Overlay = dynamic(() => import("@/app/_old-components/overlay"));

// styles
import styles from "./mia-page-section-tracking-mobile.module.css";

interface MiaPageSectionTrackingMobileProps {
  links: { name: string; selector: string }[];
  navOpen: boolean;
  onOpen: any;
}

const MiaPageSectionTrackingMobile: React.FC<
  MiaPageSectionTrackingMobileProps
> = ({ links, navOpen, onOpen }) => {
  const ref: any = useOutsideClick(() => onOpen(false));

  const content = (
    <>
      <Overlay isOpen={navOpen}></Overlay>
      <nav ref={ref} className={clsx(styles.container, navOpen && styles.come)}>
        <MenuIcon className={styles.menuIcon} onClick={() => onOpen(false)} />
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
    </>
  );

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

  // Render the portal only on the client-side
  if (typeof window === "undefined") return content;

  return createPortal(content, document?.body);
};

export default MiaPageSectionTrackingMobile;
