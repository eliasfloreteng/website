import { type NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  async redirects() {
    return [
      {
        source: "/projects",
        destination:
          "https://eliasfloreteng.notion.site/View-projects-fd68966f87864c1e9eadea09c3d0e60c",
        permanent: true,
      },
      {
        source: "/experience",
        destination:
          "https://eliasfloreteng.notion.site/CV-Elias-Floreteng-155db39d4a314bc6800d094e23fb535d",
        permanent: true,
      },
    ]
  },
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
      { hostname: "images.squarespace-cdn.com", protocol: "https" },
    ],
  },
}

export default nextConfig
