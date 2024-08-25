import {
  CurrencyDollarIcon,
  ArrowsUpDownIcon,
  SquaresPlusIcon,
  ArrowsPointingOutIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid"

const HOUSING_QUEUE_BASE_URL = "https://bostad.stockholm.se"
const MAPS_BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json"

const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

interface Housing {
  LägenhetId: number
  AnnonsId: number
  Stadsdel: string
  Gatuadress: string
  Kommun: string
  Vaning: number
  AntalRum: number
  Yta: number
  Hyra?: number
  AnnonseradTill: string
  AnnonseradFran: string
  KoordinatLongitud: number
  KoordinatLatitud: number
  Url: string
  Antal: number
  Balkong: boolean
  Hiss: boolean
  Nyproduktion: boolean
  Ungdom: boolean
  Student: boolean
  Senior: boolean
  Korttid: boolean
  Vanlig: boolean
  Bostadssnabben: boolean
  BostadSnabbt: boolean
  KompisUngdom: boolean
  Ko: string
  KoNamn: string
  Lagenhetstyp: string
  HarAnmaltIntresse: boolean
  KanAnmalaIntresse: boolean
  HarBraChans: boolean
  HarInternko: boolean
  Internko: boolean
  Externko: boolean
  Omraden: {
    Id: number
    Platstyp: number
  }[]
  ArInloggad: boolean
  LiknadeLagenhetStatistik: {
    KotidFordelningQ1: number
    KotidFordelningQ3: number
  }
  LägstaHyran: number | null
  HögstaHyran: number | null
  LägstaYtan: number | null
  HögstaYtan: number | null
  LägstaAntalRum: number | null
  HögstaAntalRum: number | null
  TillgangligNedsattOrienteringsformaga: boolean
  TillgangligNedsattRorelseformaga: boolean
}

interface Distance {
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

interface DistanceMap {
  location: string
  distance: { text: string; value: number }
  duration: { text: string; value: number }
}

interface HousingListProps {
  query?: string | null
  district?: string | null
  city?: string | null
  maxRent?: number | null
  maxRooms?: number | null
  destinations: string[]
}

export default async function HousingList({
  query,
  district,
  city,
  maxRent,
  maxRooms,
  destinations,
}: HousingListProps) {
  const housingQueueResponse = await fetch(
    `${HOUSING_QUEUE_BASE_URL}/AllaAnnonser`
  )
  const housing: Housing[] = await housingQueueResponse.json()

  const filteredHousing = housing
    .sort((a, b) => ((a.Hyra ?? Infinity) < (b.Hyra ?? Infinity) ? 1 : -1))
    .filter(
      (house) =>
        house.Student &&
        (!city || house.Kommun === city) &&
        (!district || house.Stadsdel === district) &&
        (!maxRent || (house.Hyra && house.Hyra <= maxRent)) &&
        (!maxRooms || house.AntalRum <= maxRooms) &&
        (!query ||
          Object.values(house).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          ))
    )

  const origins = filteredHousing.map(
    (house) => `${house.Gatuadress}, Stockholm, Sweden`
  )

  const departure_datetime = new Date()
  departure_datetime.setHours(8)
  departure_datetime.setMinutes(0)
  const departure_time = Math.floor(
    departure_datetime.getTime() / 1000
  ).toString()

  // Split the origins into chunks of 25
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
        const originId = filteredHousing[originIndex].LägenhetId
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

  const sortedHousing = filteredHousing.sort((a, b) =>
    distancesMap[a.LägenhetId]?.[0]?.duration.value >
    distancesMap[b.LägenhetId]?.[0]?.duration.value
      ? 1
      : -1
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedHousing.map((house) => (
          <div
            key={house.LägenhetId}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {house.Gatuadress}
              </h2>
              <small className="mb-4 block text-sm text-gray-600">
                {house.Stadsdel}
              </small>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <CurrencyDollarIcon className="mr-2 h-5 w-5" />
                  <span>{house.Hyra} kr/month</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ArrowsUpDownIcon className="mr-2 h-5 w-5" />
                  <span>{house.Vaning} floor</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <SquaresPlusIcon className="mr-2 h-5 w-5" />
                  <span>{house.AntalRum} rooms</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ArrowsPointingOutIcon className="mr-2 h-5 w-5" />
                  <span>{house.Yta} m²</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="mb-2 font-semibold text-gray-700">Distances:</h3>
                <ul className="space-y-1">
                  {distancesMap[house.LägenhetId]?.map((loc, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-600"
                    >
                      <a
                        href={`https://www.google.com/maps?daddr=${encodeURIComponent(loc.location)}&saddr=${encodeURIComponent(house.Gatuadress)}, Stockholm, Sweden`}
                        target="_blank"
                      >
                        <MapPinIcon className="mr-1 inline h-4 w-4" />
                        <span>
                          {loc.duration.text} ({loc.distance.text}) to{" "}
                          {loc.location}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4">
              <a
                href={`${HOUSING_QUEUE_BASE_URL}${house.Url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded bg-blue-600 px-4 py-2 text-center font-semibold text-white transition duration-300 hover:bg-blue-700"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
