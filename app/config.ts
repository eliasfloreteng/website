import { z } from "zod"

export const configSchema = z.object({
  email: z.object({
    host: z.string().trim(),
    port: z.coerce.number(),
    secure: z.boolean(),
    auth: z.object({
      user: z.string(),
      pass: z.string(),
    }),
    to: z.string(),
    from: z.string(),
  }),
})

export type Config = z.infer<typeof configSchema>

const config = configSchema.parse({
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
  },
})
export default config
