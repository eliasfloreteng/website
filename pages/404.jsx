import Layout from "@/components/Layout"

export default function ErrorPage() {
  return (
    <Layout title="Page not found">
      <div className="flex flex-col items-center space-y-4">
        <img src="/page_not_found.svg" alt="" className="max-w-xl" />

        <div>
          The URL you have entered does not lead to a page. Sorry about that.
        </div>

        <button
          className="rounded-md bg-white px-8 py-4 text-xl font-semibold shadow-md"
          onClick={() => history.back()}
        >
          Go back
        </button>
      </div>
    </Layout>
  )
}
