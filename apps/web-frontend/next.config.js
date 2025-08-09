/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic optimizations only
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
    }

    return config;
  },

  // Images
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
