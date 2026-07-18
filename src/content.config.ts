import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    emoji: z.string(),
    title: z.string(),
    author: z.string(),
    duration: z.string(),
    podcastUrl: z.string().url(),
    notebookUrl: z.string().url().optional(),
    order: z.number(),
  }),
})

export const collections = { books }
