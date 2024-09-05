import { fetchSSSBHousing } from "./sssb"
import { fetchFilteredHousing as fetchHousingAgency } from "./housingAgency"
import { type SearchOptions } from "./schemas"

export async function fetchHousing({
  query,
  maxRent,
  noCorridors,
  maxQueueDays,
  isStudent,
  maxRooms,
  housingAgency,
}: SearchOptions) {
  const sssbHousingPromise =
    housingAgency === "sssb" || !housingAgency
      ? fetchSSSBHousing({
          query,
          maxRent,
          maxQueueDays,
          noCorridors,
          isStudent,
        })
      : Promise.resolve([])

  const agencyHousingPromise =
    housingAgency === "swedishHousingAgency" || !housingAgency
      ? fetchHousingAgency({
          query,
          maxRent,
          maxRooms,
          noCorridors,
          isStudent,
        })
      : Promise.resolve([])

  const [sssbHousing, agencyHousing] = await Promise.all([
    sssbHousingPromise,
    agencyHousingPromise,
  ])

  return [...sssbHousing, ...agencyHousing].sort((a, b) => {
    return (a.rent ?? Infinity) - (b.rent ?? Infinity)
  })
}
