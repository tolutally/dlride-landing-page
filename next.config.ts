import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/applications",
        destination: "https://dlride-ops-production.up.railway.app/applications",
      },
    ];
  },
};

export default nextConfig;
