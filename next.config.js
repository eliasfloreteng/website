// @ts-ignore
const runtimeCaching = require("next-pwa/cache")
/** @type {(config: import('next').NextConfig) => any} */
// @ts-ignore
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  disable: process.env.EXPORTING || process.env.NODE_ENV === "development",
})

/** @type {import('next').NextConfig} */
let config = {
  swcMinify: true,
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

module.exports = withPWA(config)
