"use client";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { Button, Avatar } from "@mui/material";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { User } from "@/_types/user";
import { useDiscordDisconnect } from "@/app/_hooks/useAuth";

export default function DiscordConnectedCardEdit({
  discord,
}: {
  discord: User["discord"];
}) {
  // Initialize the mutation hook
  const { disconnectDiscord, isDisconnecting } = useDiscordDisconnect();

  function handleChangeDiscord() {
    console.log("Discord connect initiated");
    const discordConnectUrl = `${expressBackendBaseRESTOrigin}/users/discord-connect`;
    console.log("discordConnectUrl:", discordConnectUrl);
    window.location.href = discordConnectUrl;
  }

  async function handleDisconnect() {
    // Trigger the disconnect mutation.
    // The useDiscordDisconnect hook handles:
    // - Setting loading state (isDisconnecting)
    // - Showing success/error toasts
    // - Invalidating the user query (which will update the UI elsewhere)
    disconnectDiscord();
  }

  return (
    <div className="mt-10 w-fit rounded-xl border border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-start gap-6">
        <div className="flex items-center gap-3">
          <Avatar
            src={discord?.avatar || undefined}
            alt={discord?.display_name || "Discord User"}
            sx={{ width: 96, height: 96 }}
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {discord?.display_name}
            </h3>
            {discord?.username && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                @{discord.username}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="contained"
            size="medium"
            startIcon={<FaDiscord />}
            className="!bg-[#4e59d2] !shadow-none hover:!bg-[#5865f2]"
            onClick={handleChangeDiscord}
            disabled={isDisconnecting}
          >
            Change Discord
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={handleDisconnect}
            loading={isDisconnecting}
            loadingIndicator={"Disconnecting..."}
          >
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
