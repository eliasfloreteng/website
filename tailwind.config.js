// @ts-ignore
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        //@ts-ignore
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        //@ts-ignore
        serif: ['"Merriweather"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [
    // @ts-ignore
    require("@tailwindcss/typography"),
    // @ts-ignore
    require("@tailwindcss/line-clamp"),
    // @ts-ignore
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
}
