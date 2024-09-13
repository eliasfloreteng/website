import {
  CurrencyDollarIcon,
  ArrowsUpDownIcon,
  SquaresPlusIcon,
  ArrowsPointingOutIcon,
  MapPinIcon,
  InformationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid"
import { fetchHousing } from "./helpers"
import { type SearchOptions } from "./schemas"
import { SSSB_BASE_URL } from "./constants"

export default async function HousingList(searchProps: SearchOptions) {
  const housing = await fetchHousing(searchProps)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {housing.map((house) => {
          return (
            <div
              key={house.id}
              className="flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {house.address}
                </h2>
                {house.housingAgency === "swedishHousingAgency" ? (
                  <small className="mb-4 block text-sm text-gray-600">
                    {house.district}
                  </small>
                ) : (
                  <a
                    href={house.housingComplexLink ?? SSSB_BASE_URL}
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
                    <span>{house.rent} kr/month</span>
                  </div>
                  <div
                    className="flex items-center text-gray-600"
                    title="Floor number"
                  >
                    <ArrowsUpDownIcon className="mr-2 h-5 w-5" />
                    <span>
                      {house.floor === undefined ||
                      (typeof house.floor === "string" &&
                        isNaN(parseInt(house.floor, 10)))
                        ? house.floor
                        : `Floor ${house.floor}`}
                    </span>
                  </div>
                  {house.housingAgency === "swedishHousingAgency" ? (
                    <div
                      className="flex items-center text-gray-600"
                      title="Number of rooms"
                    >
                      <SquaresPlusIcon className="mr-2 h-5 w-5" />
                      <span>
                        {house.rooms} {house.rooms === 1 ? "room" : "rooms"}
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
                    <span>{house.size} m²</span>
                  </div>
                  {house.housingAgency === "sssb" && house.queueTime ? (
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
                  ) : null}
                </div>
                {house.destinations.length > 0 &&
                  house.destinations.some(
                    (loc) => loc.distance && loc.duration && loc.location
                  ) && (
                    <div className="mt-4">
                      <h3 className="mb-2 font-semibold text-gray-700">
                        Travel times:
                      </h3>
                      <ul className="space-y-1">
                        {house.destinations.map(
                          (loc, index) =>
                            loc.distance &&
                            loc.duration &&
                            loc.location && (
                              <li
                                key={index}
                                className="flex items-start text-sm text-gray-600"
                              >
                                <a
                                  href={`https://www.google.com/maps?daddr=${encodeURIComponent(loc.location)}&saddr=${encodeURIComponent(house.address)}, Stockholm, Sweden`}
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
                  href={house.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded bg-blue-600 px-4 py-2 text-center font-semibold text-white transition duration-300 hover:bg-blue-700"
                >
                  View Details
                  <br />
                  <small>
                    (
                    {house.housingAgency === "swedishHousingAgency"
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
