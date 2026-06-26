import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow Three.js / WebGL packages
  transpilePackages: ["three"],
  // Turbopack config (Next.js 16 default bundler)
  turbopack: {},
  // Optimise images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
