// @ts-ignore
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
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
      backgroundImage: {
        stripes: `repeating-linear-gradient(-45deg, ${colors.blue[300]}, ${colors.blue[300]} 1rem, ${colors.blue[400]} 1rem, ${colors.blue[400]} 2rem)`,
      },
      keyframes: {
        "bounce-reverse": {
          "0%, 100%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            // "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
        },
        scrolling: {
          "0%": {
            "background-position": "100% 100%",
          },
        },
      },
      animation: {
        "bounce-once": "bounce-reverse 500ms ease-in-out 1",
        scrolling: "scrolling 10s linear infinite",
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
