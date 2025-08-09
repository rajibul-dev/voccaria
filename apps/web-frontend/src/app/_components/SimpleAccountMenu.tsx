// SimpleAccountMenu.tsx - A fallback menu without complex dependencies
"use client";

import { Avatar } from "@mui/material";
import Link from "next/link";
import { useUser, useLogout } from "@/app/_hooks/useAuth";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SimpleAccountMenu() {
  const { user, isLoading, error } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    setIsOpen(false);
    logout();
  }

  // Handle loading/error states for user data display
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-sm p-1">
        <Avatar sx={{ width: 42, height: 42 }} />
        <span className="block text-lg font-extrabold text-gray-500 max-sm:hidden dark:text-gray-300">
          Loading...
        </span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <Link
        href="/auth/login"
        className="text-my-pink-600 dark:text-my-pink-400 font-medium underline-offset-4 hover:underline"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 rounded-sm p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Avatar
          src={
            user.avatar ||
            `https://placehold.co/42x42/cccccc/333333?text=${user.name.charAt(0)}`
          }
          alt={user.name}
          sx={{ width: 42, height: 42 }}
        />
        <span className="block text-lg font-extrabold text-gray-500 ![word-spacing:-.4pt] max-sm:hidden dark:text-gray-300">
          {user.name}
        </span>
        <IoMdArrowDropdown
          size={36}
          className="mb-[-3px] ml-[-10px] text-gray-500 dark:text-gray-300"
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full right-0 z-20 mt-1 w-70 max-w-auto divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow-lg dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800">
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar
                src={
                  user.avatar ||
                  `https://placehold.co/42x42/cccccc/333333?text=${user.name.charAt(0)}`
                }
                alt={user.name}
                sx={{ width: 42, height: 42 }}
              />
              <div>
                <p className="text-base font-semibold dark:text-gray-100">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {user.email}
                </p>
              </div>
            </div>
            <div>
              <Link
                href="/app/profile"
                onClick={() => setIsOpen(false)}
                className="text-dark flex w-full items-center justify-between px-4 py-2.5 text-base font-medium hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
              >
                View profile
              </Link>
              <Link
                href="/app/settings"
                onClick={() => setIsOpen(false)}
                className="text-dark flex w-full items-center justify-between px-4 py-2.5 text-base font-medium hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
              >
                Settings
              </Link>
            </div>
            <div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-dark flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-base font-medium text-red-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70 dark:text-red-300 dark:hover:bg-white/5"
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
