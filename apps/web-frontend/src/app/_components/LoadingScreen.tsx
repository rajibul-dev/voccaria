"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingScreenProps {
  message?: string;
  size?: number;
}

export default function LoadingScreen({
  message = "Loading...",
  size = 40,
}: LoadingScreenProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 2,
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: "#ec4899", // Your pink brand color
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontSize: "1rem",
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
