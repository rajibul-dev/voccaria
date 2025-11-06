"use client";

import useOAuthRedirectToast from "../_hooks/useOAuthRedirectToast";

export default function GoogleLoginToastTrigger() {
  useOAuthRedirectToast();
  return null;
}
