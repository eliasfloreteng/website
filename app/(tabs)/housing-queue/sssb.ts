import * as cheerio from "cheerio"
import "server-only"
import { safeParseJSON } from "~/helpers"

const SSSB_BASE_URL = "https://sssb.se/"

export async function fetchSSSBHousing({
  query,
  maxRent,
  noCorridors,
}: {
  query?: string | null
  maxRent?: number | null
  noCorridors?: boolean
}) {
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
      const queueTime = queueTimeText?.match(/^\s*(\d+)\s*/)
      const queueSize = queueTimeText?.match(/\(\s*(\d+)\s*st\s*\)\s*$/)

      return {
        objectNumber: objectNumberText
          ? parseInt(objectNumberText, 10)
          : undefined,
        image: $element.find("img").attr("data-src"),
        title: $title.text().trim() || undefined,
        link: $title.attr("href"),
        address: $element.find(".ObjektAdress a").text().trim() || undefined,
        freetext: $element.find(".ObjektFritext").text().trim() || undefined,
        properties,
        housingComplex: $housingComplex.text().trim() || undefined,
        housingComplexLink: `${SSSB_BASE_URL}${$housingComplex.attr("href")}`,
        floor: floorText,
        area: areaText ? parseInt(areaText, 10) : undefined,
        rent: rentText ? parseInt(rentText, 10) : undefined,
        contractStart: contractStartText
          ? new Date(contractStartText)
          : undefined,
        queueTime: queueTime?.[1] ? parseInt(queueTime[1], 10) : undefined,
        queueSize: queueSize?.[1] ? parseInt(queueSize[1], 10) : undefined,
      }
    })
    .get()

  const filteredHousing = housing
    .filter(
      (house) =>
        (!noCorridors || !house.title?.includes("korridor")) &&
        (!maxRent || (house.rent && house.rent <= maxRent)) &&
        (!query ||
          Object.values(house).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          ))
    )
    .flatMap((house) => {
      const address = house.address
      const objectNumber = house.objectNumber
      return address && objectNumber
        ? [{ ...house, address, objectNumber }]
        : []
    })

  return filteredHousing
}
