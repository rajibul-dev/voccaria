"use client";

// styles
import styles from "./navbar.module.css";

// components
import OldLogo from "@/app/_components/OldLogo";
import Link from "next/link";
import { useIsOldPage } from "../_context/IsOldPage";
import Logo from "./Logo";
import OldPageSectionTracking from "./OldPageSectionTracking";
import DarkModeToggler from "./DarkModeToggler";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const { isRoot, pathname } = useIsOldPage();

  if (pathname?.startsWith("/studio")) return null;

  return (
    <header
      className={`${
        isRoot
          ? styles.block
          : "h-18 shadow-[0_12px_32px_rgba(0,0,0,0.03)] max-xl:h-16.5 max-sm:h-14.5"
      } bg-white/90 fixed top-0 w-full z-[65] backdrop-blur-[4px] transition-colors ${
        !isRoot ? "dark:bg-gray-800/90" : ""
      }`}
    >
      <div
        className={`${
          isRoot ? styles.container : "gap-5 max-w-9/10 !mx-auto"
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
            } flex items-center text-slate-700 h-full ${
              !isRoot ? "dark:text-slate-200" : ""
            }`}
          >
            {!isRoot && <DarkModeToggler />}

            {navLinks.map(({ href, label }) => (
              <li className={`${isRoot ? styles.li : ""} h-full`} key={href}>
                <Link
                  className={`${
                    isRoot ? styles.navLink : ""
                  } hover:text-my-pink-600 ${
                    !isRoot ? "hover:dark:text-my-pink-300" : ""
                  } font-medium transition-colors duration-100 h-full flex items-center ${
                    pathname === href
                      ? `text-my-pink-600 ${
                          !isRoot ? "dark:text-my-pink-300" : ""
                        }`
                      : ""
                  }`}
                  href={href}
                  aria-label={label}
                >
                  {label}
                </Link>
              </li>
            ))}

            {isRoot && (
              <li>
                <OldPageSectionTracking />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
