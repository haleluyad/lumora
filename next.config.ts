import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "i.imgur.com",
    },
    {
      protocol: "https",
      hostname: "placeimg.com",
    },
    {
  protocol: "https",
  hostname: "i.pinimg.com",
},
{
  protocol: "https",
  hostname: "placehold.co",
},
{
  protocol: "https",
  hostname: "pravatar.cc",
},
  ],
},

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
