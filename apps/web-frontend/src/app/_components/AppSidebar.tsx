"use client";
import { appSidebarNavLinks } from "@/_constants/appSidebarNavLinks";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

export default function AppSidebar() {
  const pathname = usePathname();
  const dividerIndex = -2;

  return (
    <div className="border-r border-inherit bg-white py-8 [grid-area:sidebar] max-sm:hidden dark:bg-gray-800">
      <nav className="flex flex-col">
        <ul className="flex flex-col gap-4">
          <div className="flex flex-col">
            {appSidebarNavLinks.slice(0, dividerIndex).map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return <ListItem key={link.href} {...link} isActive={isActive} />;
            })}
          </div>
          <div className="flex flex-col">
            {appSidebarNavLinks.slice(dividerIndex).map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return <ListItem key={link.href} {...link} isActive={isActive} />;
            })}
          </div>
        </ul>
      </nav>
    </div>
  );
}

type ListItemProps = {
  label: string;
  href: string;
  Icon: IconType;
  isActive: boolean;
};

function ListItem({ label, href, Icon, isActive }: ListItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "group flex items-center gap-3 px-6 py-3 font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
          { "bg-gray-100 dark:bg-gray-700": isActive },
        )}
      >
        <Icon
          className={clsx(
            "text-xl group-hover:text-pink-600 group-hover:dark:text-pink-400",
            {
              "text-pink-600 dark:text-pink-400": isActive,
            },
          )}
        />
        <span
          className={clsx(
            "text-base group-hover:text-gray-900 group-hover:dark:text-gray-50",
            {
              "text-gray-900 dark:text-gray-50": isActive,
            },
          )}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
