import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <div className="text-center">
        <h1 className="mb-8 text-6xl font-bold">Hello and welcome!</h1>
        <div className="prose">
          <p className="lead">
            I make projects. Mainly full-stack web development, python scripts
            and IOT automation.
          </p>
        </div>
      </div>

      {/* <Blobs /> */}

      <div className="mt-6 flex w-full max-w-4xl flex-wrap items-center justify-around">
        <Link
          href="/projects"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Projects &rarr;</h3>
          <p className="mt-4 text-xl">The projects i have participated in</p>
        </Link>
        <Link
          href="/experience"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Experience &rarr;</h3>
          <p className="mt-4 text-xl">
            Some of my skills in software development
          </p>
        </Link>
      </div>
    </>
  )
}
