// AccountMenu.tsx
"use client";

import { Avatar } from "@mui/material";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { useUser, useLogout } from "@/app/_hooks/useAuth";
import { useEffect, useState } from "react";
import SimpleAccountMenu from "./SimpleAccountMenu";

// Dynamic import with fallback
let Popover: any = null;
let usePopoverManager: any = null;
let importError = false;

try {
  const PopoverModule = require("./Popover");
  Popover = PopoverModule.default;
  usePopoverManager = PopoverModule.usePopoverManager;
} catch (error) {
  console.warn("Popover import failed, using fallback:", error);
  importError = true;
}

export default function AccountMenu() {
  const { data: user, isLoading, isError } = useUser();
  const logoutMutation = useLogout();
  const [mounted, setMounted] = useState(false);
  const [usesFallback, setUsesFallback] = useState(importError);

  let popoverManager: { close: () => void } | null = null;

  // Try to get the popover manager with error handling
  if (!usesFallback && usePopoverManager) {
    try {
      popoverManager = usePopoverManager();
    } catch (error) {
      console.warn("Popover manager error, switching to fallback:", error);
      setUsesFallback(true);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use fallback component if there are any issues
  if (!mounted || usesFallback) {
    return <SimpleAccountMenu />;
  }

  function handleLogout() {
    if (popoverManager) {
      popoverManager.close();
    }
    logoutMutation.mutate();
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

  if (isError || !user) {
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
    <div className="">
      <Popover placementX="end" placementY="bottom" noBox triggerType="click">
        <Popover.Trigger id="account-menu">
          <div className="flex cursor-pointer items-center gap-2 rounded-sm p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
            {/* Note: Avatar src should ideally point to a direct image URL.
                If expressBackendBaseRESTOrigin is needed for proxying avatars,
                ensure your /users/me/avatar/proxy endpoint is set up to handle it.
                For simplicity, I'm assuming user.avatar is a direct URL or base64.
                If it's a relative path, you might need to adjust the src.
            */}
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
          </div>
        </Popover.Trigger>

        <Popover.Content id="account-menu" isTopOfHeader>
          <div
            className={`absolute top-full right-0 w-70 max-w-auto divide-y divide-gray-300 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="relative aspect-square w-10 rounded-full">
                <Avatar
                  src={
                    user.avatar ||
                    `https://placehold.co/42x42/cccccc/333333?text=${user.name.charAt(0)}`
                  }
                  alt={user.name}
                  sx={{ width: 42, height: 42 }}
                />
              </div>
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
                onClick={close}
                className="text-dark flex w-full items-center justify-between px-4 py-2.5 text-base font-medium hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
              >
                View profile
              </Link>
              <Link
                href="/app/settings"
                onClick={close}
                className="text-dark flex w-full items-center justify-between px-4 py-2.5 text-base font-medium hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
              >
                Settings
              </Link>
            </div>
            <div>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending} // Disable button while logging out
                className="text-dark flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-base font-medium text-red-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70 dark:text-red-300 dark:hover:bg-white/5"
              >
                {logoutMutation.isPending ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}
