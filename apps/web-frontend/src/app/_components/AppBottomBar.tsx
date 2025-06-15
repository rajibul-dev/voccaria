"use client";
import { appSidebarNavLinks } from "@/_constants/appSidebarNavLinks";
import clsx from "clsx";
import Link from "next/link";
import Popover, { usePopoverManager } from "./Popover";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { usePathname } from "next/navigation";

const bottomNavOrder = [
  "/app/dashboard",
  "/app/free-lessons",
  "/app/scheduler",
];

const bottomMainNavLinks = appSidebarNavLinks
  .filter((item) => bottomNavOrder.includes(item.href))
  .sort(
    (a, b) => bottomNavOrder.indexOf(a.href) - bottomNavOrder.indexOf(b.href),
  );

const bottomMoreNavLinks = appSidebarNavLinks.filter(
  (item) => !bottomNavOrder.includes(item.href),
);

const sharedLinkStyles = `flex min-w-0 flex-1 flex-col items-center gap-3 px-1 py-3 group text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700`;
const sharedIconStyles =
  "text-3xl group-hover:text-pink-600 group-hover:dark:text-pink-400";
const sharedLabelStyles =
  "w-full truncate text-center text-xs font-medium text-nowrap group-hover:text-gray-900 group-hover:dark:text-gray-50";

export default function AppBottomBar() {
  const { close } = usePopoverManager();
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        `flex w-full justify-center border-t border-inherit bg-white [grid-area:bottom-bar] sm:hidden dark:bg-gray-800`,
      )}
    >
      {bottomMainNavLinks.map(({ href, Icon, label }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            className={clsx(sharedLinkStyles, {
              "bg-gray-100 dark:bg-gray-700": isActive,
            })}
            key={href}
            href={href}
          >
            <Icon
              className={clsx(sharedIconStyles, {
                "text-pink-600 dark:text-pink-400": isActive,
              })}
            />
            <span
              className={clsx(sharedLabelStyles, {
                "text-gray-900 dark:text-gray-50": isActive,
              })}
            >
              {label}
            </span>
          </Link>
        );
      })}
      <Popover
        fixed
        noBox
        triggerType="click"
        placementX="end"
        placementY="top"
      >
        <Popover.Trigger
          className="flex flex-1 justify-center"
          id="bottom-bar-more-tabs"
        >
          <button className={clsx(sharedLinkStyles)}>
            <IoEllipsisHorizontal className={clsx(sharedIconStyles)} />
            <span className={clsx(sharedLabelStyles)}>More Tabs</span>
          </button>
        </Popover.Trigger>
        <Popover.Content id="bottom-bar-more-tabs">
          <div className="grid grid-cols-3 gap-2.5 rounded-sm border border-gray-300 bg-gray-100 p-5 dark:border-gray-600 dark:bg-gray-800">
            {bottomMoreNavLinks.map(({ href, label, Icon }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  className={clsx(sharedLinkStyles, {
                    "bg-gray-100 dark:bg-gray-700": isActive,
                  })}
                  onClick={() => close()}
                  key={href}
                  href={href}
                >
                  <Icon
                    className={clsx(sharedIconStyles, {
                      "text-pink-600 dark:text-pink-400": isActive,
                    })}
                  />
                  <span
                    className={clsx(sharedLabelStyles, {
                      "text-gray-900 dark:text-gray-50": isActive,
                    })}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </Popover.Content>
      </Popover>
    </nav>
  );
}
