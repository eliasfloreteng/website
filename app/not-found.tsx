import Image from "next/image"
import notFoundImage from "../public/page_not_found.svg"
import { Metadata } from "next"
import BackButton from "./BackButton"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The URL you have entered does not lead to a page. Sorry about that.",
}

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="max-w-xl">
        <Image src={notFoundImage} alt="404" />
      </div>

      <div>
        The URL you have entered does not lead to a page. Sorry about that.
      </div>

      <BackButton className="rounded-md bg-white px-8 py-4 text-xl font-semibold shadow-md">Go back</BackButton>
    </div>
  )
}
