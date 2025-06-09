"use client";

import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import OAuthButton from "./OAuthButton";
import { FaGoogle } from "react-icons/fa6";

export default function GoogleOAuthButton() {
  function handleLogin() {
    console.log("Google OAuth login initiated");
    const googleOAuthUrl = `${expressBackendBaseRESTOrigin}/auth/google`;
    console.log("googleOAuthUrl:", googleOAuthUrl);
    window.location.href = googleOAuthUrl;
  }

  return (
    <OAuthButton
      onClick={handleLogin}
      icon={
        <FaGoogle
          size={24}
          className="text-my-pink-500 dark:text-my-pink-400"
        />
      }
      className="gap-3 text-lg"
      label="Continue with Google"
    />
  );
}
