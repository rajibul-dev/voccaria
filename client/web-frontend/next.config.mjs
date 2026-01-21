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
  },

  images: {
    // Disable image optimization since we've compressed before putting it in here
    unoptimized: true,
  },

  env: {
    NEXT_CACHE_DISABLED: "true",
  },

  output: "standalone",
};

export default nextConfig;
