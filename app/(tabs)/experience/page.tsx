import NotionPage from "app/_notion/NotionPage"
import { type Metadata } from "next"

export const revalidate = 10

export const metadata: Metadata = {
  title: "Experience & resume - Elias Floreteng",
}

export default async function ExperiencePage() {
  return (
    <section className="w-full bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <h1 className="py-10 text-center text-5xl font-bold md:text-left lg:text-7xl">
          Experience &amp; resume
        </h1>
      </div>

      <div className="px-3 sm:px-8">
        <div className="mx-auto max-w-6xl pt-6">
          <NotionPage
            pageId="155db39d4a314bc6800d094e23fb535d"
            className="prose-invert"
          />
        </div>
      </div>
    </section>
  )
}
