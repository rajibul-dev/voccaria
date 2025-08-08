"use client";

import { useVerifyEmail } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import LoadingScreen from "@/app/_components/LoadingScreen";
import { Box, Typography } from "@mui/material";

export default function VerifyEmailPage() {
  const router = useRouter();
  const verifyEmailMutation = useVerifyEmail();
  const hasVerified = useRef(false); // Prevent multiple verification attempts

  useEffect(() => {
    // Prevent running multiple times
    if (hasVerified.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    if (!token || !email) {
      toast.error("Invalid verification link.");
      router.replace("/auth/login");
      return;
    }

    hasVerified.current = true;
    verifyEmailMutation.mutate({ verificationToken: token, email });
  }, [router]); // Remove verifyEmailMutation from dependencies

  if (verifyEmailMutation.isPending) {
    return <LoadingScreen message="Verifying your email..." />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        gap: 2,
      }}
    >
      {verifyEmailMutation.isSuccess ? (
        <>
          <div className="text-6xl text-green-500">✓</div>
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Email Verified!
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Your email has been successfully verified. You can now log in.
          </Typography>
        </>
      ) : verifyEmailMutation.isError ? (
        <>
          <div className="text-6xl text-red-500">✗</div>
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            Verification Failed
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Please try again or request a new verification link.
          </Typography>
        </>
      ) : null}
    </Box>
  );
}
