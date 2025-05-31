"use client";

import OAuthButton from "./OAuthButton";
import { FaGoogle } from "react-icons/fa6";

export default function GoogleOAuthButton() {
  return (
    <OAuthButton
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
