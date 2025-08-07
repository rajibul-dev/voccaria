"use client";
import React, { useState } from "react";
import { Avatar, Button, Chip } from "@mui/material";
import { formatDate } from "date-fns";
import EditProfileForm from "./EditProfileForm";
import DiscordConnect from "./DiscordConnect";
import { MdEdit } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import DiscordConnectedCardEdit from "./DiscordConnectedCardEdit";
import { useUser } from "@/app/_hooks/useAuth";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-60 flex-col items-center justify-center text-gray-600 dark:text-gray-400">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-60 flex-col items-center justify-center text-red-600 dark:text-red-400">
        <p>Error loading profile. Please try again.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-60 flex-col items-center justify-center text-gray-600 dark:text-gray-400">
        <p>User not found or not logged in.</p>
        <Button onClick={() => (window.location.href = "/auth/login")}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <>
      {!isEditing && (
        <div className="flex items-center gap-8 max-[820px]:flex-col max-[820px]:items-start max-[560px]:!flex-col max-[560px]:!items-start max-sm:flex-row max-sm:items-center">
          {/* Avatar display */}
          <Avatar
            src={user.avatar || undefined} // Pass undefined if null for default MUI behavior
            alt={user.name || "User"}
            sx={{ width: 170, height: 170 }}
          />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
              {user.name}
            </h1>
            {user.createdAt ? (
              <p className="text-lg font-extrabold text-slate-500 uppercase dark:text-slate-400">
                Member since {formatDate(user.createdAt, "MMMM dd, yyyy")}
              </p>
            ) : null}
            {/* Discord connected chip */}
            {user.discord?.id && (
              <a
                href={`https://discord.com/users/${user.discord.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Chip
                  className="mt-1 w-fit !cursor-pointer !bg-gray-200 !pl-1 font-semibold !text-gray-800 dark:!bg-gray-700 dark:!text-gray-200"
                  label={
                    user.discord.display_name ||
                    user.discord.username ||
                    "Discord"
                  } // Prioritize display_name
                  icon={
                    <FaDiscord className="fill-[#4e59d2] text-xl dark:fill-[#9299e4]" />
                  }
                  size="medium"
                />
              </a>
            )}
          </div>
        </div>
      )}

      {!isEditing && user.bio && (
        <p className="max-w-[65ch] text-base text-gray-800 dark:text-gray-200">
          {user.bio}
        </p>
      )}

      {!isEditing && (
        <Button
          variant="contained"
          onClick={() => setIsEditing(true)}
          className="!shadow-none"
          size="large"
          startIcon={<MdEdit />}
        >
          Edit profile
        </Button>
      )}

      {isEditing && (
        <>
          <EditProfileForm user={user} setIsEditing={setIsEditing} />
          {!user.discord?.id ? (
            <DiscordConnect />
          ) : (
            <DiscordConnectedCardEdit discord={user.discord} />
          )}
        </>
      )}
    </>
  );
}
