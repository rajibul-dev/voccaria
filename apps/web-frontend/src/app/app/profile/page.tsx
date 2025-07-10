"use client";
import Button from "@/app/_components/Button";
import EditProfileForm from "@/app/_components/EditProfileForm";
import { useAuth } from "@/app/_context/AuthContext";
import { Avatar } from "@mui/material";
import { formatDate } from "date-fns";
import { useState } from "react";

export default function page() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useAuth();

  return (
    <div className="flex w-full flex-col items-start gap-6">
      {!isEditing && (
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
      )}

      {!isEditing && user?.bio && (
        <p className="text-base text-gray-800 dark:text-gray-200">{user.bio}</p>
      )}

      {!isEditing && (
        <Button onClick={() => setIsEditing(true)} className="px-10">
          Edit profile
        </Button>
      )}

      {isEditing && (
        <EditProfileForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      )}
    </div>
  );
}
