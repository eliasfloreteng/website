import { fetchHousing } from "../../helpers"
import { kv } from "@vercel/kv"
import { type NextRequest, NextResponse } from "next/server"
import nodemailer, { type SendMailOptions } from "nodemailer"
import { z } from "zod"
import config from "~/config"
import { searchSchema } from "../../schemas"
import { SSSB_BASE_URL } from "../../sssb"

export const dynamic = "force-dynamic" // static by default, unless reading the request

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass,
  },
})

const housingHashesSchema = z.array(z.string())

export async function GET(_request: NextRequest) {
  const searchKeys = await kv.keys("housing-queue:*:search")
  console.log("Search keys:", searchKeys)

  const housingLinks = [] as string[][]

  for (const searchKey of searchKeys) {
    console.log("Searching for new housing for:", searchKey)
    const housingKey = searchKey.replace("search", "housing")
    const searchData = await kv.json.get(searchKey)
    const parsedsearch = searchSchema.safeParse(searchData)
    if (!parsedsearch.success) {
      console.error(parsedsearch.error)
      continue
    }
    const pref = parsedsearch.data
    console.log("Search preferences:", pref)

    const oldHousingHashesData = await kv.lrange(housingKey, 0, -1)
    const oldHousingHashesParsed =
      housingHashesSchema.safeParse(oldHousingHashesData)
    if (!oldHousingHashesParsed.success) {
      console.error(oldHousingHashesParsed.error)
    }
    const oldHousingHashes = oldHousingHashesParsed.data
    console.log("Old housing hashes:", oldHousingHashes)

    const housing = await fetchHousing(pref)
    const housingHashes = housing.map((house) => house.id)

    const hasDistances = housing.some(
      (house) => house.destinations[0]?.distance !== null
    )
    const hasSSSBHousing = housing.some(
      (house) => house.housingAgency === "sssb"
    )
    const hasSwedishHousingAgencyHousing = housing.some(
      (house) => house.housingAgency === "swedishHousingAgency"
    )
    console.log("Has distances:", hasDistances)
    console.log("Has SSSB housing:", hasSSSBHousing)
    console.log(
      "Has Swedish Housing Agency housing:",
      hasSwedishHousingAgencyHousing
    )
    if (
      pref.housingAgency === null &&
      pref.isStudent &&
      !hasSSSBHousing &&
      !hasSwedishHousingAgencyHousing &&
      !hasDistances
    ) {
      console.log(
        "Fetching failed: both SSSB and Swedish Housing Agency housing must be available"
      )
      continue
    }

    if (housingHashes?.length) {
      await kv.del(housingKey)
      await kv.lpush(housingKey, ...housingHashes)
    }

    const newHousing = housing
      .slice(0, 12)
      .filter((house) => !oldHousingHashes?.includes(house.id))
    console.log(
      "New housing:",
      newHousing.map((house) => house.id)
    )

    if (newHousing.length) {
      const newHousingLinks = newHousing
        .map((house) => house.link)
        .filter((link) => link !== null)
      housingLinks.push(newHousingLinks)

      const mailOptions = {
        from: config.email.from,
        to: config.email.to,
        subject: "New housing available",
        text: `Check out the new housing: https://${process.env.VERCEL_URL ?? "www.floreteng.se"}/housing-queue\n\nNew housing available: ${newHousingLinks.join(", ")}`,
        html: `

          <p>Check out the new housing: <a href="https://${process.env.VERCEL_URL ?? "www.floreteng.se"}/housing-queue">here</a></p>
          <p>New housing available:</p>
          <ul>
            ${newHousing
              .map(
                // styled list items with metadata
                (house) => `
                <li>
                  <a href="${house.link}">
                    ${house.address}
                  </a>
                  <small>${house.housingAgency === "swedishHousingAgency" ? house.district : `<a href="${house.housingComplexLink ?? SSSB_BASE_URL}" target="_blank">${house.housingComplex}</a>`}</small>
                  <div>
                    ${house.rent} kr/month
                  </div>
                  <div>
                    ${house.size} m²
                  </div>
                  <div>
                    ${house.floor ? `Floor ${house.floor}` : ""}
                  </div>
                  <div>
                    ${house.destinations[0]?.location} ${house.destinations[0]?.distance?.text}
                  </div>
                </li>
              `
              )
              .join("")}
          </ul>
        `,
      } satisfies SendMailOptions

      const responseInfo = await transporter
        .sendMail(mailOptions)
        .catch((e) => {
          console.error(e)
        })
      console.log("Email sent:", responseInfo)
    } else {
      console.log("No new housing available")
    }
  }

  console.log("New housing links:", housingLinks)

  return new NextResponse(JSON.stringify(housingLinks), {
    headers: {
      "content-type": "application/json",
    },
  })
}
