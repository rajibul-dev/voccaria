"use client";

import DarkModeToggler from "../_components/DarkModeToggler";
import Logo from "../_components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-10 pb-14 max-[640px]:pt-15 dark:bg-gray-800">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <DarkModeToggler />
      </div>
      <main className="flex w-full !max-w-92 flex-col items-center justify-center">
        <Logo className="mb-7 w-60 max-sm:w-60" />
        {children}
      </main>
    </div>
  );
}
