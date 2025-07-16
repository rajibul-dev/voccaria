"use client";

import { useState } from "react";
import { useAuth } from "../_context/AuthContext";
import { Avatar } from "@mui/material";
import { formatDate } from "date-fns";
import Button from "./Button";
import EditProfileForm from "./EditProfileForm";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useAuth();

  return (
    <>
      {!isEditing && (
        <div className="flex items-center gap-8">
          <Avatar src={user?.avatar} sx={{ width: 170, height: 170 }} />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
              {user?.name}
            </h1>
            {user?.createdAt ? (
              <p className="text-lg font-extrabold text-slate-500 uppercase dark:text-slate-400">
                Member since {formatDate(user?.createdAt, "MMMM dd, yyyy")}
              </p>
            ) : null}
          </div>
        </div>
      )}

      {!isEditing && user?.bio && (
        <p className="max-w-[65ch] text-base text-gray-800 dark:text-gray-200">
          {user.bio}
        </p>
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
    </>
  );
}
