/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout"
import { createMapPageUrl } from "lib/notion"
import Link from "next/link"
import { NotionAPI } from "notion-client"
import { NotionRenderer, Collection, CollectionRow } from "react-notion-x"
import { homeId } from "config"
import { GetStaticProps } from "next"
import { ExtendedRecordMap } from "notion-types"

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps = async (context) => {
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

export default function Projects({
  recordMap,
}: {
  recordMap: ExtendedRecordMap
}) {
  if (!recordMap) {
    return null
  }

  return (
    <Layout title="Projects" description="Projects made by Elias">
      <section className="w-full">
        <div className="mx-auto h-48 max-w-6xl">
          <h1 className="py-20 text-center text-5xl font-bold md:text-left lg:text-9xl">
            Projects
            <span className="text-2xl text-slate-300 md:text-4xl lg:text-6xl">
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

const ProjectCard = ({
  pagename,
  title,
  image,
  number,
}: {
  pagename: string
  title: React.ReactNode
  image: string
  number: number
}) => (
  <Link href={`/projects/${pagename}`}>
    <a className="group grid h-72 w-full overflow-hidden shadow-2xl">
      <div className="z-10 col-start-1 row-start-1 bg-black bg-opacity-10"></div>
      <div className="z-10 col-start-1 row-start-1 flex flex-col justify-between">
        <h1 className="m-10 max-w-max rounded-md bg-red-500 py-1 px-2 text-xl font-bold text-slate-50">
          {title}
        </h1>
        <h1 className="m-10 text-xl font-bold text-slate-50">
          {number.toString().padStart(2, "0")}
        </h1>
      </div>
      <img
        src={image}
        alt="portfolio"
        className="col-start-1 row-start-1 h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-125"
      />
    </a>
  </Link>
)
