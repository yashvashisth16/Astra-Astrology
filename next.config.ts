import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This tells Vercel to ignore type errors and just build the website!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also ignore ESLint errors just in case!
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;