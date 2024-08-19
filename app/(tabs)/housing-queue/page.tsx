import HousingList from "./HousingList"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Housing Queue",
  description: "A page for filtering housing queue listings",
}

const destinations = ["KTH, Stockholm, Sweden", "Vega station, Haninge, Sweden"]

export default function HousingQueuePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = searchParams["q"]
  const maxRentParam = searchParams["maxRent"]
  const maxRent = maxRentParam
    ? Array.isArray(maxRentParam)
      ? parseInt(maxRentParam[0])
      : parseInt(maxRentParam)
    : undefined
  const maxRoomsParam = searchParams["maxRooms"]
  const maxRooms = maxRoomsParam
    ? Array.isArray(maxRoomsParam)
      ? parseInt(maxRoomsParam[0])
      : parseInt(maxRoomsParam)
    : undefined

  return (
    <form className="container mx-auto flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Housing Queue</h1>

      <input
        type="text"
        placeholder="Search for housing"
        defaultValue={query}
        name="q"
        className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-6">
        <input
          type="number"
          placeholder="Max rent"
          defaultValue={maxRent}
          name="maxRent"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max rooms"
          defaultValue={maxRooms}
          name="maxRooms"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Search
      </button>

      <HousingList
        query={Array.isArray(query) ? query[0] : query}
        city="Stockholm"
        maxRent={maxRent}
        maxRooms={maxRooms}
        destinations={destinations}
      />
    </form>
  )
}
