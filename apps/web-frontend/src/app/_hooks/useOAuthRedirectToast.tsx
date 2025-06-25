"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../_context/AuthContext";

export default function useOAuthRedirectToast() {
  const { user } = useAuth();

  useEffect(() => {
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
  }, []);
}
