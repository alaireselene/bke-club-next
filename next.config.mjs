/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hust.edu.vn",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "test.sena.id.vn",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
