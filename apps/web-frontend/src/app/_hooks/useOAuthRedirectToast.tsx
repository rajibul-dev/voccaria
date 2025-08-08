"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/app/_hooks/useAuth";

export default function useOAuthRedirectToast() {
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    // Don't run the effect if user data is still loading
    if (isLoading) return;

    const urlParams = new URLSearchParams(window.location.search);
    const googleLogin = urlParams.get("googleLogin");

    if (googleLogin === "success") {
      toast.success(`Login successful! Welcome ${user?.name || "User"}!`, {
        id: "google-login-toast", // prevent duplicate toasts
      });

      // Clean up the query param
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [user?.name, isLoading]); // Include dependencies to wait for user data
}
