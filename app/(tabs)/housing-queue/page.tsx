import HousingList from "./HousingList"
import { type Metadata } from "next"
import { z } from "zod"

export const metadata: Metadata = {
  title: "Housing Queue",
  description: "A page for filtering housing queue listings",
}

export default function HousingQueuePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const query = searchParams.q
  const maxRentParam = searchParams.maxRent
  const maxRent = maxRentParam
    ? Array.isArray(maxRentParam)
      ? parseInt(maxRentParam[0] ?? "")
      : parseInt(maxRentParam)
    : undefined
  const maxRoomsParam = searchParams.maxRooms
  const maxRooms = maxRoomsParam
    ? Array.isArray(maxRoomsParam)
      ? parseInt(maxRoomsParam[0] ?? "")
      : parseInt(maxRoomsParam)
    : undefined
  const agencyType = searchParams.agencyType
  const agency = Array.isArray(agencyType) ? agencyType[0] : agencyType
  const housingAgency = z
    .enum(["swedishHousingAgency", "sssb"])
    .nullable()
    .catch(null)
    .parse(agency)
  const noCorridors = searchParams.noCorridors === "on"

  const schoolParam = searchParams.school
  const school = Array.isArray(schoolParam) ? schoolParam[0] : schoolParam
  const destinationParam = searchParams.destination
  const destination = Array.isArray(destinationParam)
    ? destinationParam[0]
    : destinationParam
  const maxQueueDaysParam = searchParams.maxQueueDays
  const maxQueueDays = maxQueueDaysParam
    ? Array.isArray(maxQueueDaysParam)
      ? parseInt(maxQueueDaysParam[0] ?? "")
      : parseInt(maxQueueDaysParam)
    : undefined

  return (
    <form className="container mx-auto flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-3xl font-bold text-gray-900">
        Stockholm Housing Queue
      </h1>

      <p className="mb-8 text-gray-700">
        Search for available housing that can be rented in Stockholm. The filter
        fields are optional and sorting is done by distance to the school,
        otherwise by rent. The location fields are smartly parsed so just write
        the name of the school or destination. Only student housing is shown if
        school field is filled in.
      </p>

      <input
        type="text"
        placeholder="Search for location, address, housing type and more..."
        defaultValue={query}
        name="q"
        className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-6 *:flex-1">
        <input
          type="text"
          placeholder="School"
          defaultValue={school}
          name="school"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Other destination"
          defaultValue={destination}
          name="destination"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-[2] flex-wrap gap-6">
          <div className="relative min-w-32 flex-1">
            <input
              type="number"
              placeholder="Max rent"
              defaultValue={maxRent}
              name="maxRent"
              step={500}
              min={0}
              className="block w-full rounded border border-gray-300 p-2 pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3 pr-2">
              <span className="text-gray-500 sm:text-sm">kr</span>
            </div>
          </div>

          <div className="relative min-w-32 flex-1">
            <input
              type="number"
              placeholder="Max rooms"
              defaultValue={maxRooms}
              name="maxRooms"
              min={1}
              className="block w-full rounded border border-gray-300 p-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3 pr-2">
              <span className="text-gray-500 sm:text-sm">rooms</span>
            </div>
          </div>

          <div className="relative min-w-32 flex-1">
            <input
              type="number"
              placeholder="Max queue days"
              defaultValue={maxQueueDays}
              name="maxQueueDays"
              min={1}
              className="block w-full rounded border border-gray-300 p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3 pr-2">
              <span className="text-gray-500 sm:text-sm">days</span>
            </div>
          </div>
        </div>
        <select
          name="agencyType"
          defaultValue={agencyType}
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:flex-1"
        >
          <option value="all">All agencies</option>
          <option value="agency">Swedish Housing Agency</option>
          <option value="sssb">SSSB</option>
        </select>
        <label
          htmlFor="noCorridors"
          className="flex cursor-pointer items-center gap-2 whitespace-nowrap md:flex-1"
        >
          <input
            type="checkbox"
            id="noCorridors"
            name="noCorridors"
            defaultChecked={noCorridors}
            className="cursor-pointer rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>No student corridors</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Search
      </button>

      <HousingList
        housingAgency={housingAgency}
        sortBy={"distance"}
        query={Array.isArray(query) ? query[0] : query}
        maxRent={maxRent}
        // TODO: Implement minSize input
        // minSize={minSize}
        // TODO: Implement minRooms input
        // minRooms={minRooms}
        maxRooms={maxRooms}
        maxQueueDays={maxQueueDays}
        // TODO: Implement maxDistance input
        // maxDistance={maxDistance}
        // TODO: Implement maxTravelTime input
        // maxTravelTime={maxTravelTime}
        noCorridors={noCorridors}
        isStudent={Boolean(school)}
        destinations={[school, destination]
          .filter((d) => d !== undefined)
          .filter(Boolean)}
      />
    </form>
  )
}
