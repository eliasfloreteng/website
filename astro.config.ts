import { defineConfig, fontProviders } from "astro/config"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  site: "https://elias.eliasf.se",
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      weights: [400, 500, 600, 700],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Quicksand",
      cssVariable: "--font-quicksand",
      weights: [500, 700],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],
  // Wildcard /projects/* redirects live in vercel.json; these cover local preview
  redirects: {
    "/projects":
      "https://eliasfloreteng.notion.site/View-projects-fd68966f87864c1e9eadea09c3d0e60c",
    "/experience":
      "https://eliasfloreteng.notion.site/CV-Elias-Floreteng-155db39d4a314bc6800d094e23fb535d",
  },
})
