"use client";

import clsx from "clsx";

// styles
import styles from "./navbar.module.css";

// components
import { navLinks } from "@/_constants/navLinks";
import OldLogo from "@/app/_components/OldLogo";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import { useAuth } from "../_context/AuthContext";
import BlogSearchBarOnNav from "./BlogSearchBarOnNav";
import BlogSidebarData from "./BlogSidebarData";
import DarkModeToggler from "./DarkModeToggler";
import Logo from "./Logo";
import NavbarLoginButton from "./NavbarLoginButton";
import OldPageSectionTracking from "./OldPageSectionTracking";
import Popover from "./Popover";
import RestMenu from "./RestMenu";

export default function Navbar() {
  const pathname = usePathname();
  const isRoot = pathname === "/";
  const isPostPage = pathname.startsWith(`/blog/`);
  const shouldHideNavbar =
    pathname.startsWith("/auth") || pathname.startsWith("/app");
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  if (shouldHideNavbar) {
    return null;
  }

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
        {isRoot ? (
          <div className="flex items-center gap-6">
            <div className="min-[670px]:hidden">
              <OldPageSectionTracking />
            </div>
            <OldLogo />
          </div>
        ) : (
          <Logo pathname={pathname} />
        )}

        <nav className="h-full" aria-label="Main navigation">
          <ul
            className={clsx(
              "flex h-full items-center text-slate-700",
              isRoot
                ? styles.navLinkWrapper
                : "max-xl:text-md gap-8 text-base max-sm:gap-6 max-sm:text-sm dark:text-slate-200",
            )}
          >
            {isPostPage && (
              <li className="max-sm:order-4 max-sm:-ml-4">
                <BlogSearchBarOnNav />
              </li>
            )}

            {isRoot && (
              <li className="max-[670px]:hidden">
                <OldPageSectionTracking />
              </li>
            )}

            {navLinks.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li
                  className={clsx(
                    "h-full",
                    isRoot && styles.li,
                    "max-[670px]:hidden",
                  )}
                  key={href}
                >
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

            {!isRoot && (
              <li className={clsx({ "-ml-2": isPostPage })}>
                <DarkModeToggler />
              </li>
            )}

            <NavbarLoginButton
              isRoot={isRoot}
              isAuthenticated={isAuthenticated}
              authLoading={authLoading}
            />

            {!isPostPage && (
              <div className="h-fit min-[670px]:hidden">
                <Popover
                  triggerType="click"
                  placementX="end"
                  placementY="bottom"
                  noBox
                  fixed
                >
                  <Popover.Trigger id="navbar-links">
                    <PiDotsNineBold
                      strokeWidth={10}
                      className={clsx(
                        "text-old-btn-pink -ml-2.5 cursor-pointer text-[2.5rem]",
                        {
                          "ml-[-10px] text-[4rem]": isRoot,
                          "max-[500px]:-ml-3 max-[500px]:text-[2rem]": !isRoot,
                        },
                      )}
                    />
                  </Popover.Trigger>

                  <Popover.Content id="navbar-links">
                    <div
                      className={clsx(
                        "flex flex-col gap-2.5 border border-gray-300 bg-gray-50 p-4 shadow-sm",
                        {
                          "gap-[1rem] p-[1.6rem]": isRoot,
                          "dark:border-gray-600 dark:bg-gray-700": !isRoot,
                        },
                      )}
                    >
                      {navLinks.map(({ href, label, icon }) => {
                        const isActive =
                          pathname === href || pathname.startsWith(`${href}/`);

                        return (
                          <RestMenu
                            key={href}
                            isActive={isActive}
                            href={href}
                            icon={icon}
                            label={label}
                            isRoot={isRoot}
                          />
                        );
                      })}
                    </div>
                  </Popover.Content>
                </Popover>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
