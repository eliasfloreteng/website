import Layout from "@/components/Layout"

export default function Home() {
  return (
    <Layout title="Elias1233" description="Software developer studying at KTH">
      {/* link classes: text-blue-600 focus:underline hover:underline */}
      <h1 className="text-6xl font-bold">Hello and welcome!</h1>

      <div className="prose">
        <p className="lead">I make projects</p>
      </div>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <a
          href="https://nextjs.org/docs"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
          <p className="mt-4 text-xl">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Learn &rarr;</h3>
          <p className="mt-4 text-xl">
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Examples &rarr;</h3>
          <p className="mt-4 text-xl">
            Discover and deploy boilerplate example Next.js projects.
          </p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
          <p className="mt-4 text-xl">
            Instantly deploy your Next.js site to a public URL with Vercel.
          </p>
        </a>
      </div>
    </Layout>
  )
}
