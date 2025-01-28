"use client";

// styles
import styles from "./navbar.module.css";

// components
import OldLogo from "@/app/_components/OldLogo";
import OldPageSectionTracking from "./OldPageSectionTracking";
import Link from "next/link";
import { useIsOldPage } from "../_context/IsOldPage";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { isRoot } = useIsOldPage();

  return (
    <header
      className={`${
        isRoot
          ? styles.block
          : "h-22 shadow-[0_12px_32px_rgba(0,0,0,0.03)] max-xl:h-16.5 max-sm:h-14.5"
      } bg-white/90 fixed top-0 w-full z-[65] backdrop-blur-[4px]`}
    >
      <div
        className={`${
          isRoot ? styles.container : "gap-5 max-w-19/20 !mx-auto"
        } flex items-center justify-between h-full mx-auto`}
      >
        {isRoot && <OldLogo />}
        {!isRoot && <Logo />}

        <nav aria-label="Main navigation">
          <ul
            className={`${
              isRoot
                ? styles.navLinkWrapper
                : "text-base gap-5 max-xl:text-md max-sm:text-sm"
            } flex items-center text-slate-600`}
          >
            {navLinks.map(({ href, label }) => (
              <li className={`${isRoot ? styles.li : ""}`} key={href}>
                <Link
                  className={`${
                    isRoot ? styles.navLink : ""
                  } hover:text-my-pink-600 font-medium transition-colors duration-100`}
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
