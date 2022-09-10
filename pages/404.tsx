import Layout from "@/components/Layout"
import Image from "next/image"
import notFoundImage from "../public/page_not_found.svg"

export default function ErrorPage() {
  return (
    <Layout title="Page not found">
      <div className="flex flex-col items-center space-y-4">
        <div className="max-w-xl">
          <Image src={notFoundImage} alt="404" />
        </div>

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
