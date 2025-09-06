import type { NextConfig } from "next";

// Optional environment-driven base path for deployments to a subfolder.
// Set NEXT_BASE_PATH to e.g. "site" or "/site" when you need the site to be served from
// https://example.com/site/. When not set, the app behaves as usual and exports paths
// that are rooted at the domain root.
const rawBase = process.env.NEXT_BASE_PATH || "";
const normalizedBase = rawBase ? (rawBase.startsWith("/") ? rawBase : `/${rawBase}`) : undefined;

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['lh3.googleusercontent.com', 'waikiki-chicken-paradise.vercel.app'],
    unoptimized: true,
  },
  trailingSlash: true,
  // Only set basePath/assetPrefix when NEXT_BASE_PATH is provided to avoid changing
  // local development URLs unexpectedly.
  ...(normalizedBase ? { basePath: normalizedBase, assetPrefix: normalizedBase } : {}),
};

export default nextConfig;
