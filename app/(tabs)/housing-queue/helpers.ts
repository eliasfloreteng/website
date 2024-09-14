"use server"

import { fetchSSSBHousing } from "./sssb"
import { fetchHousingAgency } from "./housingAgency"
import { type SearchOptions } from "./schemas"
import { fetchDistances } from "./distances"

export async function fetchHousing({
  housingAgency,
  maxDistanceMeters,
  maxTravelTimeSeconds,
  sortBy,
  destinations,
  ...search
}: SearchOptions) {
  const sssbHousingPromise =
    housingAgency === "sssb" || !housingAgency
      ? fetchSSSBHousing({
          ...search,
          isStudent: true,
        })
      : Promise.resolve([])

  const agencyHousingPromise =
    housingAgency === "swedishHousingAgency" || !housingAgency
      ? fetchHousingAgency(search)
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

  const housingWithDistances = combinedHousing.map((house) => ({
    ...house,
    destinations: distancesMap[house.id] ?? [],
  }))

  const filteredHousing = housingWithDistances.filter((house) => {
    const distance = house.destinations[0]?.distance?.value
    const travelTime = house.destinations[0]?.duration?.value

    return (
      (!maxDistanceMeters || !distance || distance <= maxDistanceMeters) &&
      (!maxTravelTimeSeconds ||
        !travelTime ||
        travelTime <= maxTravelTimeSeconds)
    )
  })

  const sortedHousing = filteredHousing
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

  return sortedHousing
}
