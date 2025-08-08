/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize compilation
  experimental: {
    // Enable SWC transforms for better performance
    swcTraceProfiling: false,
    // Optimize bundle analyzer for dev
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "framer-motion",
      "react-icons",
    ],
  },

  // Webpack optimizations
  webpack(config, { dev, isServer }) {
    // SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Development optimizations
    if (dev) {
      // Faster builds in development
      config.devtool = "eval-cheap-module-source-map";

      // Optimize resolver for faster module resolution
      config.resolve.symlinks = false;

      // Cache optimizations
      config.cache = {
        type: "filesystem",
        buildDependencies: {
          config: [__filename],
        },
      };

      // Reduce bundle size checks in dev (faster rebuilds)
      config.performance = {
        hints: false,
      };

      // Optimize chunk splitting for faster HMR
      if (!isServer) {
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
        };
      }
    }

    return config;
  },

  // Only enable source maps in production to avoid dev overhead
  productionBrowserSourceMaps: true,

  // Optimize images (but don't slow down dev)
  images: {
    // Disable image optimization in dev for faster builds
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Faster dev server
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000, // 1 minute
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
