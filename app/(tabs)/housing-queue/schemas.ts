import { z } from "zod"

const nullishCast = (s: string) => s || null
const nullishString = z
  .string()
  .trim()
  .transform(nullishCast)
  .nullable()
  .default(null)
const numOrString = z
  .number()
  .transform((n) => n || null)
  .or(nullishString)

export const commonSearchSchema = z
  .object({
    query: z.string(),
    maxRent: z.number().positive(),
    minSize: z.number().positive(),
    minRooms: z.number().positive(),
    maxRooms: z.number().positive(),
    isStudent: z.boolean(),
    noCorridors: z.boolean(),
  })
  .partial()

export const sssbSearchSchema = commonSearchSchema.extend({
  maxQueueDays: z.number().positive().optional(),
})
export type SSSBOptions = z.infer<typeof sssbSearchSchema>

export const swedishHousingAgencySearchSchema = commonSearchSchema.extend({})
export type SwedishHousingAgencyOptions = z.infer<
  typeof swedishHousingAgencySearchSchema
>

export const searchSchema = sssbSearchSchema
  .merge(swedishHousingAgencySearchSchema)
  .extend({
    housingAgency: z
      .union([z.literal("swedishHousingAgency"), z.literal("sssb")])
      .nullable(),
    sortBy: z
      .union([z.literal("distance"), z.literal("travelTime")])
      .nullable(),
    destinations: z.array(z.string()),
    maxDistance: z.number().positive().nullable(),
    maxTravelTime: z.number().positive().nullable(),
  })

export type SearchOptions = z.infer<typeof searchSchema>

export const commonHousingSchema = z.object({
  id: z.string(),
  address: z.string(),
  size: numOrString
    .pipe(z.coerce.number().nonnegative())
    .nullable()
    .default(null),
  rent: numOrString
    .pipe(z.coerce.number().nonnegative())
    .nullable()
    .default(null),
  rooms: numOrString
    .pipe(z.coerce.number().nonnegative())
    .nullable()
    .default(null),
  link: z.string().url().nullable().default(null),
})

export const sssbHousingSchema = commonHousingSchema.extend({
  housingAgency: z.literal("sssb"),
  image: z.string().trim().min(1).url().nullable().default(null),
  title: nullishString,
  freetext: nullishString,
  properties: z.array(
    z.object({
      key: nullishString,
      label: nullishString,
      value: nullishString,
    })
  ),
  housingComplex: nullishString,
  housingComplexLink: z.string().trim().min(1).url().nullable().default(null),
  floor: z.string().nullable().default(null),
  contractStart: z.coerce.date().nullable().default(null),
  queueTime: nullishString.pipe(
    z.coerce.number().nonnegative().nullable().default(null)
  ),
  queueSize: nullishString.pipe(
    z.coerce.number().nonnegative().nullable().default(null)
  ),
})
export type SSSBHousing = z.infer<typeof sssbHousingSchema>

export const swedishHousingAgencyHousingSchema = commonHousingSchema.extend({
  housingAgency: z.literal("swedishHousingAgency"),
  floor: z.coerce.number().nullable().default(null),
  district: z.string(),
  rawHousing: z.unknown(),
})
export type SwedishHousingAgencyHousing = z.infer<
  typeof swedishHousingAgencyHousingSchema
>

export const housingSchema = z.discriminatedUnion("housingAgency", [
  sssbHousingSchema,
  swedishHousingAgencyHousingSchema,
])
export type Housing = z.infer<typeof housingSchema>
