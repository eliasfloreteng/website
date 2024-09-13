"use server"

import * as cheerio from "cheerio"
import { safeParseJSON } from "~/helpers"
import {
  type SSSBHousing,
  sssbHousingSchema,
  type SSSBOptions,
} from "./schemas"
import { type z } from "zod"
import { SSSB_BASE_URL } from "./constants"

export async function fetchSSSBHousing({
  query,
  maxRent,
  maxQueueDays,
  noCorridors,
  minRooms,
  maxRooms,
  minSize,
  isStudent,
  ..._rest
}: SSSBOptions): Promise<SSSBHousing[]> {
  _rest satisfies Record<string, never> // ensure all input is consumed

  if (!isStudent) {
    console.log("SSSB only has student housing")
    return []
  }

  const params = new URLSearchParams({
    callback: "jQuery",
    "widgets[]": "objektlistabilder@lagenheter",
  })
  const url = `${SSSB_BASE_URL}widgets/?${params.toString()}`
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  const response = await fetch(url)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1"
  if (!response.ok) {
    throw new Error("Failed to fetch SSSB data: " + (await response.text()))
  }
  const content = await response.text()
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const prefix = `${params.get("callback") || ""}(`
  const datastring =
    content.startsWith(prefix) && content.endsWith(");")
      ? content.slice(prefix.length, -2)
      : content
  const data = await safeParseJSON<{
    html: { "objektlistabilder@lagenheter": string }
  }>(datastring)
  if (!data) {
    return []
  }
  const html = data.html["objektlistabilder@lagenheter"]
  const $ = cheerio.load(
    html,
    {
      baseURI: SSSB_BASE_URL,
    },
    false
  )

  const housing = $.root()
    .find(".ObjektListItem")
    .map((_, element) => {
      const $element = $(element)
      const $title = $element.find(".ObjektTyp a")
      const properties = $element
        .find(".ObjektEgenskaper .PropertyItem")
        .map((_, prop) => {
          const $prop = $(prop)
          const $key = $prop.find("em")
          const classString = $key.attr("class")
          const classList = classString ? classString.split(" ") : []
          const key = classList.find((c) => c.startsWith("Egenskap-"))?.slice(9)
          const label = $key.text().trim() || undefined
          const value = $prop.find("span").text().trim() || undefined
          return { key, label, value }
        })
        .get()
      const $details = $element.find(".ObjektDetaljer")
      const $housingComplex = $details.find("dd.ObjektOmrade a")

      const title = $title.text().trim() || null
      const objectNumberText = (
        $details.find("dd.ObjektNummer").text().trim() || undefined
      )?.replace(/\D/g, "")
      const floor = $details.find("dd.ObjektVaning").text().trim() || undefined
      const size = (
        $details.find("dd.ObjektYta").text().trim() || undefined
      )?.replace(/\D/g, "")
      const rent = (
        $details.find("dd.ObjektHyra").text().trim() || undefined
      )?.replace(/\D/g, "")
      const contractStartText =
        $details.find("dd.ObjektInflytt").text().trim() || undefined
      const queueTimeText =
        $details.find("dd.ObjektAntalIntresse").text().trim() || undefined
      const queueTime = queueTimeText?.match(/^\s*(\d+)\s*/)?.[1]
      const queueSize = queueTimeText?.match(/\(\s*(\d+)\s*st\s*\)\s*$/)?.[1]

      const link = $title.attr("href")
      const address = $element.find(".ObjektAdress a").text().trim()

      if (!address || !objectNumberText) {
        console.log("Missing data for SSSB housing:", $details.html())
        return null
      }

      return {
        housingAgency: "sssb",
        id: `sssb-${objectNumberText}`,
        image: $element.find("img").attr("data-src"),
        title,
        link,
        address,
        freetext: $element.find(".ObjektFritext").text(),
        properties,
        housingComplex: $housingComplex.text(),
        housingComplexLink: `${SSSB_BASE_URL}${$housingComplex.attr("href")}`,
        floor,
        size,
        rent,
        contractStart: contractStartText
          ? new Date(contractStartText)
          : undefined,
        queueTime,
        queueSize,
        rooms: title?.match(/(\d+)\s+rum/i)?.[1],
      } satisfies z.input<typeof sssbHousingSchema>
    })
    .get()
    .flatMap((house) => {
      if (!house) {
        return []
      }
      const parsed = sssbHousingSchema.safeParse(house)
      if (!parsed.success) {
        console.error(parsed.error)
      }
      return parsed.success ? [parsed.data] : []
    })

  const filteredHousing = housing.filter(
    (house) =>
      (!noCorridors ||
        (!house.title?.includes("korridor") &&
          !house.title?.includes("kollektiv"))) &&
      (!maxRent || !house.rent || house.rent <= maxRent) &&
      (!maxQueueDays || !house.queueTime || house.queueTime <= maxQueueDays) &&
      (!minSize || !house.size || house.size >= minSize) &&
      (!maxRooms || !house.rooms || house.rooms <= maxRooms) &&
      (!minRooms || !house.rooms || house.rooms >= minRooms) &&
      (!query ||
        Object.values(house).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        ))
  )

  return filteredHousing
}
