/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},

  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },

  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },

  env: {
    NEXT_CACHE_DISABLED: "true",
  },

  output: "standalone",
};

export default nextConfig;
