import { safeParseJSONResponse } from "app/helpers"
import { type SearchProps } from "./HousingList"
import "server-only"

export const HOUSING_QUEUE_BASE_URL = "https://bostad.stockholm.se"

export async function fetchFilteredHousing({
  query,
  city,
  district,
  maxRent,
  maxRooms,
  noCorridors,
  hasSchool,
}: SearchProps) {
  const housingQueueResponse = await fetch(
    `${HOUSING_QUEUE_BASE_URL}/AllaAnnonser`
  )
  if (!housingQueueResponse.ok) {
    throw new Error(
      "Failed to fetch housing data: " + (await housingQueueResponse.text())
    )
  }
  const housing =
    (await safeParseJSONResponse<Housing[]>(housingQueueResponse)) ?? []
  const filteredHousing = housing.filter(
    (house) =>
      (!hasSchool || house.Student) &&
      (!noCorridors ||
        !(house.Student && house.Lagenhetstyp === "Studentkorridor")) &&
      (!city || house.Kommun === city) &&
      (!district || house.Stadsdel === district) &&
      (!maxRent || (house.Hyra && house.Hyra <= maxRent)) &&
      (!maxRooms || house.AntalRum <= maxRooms) &&
      (!query ||
        Object.values(house).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        ))
  )
  return filteredHousing
}

export interface Housing {
  LägenhetId: number
  AnnonsId: number
  Stadsdel: string
  Gatuadress: string
  Kommun: string
  Vaning: number
  AntalRum: number
  Yta: number
  Hyra?: number
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
