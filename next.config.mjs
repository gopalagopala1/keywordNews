/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ 
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ],
    domains: ["img.republicworld.com"]
  },
};

export default nextConfig;
