/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout"
import { createMapPageUrl } from "lib/notion"
import Link from "next/link"
import { NotionAPI } from "notion-client"
import { NotionRenderer, Collection, CollectionRow } from "react-notion-x"
import { homeId } from "config"

const notion = new NotionAPI()

export const getStaticProps = async (context) => {
  try {
    const recordMap = await notion.getPage(homeId)

    return {
      props: {
        recordMap,
      },
      revalidate: 10,
    }
  } catch (err) {
    console.error("page error", err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function Projects({ recordMap }) {
  if (!recordMap) {
    return null
  }

  return (
    <Layout title="Projects" description="Projects made by Elias">
      <section className="w-full">
        <div className="max-w-6xl mx-auto h-48">
          <h1 className="text-5xl lg:text-9xl font-bold py-20 text-center md:text-left">
            Projects
            <span className="text-2xl md:text-4xl lg:text-6xl text-gray-300">
              {" "}
              – a subset
            </span>
          </h1>
        </div>

        <div className="bg-white pt-8">
          <NotionRenderer
            recordMap={recordMap}
            mapPageUrl={createMapPageUrl(recordMap)}
            fullPage={false}
            darkMode={false}
            components={{
              collection: Collection,
              collectionRow: CollectionRow,
            }}
          />
        </div>
      </section>
    </Layout>
  )
}

const ProjectCard = ({ pagename, title, image, number }) => (
  <Link href={`/projects/${pagename}`}>
    <a className="w-full grid shadow-2xl group overflow-hidden h-72">
      <div className="bg-black bg-opacity-10 row-start-1 col-start-1 z-10"></div>
      <div className="row-start-1 col-start-1 flex flex-col justify-between z-10">
        <h1 className="text-gray-50 font-bold text-xl max-w-max bg-red-500 rounded-md m-10 py-1 px-2">
          {title}
        </h1>
        <h1 className="text-gray-50 font-bold text-xl m-10">
          {number.length === 1 ? "0" + number : number}
        </h1>
      </div>
      <img
        src={image}
        alt="portfolio"
        className="row-start-1 col-start-1 h-full w-full transform group-hover:scale-125 transition-transform duration-[2000ms] ease-out object-cover"
      />
    </a>
  </Link>
)
