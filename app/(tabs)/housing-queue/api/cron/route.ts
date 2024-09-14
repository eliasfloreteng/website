import { fetchHousing } from "../../helpers"
import { kv } from "@vercel/kv"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer, { type SendMailOptions } from "nodemailer"
import config from "~/config"
import { searchSchema } from "../../schemas"
import { type z } from "zod"

const KV_PREFIX = "housing-queue:"
const KV_SEARCH_SUFFIX = ":search"
const KV_HOUSING_SUFFIX = ":housing"

export type ResultError =
  | {
      name: "FailedSearchParameterParsing"
      message: z.inferFlattenedErrors<typeof searchSchema>
    }
  | {
      name: "FailedHousingFetch"
      message: string
      failedHousingAgency: "sssb" | "swedishHousingAgency" | null
    }
  | {
      name: "NoHousingAvailable"
      message: string
    }

export type NewHousing = {
  hash: string
  address: string
  location: string | null
  locationLink: string | null
  summary: string
  link: string | null
}

export type Result =
  | {
      type: "success"
      id: string
      newHousing: NewHousing[] | null
    }
  | {
      type: "error"
      id: string
      error: ResultError
    }

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass,
  },
})

async function sendEmail(to: string, housing: NewHousing[]) {
  const mailOptions = {
    from: config.email.from,
    to,
    subject: "New housing available",
    text: `Check out the new housing: https://${process.env.VERCEL_URL ?? "www.floreteng.se"}/housing-queue`,
    html: `
          <p>Check out the new housing: <a href="https://${process.env.VERCEL_URL ?? "www.floreteng.se"}/housing-queue">here</a></p>
          <p>New housing available:</p>
          <ul>
            ${housing
              .map(
                (house) => `
                <li>
                  <div>
                    <a href="${house.link}">
                      ${house.address}
                    </a>
                  </div>
                  <div>
                    <small>${house.locationLink ? `<a href="${house.locationLink}" target="_blank">${house.location}</a>` : house.location}</small>
                  </div>
                  <div>
                    ${house.summary}
                  </div>
                </li>
              `
              )
              .join("")}
          </ul>
        `,
  } satisfies SendMailOptions

  return await transporter.sendMail(mailOptions)
}

async function searchHousing(
  searchKey: string,
  housingKey: string
): Promise<Result> {
  const id = searchKey.replace(KV_PREFIX, "").replace(KV_SEARCH_SUFFIX, "")
  const searchData = await kv.json.get(searchKey)
  const parsedsearch = searchSchema.safeParse(searchData)
  if (!parsedsearch.success) {
    return {
      type: "error",
      id,
      error: {
        name: "FailedSearchParameterParsing",
        message: parsedsearch.error.flatten(),
      },
    }
  }
  const searchPref = parsedsearch.data
  console.log("Searching for housing with search preferences:\n", searchPref)

  const housing = await fetchHousing(searchPref)

  const hasSSSBHousing = housing.some((house) => house.housingAgency === "sssb")
  const hasSwedishHousingAgencyHousing = housing.some(
    (house) => house.housingAgency === "swedishHousingAgency"
  )
  if (
    searchPref.housingAgency === null &&
    searchPref.isStudent &&
    !hasSSSBHousing &&
    !hasSwedishHousingAgencyHousing
  ) {
    return {
      type: "error",
      id,
      error: {
        name: "FailedHousingFetch",
        message:
          "Either SSSB or Swedish Housing Agency housing failed to fetch",
        failedHousingAgency: !hasSSSBHousing
          ? "sssb"
          : !hasSwedishHousingAgencyHousing
            ? "swedishHousingAgency"
            : null,
      },
    }
  }

  const hasDistances = housing.some(
    (house) => house.destinations[0]?.distance !== null
  )
  if (!hasDistances) {
    return {
      type: "error",
      id,
      error: {
        name: "FailedHousingFetch",
        message: "Failed to fetch distances for housing",
        failedHousingAgency: null,
      },
    }
  }

  if (!housing?.length) {
    return {
      type: "error",
      id,
      error: {
        name: "NoHousingAvailable",
        message: "No housing available for search preferences",
      },
    }
  }

  const housingHashes = housing.map((house) => house.id)
  const isMembers = await kv.smismember(housingKey, housingHashes)
  const newHousing = housing.filter((_house, i) => isMembers[i] === 0)
  await kv.sadd(housingKey, ...housingHashes)

  if (housing.length && !newHousing.length) {
    return {
      type: "success",
      id,
      newHousing: null,
    }
  }

  return {
    type: "success",
    id,
    newHousing: newHousing.map((house) => {
      const location =
        house.housingAgency === "swedishHousingAgency"
          ? house.district
          : house.housingComplex
      const nearestDestination = house.destinations[0]
      const summary = [
        house.rent !== null && `${house.rent} kr/month`,
        house.size !== null && `${house.size} m²`,
        house.rooms !== null && `${house.rooms} rooms`,
        house.floor !== null && `Floor ${house.floor}`,
        nearestDestination?.location &&
          nearestDestination?.distance?.text &&
          `${nearestDestination.location} ${nearestDestination.distance.text}`,
      ]
        .filter(Boolean)
        .join(" - ")
      return {
        hash: house.id,
        address: house.address,
        location,
        locationLink:
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          (house.housingAgency === "sssb" && house.housingComplexLink) || null,
        summary,
        link: house.link,
      }
    }),
  }
}

export async function GET(_request: NextRequest) {
  const searchKeys = await kv.keys(`${KV_PREFIX}*${KV_SEARCH_SUFFIX}`)

  const housingResults = await Promise.all(
    searchKeys.map(async (searchKey) => {
      const housingKey = searchKey.replace(KV_SEARCH_SUFFIX, KV_HOUSING_SUFFIX)
      let result = await searchHousing(searchKey, housingKey)
      if (
        result.type === "error" &&
        result.error.name === "FailedHousingFetch"
      ) {
        console.error(result.error)
        console.log("Failed to fetch housing, retrying...")
        result = await searchHousing(searchKey, housingKey)
      }
      return result
    })
  )

  console.log("Results:\n", housingResults)

  const emailResults = await Promise.all(
    housingResults.flatMap((result) =>
      result.type === "success" && result.newHousing?.length
        ? sendEmail(config.email.to, result.newHousing)
        : []
    )
  )

  console.log("Email results:\n", emailResults)

  return new NextResponse(JSON.stringify(housingResults), {
    status: housingResults.every((result) => result.type === "error")
      ? 500
      : 200,
    headers: {
      "content-type": "application/json",
    },
  })
}
