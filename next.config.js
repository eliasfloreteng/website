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
    domains: [
      "calendar.google.com",
      "www.kth.se",
      "www.notion.so",
      "notion.so",
      "s3.us-west-2.amazonaws.com",
      "s3-us-west-2.amazonaws.com",
    ],
  },
  // TODO: Enable this when stable https://nextjs.org/docs/advanced-features/output-file-tracing
  // experimental: {
  //   outputStandalone: true,
  // },
}

module.exports = withPWA(config)
