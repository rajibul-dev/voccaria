"use client";
import React, { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { Button, Avatar } from "@mui/material";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import toast from "react-hot-toast";
import { User } from "@/_types/user";
import { useUser } from "../_hooks/useUser";

export default function DiscordConnectedCardEdit({
  discord,
}: {
  discord: User["discord"];
}) {
  const [disconnecting, setDisconnecting] = useState(false);
  const { data: user } = useUser();

  function handleChangeDiscord() {
    console.log("Discord connect initiated");
    const discordConnecthUrl = `${expressBackendBaseRESTOrigin}/users/discord-connect`;
    console.log("discordConnecthUrl:", discordConnecthUrl);
    window.location.href = discordConnecthUrl;
  }

  async function handleDisconnect() {
    setDisconnecting(true);

    try {
      const res = await fetch(
        `${expressBackendBaseRESTOrigin}/users/discord-disconnect`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const jsonResponse = await res.json();

      if (!res.ok || !jsonResponse.success) {
        toast.error(
          jsonResponse.message || "Could not disconnect Discord profile",
        );
      } else {
        toast.success(
          jsonResponse.message || "Successfully disconnected Discord profile",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while disconnecting Discord profile");
    } finally {
      setDisconnecting(false);
    }
  }

  return (
    <div className="mt-10 w-fit rounded-xl border border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-start gap-6">
        <div className="flex items-center gap-3">
          <Avatar
            src={discord?.avatar}
            alt={discord?.display_name}
            sx={{ width: 96, height: 96 }}
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {discord?.display_name}
            </h3>
            {discord?.username && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                @{discord?.username}
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
            disabled={disconnecting}
          >
            Change Discord
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={handleDisconnect}
            loading={disconnecting}
            loadingIndicator={"Disconnecting..."}
          >
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
