/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.buttercms.com",
      },
      {
        protocol: "https",
        hostname: "d2wzhk7xhrnk1x.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
