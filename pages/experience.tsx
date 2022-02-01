import Layout from "@/components/Layout"
import { GetStaticProps } from "next"
import { NotionAPI } from "notion-client"
import { ExtendedRecordMap } from "notion-types"
import { NotionRenderer } from "react-notion-x"

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps = async () => {
  const recordMap = await notion.getPage("155db39d4a314bc6800d094e23fb535d")
  return {
    props: {
      recordMap,
    },
    revalidate: 300,
  }
}

export default function Experience({
  recordMap,
}: {
  recordMap: ExtendedRecordMap
}) {
  return (
    <Layout title="Experience" description="Software i know">
      <section className="w-full">
        <div className="mx-auto h-48 max-w-6xl">
          <h1 className="py-16 text-center text-5xl font-bold md:text-left lg:text-8xl">
            Software i know
          </h1>
        </div>

        <div className="bg-[#F1F1F1] px-3 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <NotionRenderer recordMap={recordMap}></NotionRenderer>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-20 pb-40 md:grid-cols-2">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, harum!
            </div>
            <div>
              levels: ask me about anything, i can google it, hello world
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
