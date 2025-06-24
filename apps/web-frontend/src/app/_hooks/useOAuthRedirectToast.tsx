"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function useOAuthRedirectToast() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleLogin = urlParams.get("googleLogin");

    if (googleLogin === "success") {
      toast.success("Google login successful!", {
        id: "google-login-toast", // prevent duplicate toasts
      });

      // Clean up the query param
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);
}
