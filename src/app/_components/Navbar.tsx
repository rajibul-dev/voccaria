"use client";

import clsx from "clsx";

// styles
import styles from "./navbar.module.css";

// components
import OldLogo from "@/app/_components/OldLogo";
import Link from "next/link";
import Logo from "./Logo";
import OldPageSectionTracking from "./OldPageSectionTracking";
import DarkModeToggler from "./DarkModeToggler";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  return (
    <header
      id="header"
      className={clsx(
        "fixed top-0 z-[65] w-full bg-white/90 backdrop-blur-[4px] transition-colors",
        { [styles.block]: isRoot },
        {
          "h-18 shadow-[0_12px_32px_rgba(0,0,0,0.03)] max-xl:h-16.5 max-sm:h-14.5 dark:bg-gray-800/90":
            !isRoot,
        },
      )}
    >
      <div
        className={clsx(
          "mx-auto flex h-full items-center justify-between",
          isRoot ? styles.container : "!mx-auto max-w-9/10 gap-5",
        )}
      >
        {isRoot ? <OldLogo /> : <Logo />}

        <nav className="h-full" aria-label="Main navigation">
          <ul
            className={clsx(
              "flex h-full items-center text-slate-700",
              isRoot
                ? styles.navLinkWrapper
                : "max-xl:text-md gap-8 text-base max-sm:gap-6 max-sm:text-sm dark:text-slate-200",
            )}
          >
            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li className={clsx("h-full", isRoot && styles.li)} key={href}>
                  <Link
                    className={clsx(
                      "hover:text-my-pink-600 flex h-full items-center font-medium transition-colors duration-100",
                      isRoot && styles.navLink,
                      !isRoot && "hover:dark:text-my-pink-300",
                      isActive &&
                        (isRoot
                          ? "text-my-pink-600"
                          : "text-my-pink-600 dark:text-my-pink-300"),
                    )}
                    href={href}
                    aria-label={label}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            {!isRoot && <DarkModeToggler />}

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
