import clsx from "clsx";
import Link from "next/link";
import { usePopoverManager } from "./Popover";

export default function RestMenu({
  href,
  label,
  icon,
  isActive = false,
  isRoot = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isRoot?: boolean;
}) {
  const { close } = usePopoverManager();

  return (
    <li className="list-none" key={href}>
      <Link
        href={href}
        onClick={() => close()}
        className={clsx("flex flex-col items-center justify-center", {
          "": isRoot,
          "gap-0.5": !isRoot,
        })}
        aria-label={label}
      >
        <span
          className={clsx("text-[2.6rem] text-slate-600", {
            "text-[5.2rem]": isRoot,
            "!text-old-btn-pink": isActive,
            "dark:text-slate-200": !isRoot,
            "dark:!text-my-pink-300": !isRoot && isActive,
          })}
        >
          {icon}
        </span>
        <span
          className={clsx("text-sm font-medium text-slate-800", {
            "text-[1.6rem]": isRoot,
            "!text-old-btn-pink": isActive,
            "dark:text-slate-200": !isRoot,
            "dark:!text-my-pink-300": !isRoot && isActive,
          })}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
