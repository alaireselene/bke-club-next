/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true, // Add this line to disable image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hust.edu.vn",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "bke-cms.sena.id.vn",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
