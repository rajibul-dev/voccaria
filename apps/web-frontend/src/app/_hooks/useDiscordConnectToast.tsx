"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useDiscordConnectToast() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const discordConnect = urlParams.get("discordConnect");

    if (discordConnect === "success") {
      toast.success(`Connected Discord account successfully!`, {
        id: "discord-connect-toast",
      });

      // Clean up the query param
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);
}
