import Layout from "@/components/Layout"
import Link from "next/link"

export default function Home() {
  return (
    <Layout title="Elias1233" description="Software developer studying at KTH">
      <h1 className="text-6xl font-bold">Hello and welcome!</h1>

      <div className="prose">
        <p className="lead">
          I make projects. Mainly full-stack web development, python scripts and
          IOT automation.
        </p>
      </div>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <Link href="/projects">
          <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Projects &rarr;</h3>
            <p className="mt-4 text-xl">The projects i have participated in</p>
          </a>
        </Link>
      </div>
    </Layout>
  )
}
