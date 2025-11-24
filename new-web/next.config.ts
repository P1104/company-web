import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r.mobirisesite.com",
      },
      {
        protocol: "https",
        hostname: "r.risesite.com",
      },
    ],
  },
};

export default nextConfig;
