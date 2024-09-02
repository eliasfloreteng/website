import HousingList from "./HousingList"
import { type Metadata } from "next"

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
  const noCorridors = searchParams.noCorridors === "on"

  const schoolParam = searchParams.school
  const school = Array.isArray(schoolParam) ? schoolParam[0] : schoolParam
  const destinationParam = searchParams.destination
  const destination = Array.isArray(destinationParam)
    ? destinationParam[0]
    : destinationParam

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
        <div className="flex flex-[2] gap-6 *:flex-1">
          <input
            type="number"
            placeholder="Max rent"
            defaultValue={maxRent}
            name="maxRent"
            step={500}
            min={0}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max rooms"
            defaultValue={maxRooms}
            name="maxRooms"
            min={1}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
        agencyType={
          agency === "all" ? null : (agency as "agency" | "sssb" | undefined)
        }
        query={Array.isArray(query) ? query[0] : query}
        maxRent={maxRent}
        maxRooms={maxRooms}
        noCorridors={noCorridors}
        isStudent={Boolean(school)}
        destinations={[school, destination].filter((d) => d !== undefined)}
      />
    </form>
  )
}
