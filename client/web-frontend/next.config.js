/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal config for clean logs
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },

  // Webpack optimizations
  webpack(config, { dev }) {
    // SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Development optimizations (minimal)
    if (dev) {
      // Disable source maps completely to avoid warnings and improve performance
      config.devtool = false;
      config.performance = { hints: false };
      // Disable webpack filesystem caching
      config.cache = {
        type: "memory",
      };
    }

    return config;
  },

  // Images
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Disable compile-time cache logging
  env: {
    NEXT_CACHE_DISABLED: "true",
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
