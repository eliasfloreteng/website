/** @type {(config: import('next').NextConfig) => any} */
// @ts-ignore
const withPWA = require("next-pwa")
// @ts-ignore
const runtimeCaching = require("next-pwa/cache")

module.exports = withPWA({
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
    disable: process.env.NODE_ENV === "development",
  },
})
