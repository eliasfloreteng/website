// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  images: {
    unoptimized: Boolean(process.env.EXPORTING),
    remotePatterns: [
      { hostname: "calendar.google.com", protocol: "https" },
      { hostname: "www.kth.se", protocol: "https" },
      { hostname: "www.notion.so", protocol: "https" },
      { hostname: "notion.so", protocol: "https" },
      { hostname: "**.s3.us-west-2.amazonaws.com", protocol: "https" },
      { hostname: "i.imgur.com", protocol: "https" },
      { hostname: "products.ls.graphics", protocol: "https" },
    ],
  },
}

export default nextConfig
