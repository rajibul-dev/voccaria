"use client";

// styles
import styles from "./navbar.module.css";

// components
import OldLogo from "@/app/_components/OldLogo";
import OldPageSectionTracking from "./OldPageSectionTracking";
import Link from "next/link";
import { useIsOldPage } from "../_context/IsOldPage";
import Logo from "./Logo";
import Modal from "../_old-components/modal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { isRoot, pathname } = useIsOldPage();

  return (
    <header
      className={`${
        isRoot
          ? styles.block
          : "h-18 shadow-[0_12px_32px_rgba(0,0,0,0.03)] max-xl:h-16.5 max-sm:h-14.5"
      } bg-white/90 fixed top-0 w-full z-[65] backdrop-blur-[4px]`}
    >
      <div
        className={`${
          isRoot ? styles.container : "gap-5 max-w-19/20 !mx-auto"
        } flex items-center justify-between h-full mx-auto`}
      >
        {isRoot && <OldLogo />}
        {!isRoot && <Logo />}

        <nav className="h-full" aria-label="Main navigation">
          <ul
            className={`${
              isRoot
                ? styles.navLinkWrapper
                : "text-base gap-8 max-xl:text-md max-sm:text-sm max-sm:gap-6"
            } flex items-center text-slate-700 h-full`}
          >
            {navLinks.map(({ href, label }) => (
              <li className={`${isRoot ? styles.li : ""} h-full`} key={href}>
                <Link
                  className={`${
                    isRoot ? styles.navLink : ""
                  } hover:text-my-pink-600 font-medium transition-colors duration-100 h-full flex items-center ${
                    pathname === href ? "text-my-pink-600" : ""
                  }`}
                  href={href}
                  aria-label={label}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>{isRoot && <OldPageSectionTracking />}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
