import { fetchSSSBHousing } from "./sssb"
import { fetchFilteredHousing as fetchHousingAgency } from "./housingAgency"

export interface SearchProps {
  query?: string | null
  maxRent?: number | null
  maxRooms?: number | null
  noCorridors?: boolean
  isStudent?: boolean
  agencyType?: "sssb" | "agency" | null
}

export async function fetchHousing({
  query,
  maxRent,
  noCorridors,
  isStudent,
  maxRooms,
  agencyType,
}: SearchProps) {
  const sssbHousingPromise =
    agencyType === "sssb" || !agencyType
      ? fetchSSSBHousing({
          query,
          maxRent,
          noCorridors,
        })
      : Promise.resolve([])

  const agencyHousingPromise =
    agencyType === "agency" || !agencyType
      ? fetchHousingAgency({
          query,
          maxRent,
          maxRooms,
          noCorridors,
          isStudent: isStudent,
        })
      : Promise.resolve([])

  const [sssbHousing, agencyHousing] = await Promise.all([
    sssbHousingPromise,
    agencyHousingPromise,
  ])

  return [
    ...sssbHousing.map((house) => ({ agencyType: "sssb" as const, ...house })),
    ...agencyHousing.map((house) => ({
      agencyType: "agency" as const,
      ...house,
    })),
  ].sort((a, b) => {
    const rentA = a.agencyType === "agency" ? a.Hyra : a.rent
    const rentB = b.agencyType === "agency" ? b.Hyra : b.rent
    return (rentA ?? Infinity) - (rentB ?? Infinity)
  })
}
