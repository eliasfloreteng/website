export default function LoadingSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="relative h-96 w-full bg-gray-700"></div>
      <div className="container relative -top-6 mx-auto max-w-max rounded-lg bg-gray-950 px-6 pb-8 pt-12 shadow-md sm:px-12 md:pt-8 lg:max-w-6xl">
        <div className="mb-5 h-12 w-3/4 bg-gray-700"></div>
        <div className="mb-4 flex space-x-2">
          <div className="h-6 w-12 rounded bg-gray-700"></div>
          <div className="h-6 w-12 rounded bg-gray-700"></div>
          <div className="h-6 w-12 rounded bg-gray-700"></div>
        </div>
        <div className="mb-4 h-6 w-1/4 bg-gray-700"></div>
        <div className="mb-2 h-4 w-full bg-gray-700"></div>
        <div className="mb-2 h-4 w-full bg-gray-700"></div>
        <div className="mb-2 h-4 w-3/4 bg-gray-700"></div>
        <div className="mt-5 h-10 w-1/4 rounded bg-gray-700"></div>
      </div>
    </div>
  )
}
