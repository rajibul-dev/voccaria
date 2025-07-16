"use client";

import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

type Variant = "solid" | "outline" | "subtle" | "dangerOutline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "solid",
  size = "md",
  href,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex cursor-pointer items-center justify-center font-medium rounded-xl transition-colors duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = useMemo(() => {
    return {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-5 py-2.5",
    }[size];
  }, [size]);

  const variantStyles = useMemo(() => {
    return {
      solid:
        "bg-my-pink-500 hover:bg-my-pink-600 text-white dark:bg-my-pink-600 dark:hover:bg-my-pink-700",
      outline:
        "border border-my-pink-500 text-my-pink-600 hover:bg-my-pink-100 dark:border-my-pink-400 dark:text-my-pink-400 dark:hover:bg-my-pink-900",
      dangerOutline:
        "border border-red-500 text-red-500 hover:bg-red-100 dark:border-red-400 dark:text-red-400 hover:dark:bg-red-950",
      subtle:
        "text-my-pink-600 hover:bg-my-pink-100 dark:text-my-pink-300 dark:hover:bg-my-pink-800",
    }[variant];
  }, [variant]);

  const classes = clsx(baseStyles, sizeStyles, variantStyles, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
