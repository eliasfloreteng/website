/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
        soft: ["var(--font-quicksand)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-merriweather)", ...defaultTheme.fontFamily.serif],
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
        "cursor-loading": {
          "from, to": { cursor: "wait" },
        },
        "wipe-vertical": {
          from: {
            "clip-path": "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          },
          to: {
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
        },
        fade: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "bounce-once": "bounce-reverse 500ms ease-in-out 1",
        scrolling: "scrolling 10s linear infinite",
        wipe: "wipe-vertical 1s ease-in-out 1",
        "fade-in": "fade 1s ease-in-out 1 forwards",
      },
      dropShadow: {
        glow: [
          "0 0 20px rgba(255,255, 255, 0.35)",
          "0 0 65px rgba(255, 255,255, 0.2)",
        ],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
} satisfies Config
