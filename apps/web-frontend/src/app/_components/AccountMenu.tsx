"use client";

import { Avatar } from "@mui/material";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../_context/AuthContext";
import Popover from "./Popover";
import { useRouter } from "next/navigation";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";

export default function AccountMenu() {
  const { user, setUser } = useAuth();
  const route = useRouter();

  async function logout() {
    try {
      const res = await fetch(`${expressBackendBaseRESTOrigin}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        route.replace("/auth/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error", err);
    }
  }

  return (
    <div className="">
      <Popover placementX="end" placementY="bottom" noBox triggerType="click">
        <Popover.Trigger id="account-menu">
          <div className="flex cursor-pointer items-center gap-2 rounded-sm p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
            <Avatar
              className="border-2 border-gray-300 dark:border-gray-700"
              src={user?.avatar}
              alt={user?.name}
              sx={{ width: 42, height: 42 }}
            />
            <span className="block text-lg font-extrabold text-gray-500 ![word-spacing:-.4pt] max-sm:hidden dark:text-gray-300">
              {user?.name}
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
                  src={user?.avatar}
                  alt={user?.name}
                  sx={{ width: 42, height: 42 }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold dark:text-gray-100">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {user?.email}
                </p>
              </div>
            </div>
            <div>
              <Link
                href="/app/profile"
                className="text-dark flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
              >
                View profile
              </Link>
              <Link
                href="/app/settings"
                className="text-dark flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
              >
                Settings
              </Link>
            </div>
            <div>
              <button
                onClick={logout}
                className="text-dark flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-gray-50 dark:text-red-300 dark:hover:bg-white/5"
              >
                Log out
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}
