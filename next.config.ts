import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // When accessed via se.verceljobs.com, rewrite to /se
        {
          source: "/",
          has: [{ type: "host", value: "se.verceljobs.com" }],
          destination: "/se",
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "se.verceljobs.com" }],
          destination: "/se/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
