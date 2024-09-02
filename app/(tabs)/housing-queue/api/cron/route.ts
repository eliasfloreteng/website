import { fetchHousing } from "../../helpers"
import { kv } from "@vercel/kv"
import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export const dynamic = "force-dynamic" // static by default, unless reading the request

export async function GET(_request: NextRequest) {
  const housing = await fetchHousing({
    maxRent: 7000,
    maxRooms: 1,
    noCorridors: true,
    isStudent: true,
  })

  const firstHousing = housing.slice(0, 12)
  const housingHash = firstHousing
    .map((house) => {
      return `${house.agencyType}-${house.agencyType === "agency" ? house.LägenhetId : house.objectNumber}`
    })
    .sort()
    .join(",")
  const oldHousing = await kv.get<string>("housing")
  if (oldHousing === housingHash) {
    return new NextResponse(null, {
      status: 204,
    })
  }
  console.log("oldHousing", oldHousing)
  console.log("housingHash", housingHash)
  await kv.set("housing", housingHash)
  return new NextResponse(JSON.stringify(firstHousing), {
    headers: {
      "content-type": "application/json",
    },
  })
}
