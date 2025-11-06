"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

export default function BackButton({
  children,
  className,
  path,
}: {
  children: ReactNode;
  className?: string;
  path?: string;
}) {
  const router = useRouter();
  const handler = !path ? () => router.back() : () => router.push(path);

  return (
    <button
      onClick={handler}
      className={`group flex cursor-pointer items-center gap-1 text-sm text-gray-400 transition-colors dark:text-gray-400 ${className}`}
    >
      <MdArrowBack
        size={15}
        className="group-hover:fill-gray-600 dark:group-hover:fill-gray-300"
      />
      <span className="group-hover:text-gray-600 dark:group-hover:text-gray-300">
        {children}
      </span>
    </button>
  );
}
