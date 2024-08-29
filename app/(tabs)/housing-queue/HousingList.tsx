import {
  CurrencyDollarIcon,
  ArrowsUpDownIcon,
  SquaresPlusIcon,
  ArrowsPointingOutIcon,
  MapPinIcon,
  InformationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid"
import {
  fetchFilteredHousing as fetchHousingAgency,
  HOUSING_QUEUE_BASE_URL,
} from "./housingAgency"
import { fetchSSSBHousing } from "./sssb"
import { fetchDistances } from "./distances"

export interface SearchProps {
  city?: string | null
  district?: string | null
  maxRent?: number | null
  maxRooms?: number | null
  query?: string | null
  noCorridors?: boolean
  hasSchool?: boolean
}

interface HousingListProps extends SearchProps {
  agencyType?: "sssb" | "agency" | null
  destinations: string[]
}

export default async function HousingList({
  agencyType,
  query,
  district,
  city,
  maxRent,
  maxRooms,
  noCorridors,
  hasSchool,
  destinations,
}: HousingListProps) {
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
          city,
          district,
          maxRent,
          maxRooms,
          noCorridors,
          hasSchool,
        })
      : Promise.resolve([])

  const [sssbHousing, agencyHousing] = await Promise.all([
    sssbHousingPromise,
    agencyHousingPromise,
  ])

  const housing = [
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

  const origins = housing.map((house) => {
    if (house.agencyType === "agency") {
      return {
        address: `${house.Gatuadress}, Stockholm, Sweden`,
        id: house.LägenhetId,
      }
    } else {
      return {
        address: `${house.address}, Stockholm, Sweden`,
        id: house.objectNumber,
      }
    }
  })

  const distancesMap = await fetchDistances(
    origins.map(({ address }) => address),
    destinations,
    origins.map(({ id }) => id)
  )

  const sortedHousing = housing.sort((a, b) => {
    const idA = a.agencyType === "agency" ? a.LägenhetId : a.objectNumber
    const idB = b.agencyType === "agency" ? b.LägenhetId : b.objectNumber
    const valueA = distancesMap[idA]?.[0]?.distance?.value
    const valueB = distancesMap[idB]?.[0]?.distance?.value
    return valueA && valueB ? valueA - valueB : 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedHousing.map((house) => {
          const key =
            house.agencyType === "agency"
              ? house.LägenhetId
              : house.objectNumber
          const address =
            house.agencyType === "agency" ? house.Gatuadress : house.address
          const rent = house.agencyType === "agency" ? house.Hyra : house.rent
          const floor =
            house.agencyType === "agency" ? house.Vaning : house.floor
          const area = house.agencyType === "agency" ? house.Yta : house.area
          const link =
            house.agencyType === "agency"
              ? `${HOUSING_QUEUE_BASE_URL}${house.Url}`
              : house.link

          const distances =
            distancesMap[
              house.agencyType === "agency"
                ? house.LägenhetId
                : house.objectNumber
            ] ?? []

          return (
            <div
              key={`${house.agencyType}-${key}`}
              className="flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {address}
                </h2>
                {house.agencyType === "agency" ? (
                  <small className="mb-4 block text-sm text-gray-600">
                    {house.Stadsdel}
                  </small>
                ) : (
                  <a
                    href={house.housingComplexLink}
                    target="_blank"
                    className="mb-4 block text-sm text-blue-600"
                  >
                    {house.housingComplex}
                  </a>
                )}
                <div className="space-y-2">
                  <div
                    className="flex items-center text-gray-600"
                    title="Rent in Swedish kronor"
                  >
                    <CurrencyDollarIcon className="mr-2 h-5 w-5" />
                    <span>{rent} kr/month</span>
                  </div>
                  <div
                    className="flex items-center text-gray-600"
                    title="Floor number"
                  >
                    <ArrowsUpDownIcon className="mr-2 h-5 w-5" />
                    <span>
                      {floor === undefined ||
                      (typeof floor === "string" && isNaN(parseInt(floor, 10)))
                        ? floor
                        : `Floor ${floor}`}
                    </span>
                  </div>
                  {house.agencyType === "agency" ? (
                    <div
                      className="flex items-center text-gray-600"
                      title="Number of rooms"
                    >
                      <SquaresPlusIcon className="mr-2 h-5 w-5" />
                      <span>
                        {house.AntalRum}{" "}
                        {house.AntalRum === 1 ? "room" : "rooms"}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center text-gray-600"
                      title="Housing type"
                    >
                      <InformationCircleIcon className="mr-2 h-5 w-5" />
                      <span>{house.title}</span>
                    </div>
                  )}
                  <div
                    className="flex items-center text-gray-600"
                    title="Area in square meters"
                  >
                    <ArrowsPointingOutIcon className="mr-2 h-5 w-5" />
                    <span>{area} m²</span>
                  </div>
                  {house.agencyType === "sssb" && house.queueTime && (
                    <div
                      className="flex items-center text-gray-600"
                      title="Queue time in days"
                    >
                      <ClockIcon className="mr-2 h-5 w-5" />
                      <span>
                        {house.queueTime} days
                        {house.queueSize && ` (${house.queueSize} applicants)`}
                      </span>
                    </div>
                  )}
                </div>
                {distances.length > 0 &&
                  distances.some(
                    (loc) => loc.distance && loc.duration && loc.location
                  ) && (
                    <div className="mt-4">
                      <h3 className="mb-2 font-semibold text-gray-700">
                        Travel times:
                      </h3>
                      <ul className="space-y-1">
                        {distances.map(
                          (loc, index) =>
                            loc.distance &&
                            loc.duration &&
                            loc.location && (
                              <li
                                key={index}
                                className="flex items-start text-sm text-gray-600"
                              >
                                <a
                                  href={`https://www.google.com/maps?daddr=${encodeURIComponent(loc.location)}&saddr=${encodeURIComponent(address)}, Stockholm, Sweden`}
                                  target="_blank"
                                >
                                  <MapPinIcon className="mr-1 inline h-4 w-4" />
                                  <span>
                                    {loc.duration.text} ({loc.distance.text}) to{" "}
                                    {loc.location}
                                  </span>
                                </a>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  )}
              </div>

              <div className="bg-gray-50 px-6 py-4">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded bg-blue-600 px-4 py-2 text-center font-semibold text-white transition duration-300 hover:bg-blue-700"
                >
                  View Details
                  <br />
                  <small>
                    (
                    {house.agencyType === "agency"
                      ? "Bostadsförmedlingen"
                      : "SSSB"}
                    )
                  </small>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
