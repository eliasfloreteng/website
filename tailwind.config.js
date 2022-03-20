// @ts-ignore
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
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
