"use client";

import clsx from "clsx";

// styles
import styles from "./navbar.module.css";

// components
import OldLogo from "@/app/_components/OldLogo";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import BlogSearchBarOnNav from "./BlogSearchBarOnNav";
import DarkModeToggler from "./DarkModeToggler";
import Logo from "./Logo";
import OldPageSectionTracking from "./OldPageSectionTracking";
import BlogSidebarData from "./BlogSidebarData";
import MiaPageSectionTrackingDesktop from "../_old-components/mia-page-section-tracking-desktop";
import Image from "next/image";
import MiaPageSectionTrackingMobile from "../_old-components/mia-page-section-tracking-mobile";
import { set } from "date-fns";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

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
  const pathname = usePathname();
  const isRoot = pathname === "/";
  const isPostPage = pathname.startsWith(`/blog/`);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
          { "justify-normal": isPostPage },
        )}
      >
        {isPostPage && (
          <>
            <button
              onClick={toggleDrawer(true)}
              className={clsx(
                `-mr-3 -ml-5 cursor-pointer rounded-sm px-2 py-1.5 transition-colors *:h-7 *:w-7 *:text-slate-600 *:transition-colors hover:bg-slate-100 md:hidden *:dark:text-slate-200 hover:dark:bg-slate-700 [@media(max-width:28.25em)]:-ml-2.5`,
              )}
            >
              <IoMenu />
            </button>
            <SwipeableDrawer
              onClose={toggleDrawer(false)}
              open={open}
              onOpen={toggleDrawer(true)}
            >
              <div className="h-full w-81 overflow-y-auto bg-gray-100 pt-12 pb-8 dark:bg-gray-800">
                <BlogSidebarData
                  isMobile={true}
                  toggleDrawer={() => setOpen(false)}
                />
              </div>
            </SwipeableDrawer>
          </>
        )}
        {isRoot ? <OldLogo /> : <Logo pathname={pathname} />}

        <MiaPageSectionTrackingDesktop links={navData} />

        <IoMenu
          className={`cursor-pointer p-[1rem] text-[6rem] text-slate-700 min-[936px]:hidden`}
          onClick={() => setOpen((cur) => !cur)}
        />
        <MiaPageSectionTrackingMobile
          navOpen={open}
          onOpen={setOpen}
          links={navData}
        />
      </div>
    </header>
  );
}
