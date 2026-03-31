/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
    serverActions: {
      allowedOrigins: ["dev.voccaria.com", "voccaria.com"],
    },
  },
};

export default nextConfig;
