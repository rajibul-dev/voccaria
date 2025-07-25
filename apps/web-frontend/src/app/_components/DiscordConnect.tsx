"use client";

import { FaDiscord } from "react-icons/fa";
import { Button } from "@mui/material";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";

export default function DiscordConnect() {
  function handleConnectDiscord() {
    console.log("Discord connect initiated");
    const discordConnecthUrl = `${expressBackendBaseRESTOrigin}/users/discord-connect`;
    console.log("discordConnecthUrl:", discordConnecthUrl);
    window.location.href = discordConnecthUrl;
  }

  return (
    <div className="my-8">
      <div className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Connect your Discord account
      </div>
      <p className="mb-4 max-w-[60ch] text-sm leading-[1.5] text-gray-800 dark:text-gray-200">
        Connecting your Discord account makes it easier for us to verify your
        identity. Since Voccaria’s entire mission has been operating through
        Discord, this adds an extra layer of verification and helps prevent
        impersonation
      </p>

      <Button
        variant="contained"
        className="!bg-[#4e59d2] !shadow-none hover:!bg-[#5865f2]"
        size="large"
        startIcon={<FaDiscord />}
        onClick={handleConnectDiscord}
      >
        Connect Discord
      </Button>
    </div>
  );
}
