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
  minSize,
  isStudent,
}: SSSBOptions): Promise<SSSBHousing[]> {
  if (!isStudent) {
    console.log("SSSB only has student housing")
    return []
  }

  const params = new URLSearchParams({
    callback: "",
    "widgets[]": "objektlistabilder@lagenheter",
  })
  const url = `${SSSB_BASE_URL}widgets/?${params.toString()}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch SSSB data: " + (await response.text()))
  }
  const content = await response.text()
  const datastring =
    content.startsWith("(") && content.endsWith(");")
      ? content.slice(1, -2)
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

      const objectNumberText = (
        $details.find("dd.ObjektNummer").text().trim() || undefined
      )?.replace(/\D/g, "")
      const floorText =
        $details.find("dd.ObjektVaning").text().trim() || undefined
      const areaText = (
        $details.find("dd.ObjektYta").text().trim() || undefined
      )?.replace(/\D/g, "")
      const rentText = (
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
        title: $title.text().trim() || null,
        link,
        address,
        freetext: $element.find(".ObjektFritext").text().trim() || undefined,
        properties,
        housingComplex: $housingComplex.text().trim() || undefined,
        housingComplexLink: `${SSSB_BASE_URL}${$housingComplex.attr("href")}`,
        floor: floorText,
        size: areaText,
        rent: rentText,
        contractStart: contractStartText
          ? new Date(contractStartText)
          : undefined,
        queueTime,
        queueSize,
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
      (!noCorridors || !house.title?.includes("korridor")) &&
      (!maxRent || (house.rent && house.rent <= maxRent)) &&
      (!maxQueueDays || (house.queueTime && house.queueTime <= maxQueueDays)) &&
      (!minSize || (house.size && house.size >= minSize)) &&
      (!query ||
        Object.values(house).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        ))
  )

  return filteredHousing
}
