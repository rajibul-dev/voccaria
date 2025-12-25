import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import createBundleAnalyzer from "@next/bundle-analyzer";

/* ---------- ESM-safe __dirname ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- Load env for host builds ---------- */
dotenv.config({
  path: path.resolve(__dirname, "../../.env.local"),
  override: false, // never override Docker / prod envs
});

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },

  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (dev) {
      config.devtool = false;
      config.performance = { hints: false };
      config.cache = { type: "memory" };
    }

    if (!isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // hard-drop visual editing from client bundles
        "next-sanity/visual-editing": false,
      };
    }

    return config;
  },

  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },

  env: {
    NEXT_CACHE_DISABLED: "true",
  },

  output: "standalone",
};

export default withBundleAnalyzer(nextConfig);
