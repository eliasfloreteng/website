/** @type {(config: import('next').NextConfig) => any} */
// @ts-ignore
const withPWA = require("next-pwa")
// @ts-ignore
const runtimeCaching = require("next-pwa/cache")

/** @type {import('next').NextConfig} */
let config = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  images: {
    domains: ["calendar.google.com", "www.kth.se"],
  },
  // TODO: Enable this when stable https://nextjs.org/docs/advanced-features/output-file-tracing
  // experimental: {
  //   outputStandalone: true,
  // },

  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.EXPORTING || process.env.NODE_ENV === "development",
  },
}

// When using `next export` use custom image loader
if (process.env.EXPORTING) {
  if (!config.images) config.images = {}
  config.images.loader = "custom"
  if (!config.env) config.env = {}
  config.env.EXPORTING = process.env.EXPORTING
}

module.exports = withPWA(config)
