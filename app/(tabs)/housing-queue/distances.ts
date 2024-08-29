import "server-only"

export const MAPS_BASE_URL =
  "https://maps.googleapis.com/maps/api/distancematrix/json"
export const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

export async function fetchDistances(
  origins: string[],
  destinations: string[],
  filteredHousing: number[]
) {
  const departure_datetime = new Date()
  departure_datetime.setHours(8)
  departure_datetime.setMinutes(0)
  const departure_time = Math.floor(
    departure_datetime.getTime() / 1000
  ).toString()

  // Split the origins into chunks of 25 (because of rate limits)
  const chunkSize = 25
  const originChunks = []
  for (let i = 0; i < origins.length; i += chunkSize) {
    originChunks.push(origins.slice(i, i + chunkSize))
  }

  const distancePromises = originChunks.map(async (originChunk) => {
    const params = new URLSearchParams({
      origins: originChunk.join("|"),
      destinations: destinations.join("|"),
      mode: "transit",
      units: "metric",
      departure_time,
      key: MAPS_API_KEY,
    } as Record<string, string>)

    const res = await fetch(`${MAPS_BASE_URL}?${params.toString()}`)
    if (!res.ok) {
      throw new Error("Failed to fetch distance data: " + res.text())
    }
    return (await res.json()) as Distance
  })

  const distanceResults = await Promise.all(distancePromises)

  // Combine all the distance results
  const distancesMap = distanceResults.reduce(
    (acc, distances, chunkIndex) => {
      distances.rows.forEach((row, rowIndex) => {
        const originIndex = chunkIndex * chunkSize + rowIndex
        const originId = filteredHousing[originIndex]
        const mappedDistances: DistanceMap[] = row.elements.map(
          (element, elementIndex) => ({
            ...element,
            location: destinations[elementIndex],
          })
        )
        acc[originId] = mappedDistances
      })
      return acc
    },
    {} as Record<number, DistanceMap[]>
  )
  return distancesMap
}

export interface Distance {
  destination_addresses: string[]
  origin_addresses: string[]
  rows: {
    elements: {
      distance: {
        text: string
        value: number
      }
      duration: {
        text: string
        value: number
      }
      status: string
    }[]
  }[]
  status: "OK" | string
}

export interface DistanceMap {
  location: string | undefined
  distance: { text: string; value: number } | undefined
  duration: { text: string; value: number } | undefined
}
