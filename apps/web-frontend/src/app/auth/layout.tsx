"use client";

import Logo from "../_components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center">
        <Logo className="mb-7 w-80" />
        {children}
      </main>
    </div>
  );
}
