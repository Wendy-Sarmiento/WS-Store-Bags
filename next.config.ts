import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  allowedDevOrigins: ["http://192.168.101.7:3000"],
};

export default nextConfig;
