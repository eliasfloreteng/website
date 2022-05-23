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
    <Layout title="Experience" description="My experience">
      <section className="w-full">
        <div className="mx-auto max-w-6xl">
          <h1 className="py-10 text-center text-5xl font-bold md:text-left lg:text-7xl">
            Experience &amp; resume
          </h1>
        </div>

        <div className="bg-[#F1F1F1] px-3 sm:px-8">
          <div className="mx-auto max-w-6xl pt-6">
            <NotionRenderer recordMap={recordMap}></NotionRenderer>
          </div>
        </div>
      </section>
    </Layout>
  )
}
