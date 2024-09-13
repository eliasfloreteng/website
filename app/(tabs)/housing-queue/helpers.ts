"use server"

import { fetchSSSBHousing } from "./sssb"
import { fetchFilteredHousing as fetchHousingAgency } from "./housingAgency"
import { type SearchOptions } from "./schemas"
import { fetchDistances } from "./distances"

export async function fetchHousing({
  query,
  maxRent,
  noCorridors,
  maxQueueDays,
  isStudent,
  maxRooms,
  housingAgency,
  destinations,
  sortBy,
  minRooms,
  minSize,
}: SearchOptions) {
  const sssbHousingPromise =
    housingAgency === "sssb" || !housingAgency
      ? fetchSSSBHousing({
          query,
          maxRent,
          minSize,
          maxQueueDays,
          noCorridors,
          isStudent: true,
        })
      : Promise.resolve([])

  const agencyHousingPromise =
    housingAgency === "swedishHousingAgency" || !housingAgency
      ? fetchHousingAgency({
          query,
          maxRent,
          minSize,
          minRooms,
          maxRooms,
          noCorridors,
          isStudent,
        })
      : Promise.resolve([])

  const [sssbHousing, agencyHousing] = await Promise.all([
    sssbHousingPromise,
    agencyHousingPromise,
  ])

  const combinedHousing = [...sssbHousing, ...agencyHousing]

  const origins = combinedHousing.map((house) => ({
    address: `${house.address}, Stockholm, Sweden`,
    id: house.id,
  }))

  const distancesMap = await fetchDistances(
    origins.map(({ address }) => address),
    destinations,
    origins.map(({ id }) => id)
  )

  return combinedHousing
    .map((house) => ({
      ...house,
      destinations: distancesMap[house.id] ?? [],
    }))
    .sort((a, b) => (a.rent ?? Infinity) - (b.rent ?? Infinity))
    .sort((a, b) => {
      const distanceA = a.destinations[0]?.distance?.value
      const distanceB = b.destinations[0]?.distance?.value
      const travelTimeA = a.destinations[0]?.duration?.value
      const travelTimeB = b.destinations[0]?.duration?.value

      return sortBy === "distance"
        ? distanceA && distanceB
          ? distanceA - distanceB
          : 0
        : travelTimeA && travelTimeB
          ? travelTimeA - travelTimeB
          : 0
    })
}
