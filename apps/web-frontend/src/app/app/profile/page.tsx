"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { Avatar } from "@mui/material";
import { formatDate } from "date-fns";

export default function page() {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex items-center gap-8">
        <Avatar src={user?.avatar} sx={{ width: 170, height: 170 }} />
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            {user?.name}
          </h1>
          <p className="text-lg font-extrabold text-slate-500 uppercase dark:text-slate-400">
            Member since {formatDate(user?.createdAt || "", "MMMM dd, yyyy")}
          </p>
        </div>
      </div>

      {/* bio and edit profile button */}
    </div>
  );
}
