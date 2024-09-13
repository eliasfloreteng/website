"use server"

import { safeParseJSONResponse } from "app/helpers"
import {
  swedishHousingAgencyHousingSchema,
  type SwedishHousingAgencyHousing,
  type SwedishHousingAgencyOptions,
} from "./schemas"
import { type z } from "zod"
import { HOUSING_QUEUE_BASE_URL } from "./constants"

export async function fetchFilteredHousing({
  query,
  maxRent,
  maxRooms,
  noCorridors,
  isStudent,
}: SwedishHousingAgencyOptions): Promise<SwedishHousingAgencyHousing[]> {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  const housingQueueResponse = await fetch(
    `${HOUSING_QUEUE_BASE_URL}/AllaAnnonser`
  )
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1"
  if (!housingQueueResponse.ok) {
    throw new Error(
      "Failed to fetch housing data: " + (await housingQueueResponse.text())
    )
  }
  const housing =
    (await safeParseJSONResponse<RawHousing[]>(housingQueueResponse)) ?? []

  const filteredHousing = housing.filter(
    (house) =>
      (!isStudent || house.Student) &&
      (!noCorridors ||
        !(house.Student && house.Lagenhetstyp === "Studentkorridor")) &&
      (!maxRent || (house.Hyra && house.Hyra <= maxRent)) &&
      (!maxRooms || house.AntalRum <= maxRooms) &&
      (!query ||
        Object.values(house).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        ))
  )
  return filteredHousing.flatMap((house) => {
    const parsed = swedishHousingAgencyHousingSchema.safeParse({
      housingAgency: "swedishHousingAgency",
      id: `swedishHousingAgency-${house.LägenhetId}`,
      address: house.Gatuadress,
      size: house.Yta,
      rent: house.Hyra,
      link: `${HOUSING_QUEUE_BASE_URL}${house.Url}`,
      district: house.Stadsdel,
      rooms: house.AntalRum,
      rawHousing: house,
      floor: house.Vaning,
    } satisfies z.input<typeof swedishHousingAgencyHousingSchema>)
    if (!parsed.success) {
      console.error(parsed.error)
    }
    return parsed.success ? [parsed.data] : []
  })
}

export interface RawHousing {
  LägenhetId: number
  AnnonsId: number
  Stadsdel: string
  Gatuadress: string
  Kommun: string
  Vaning?: number | null
  AntalRum: number
  Yta?: number | null
  Hyra?: number | null
  AnnonseradTill: string
  AnnonseradFran: string
  KoordinatLongitud: number
  KoordinatLatitud: number
  Url: string
  Antal: number
  Balkong: boolean
  Hiss: boolean
  Nyproduktion: boolean
  Ungdom: boolean
  Student: boolean
  Senior: boolean
  Korttid: boolean
  Vanlig: boolean
  Bostadssnabben: boolean
  BostadSnabbt: boolean
  KompisUngdom: boolean
  Ko: string
  KoNamn: string
  Lagenhetstyp: string
  HarAnmaltIntresse: boolean
  KanAnmalaIntresse: boolean
  HarBraChans: boolean
  HarInternko: boolean
  Internko: boolean
  Externko: boolean
  Omraden: {
    Id: number
    Platstyp: number
  }[]
  ArInloggad: boolean
  LiknadeLagenhetStatistik: {
    KotidFordelningQ1: number
    KotidFordelningQ3: number
  }
  LägstaHyran: number | null
  HögstaHyran: number | null
  LägstaYtan: number | null
  HögstaYtan: number | null
  LägstaAntalRum: number | null
  HögstaAntalRum: number | null
  TillgangligNedsattOrienteringsformaga: boolean
  TillgangligNedsattRorelseformaga: boolean
}
