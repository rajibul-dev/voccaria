"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

export default function BackButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`group mt-10 -mb-8 flex cursor-pointer items-center gap-1 text-sm text-slate-500 transition-colors max-sm:mt-7 max-sm:-mb-4 dark:text-slate-400 ${className}`}
    >
      <MdArrowBack
        size={15}
        className="group-hover:fill-slate-600 dark:group-hover:fill-slate-300"
      />
      <span className="group-hover:text-slate-600 dark:group-hover:text-slate-300">
        {children}
      </span>
    </button>
  );
}
