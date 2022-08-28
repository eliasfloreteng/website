// @ts-ignore
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
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
      },
      animation: {
        "bounce-once": "bounce-reverse 500ms ease-in-out 1",
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
