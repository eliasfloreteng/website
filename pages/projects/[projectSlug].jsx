import {
  getPageTitle,
  getPageProperty,
  getBlockParentPage,
  getCanonicalPageId,
} from "notion-utils"
import { NotionAPI } from "notion-client"
import { NotionRenderer, Collection, CollectionRow } from "react-notion-x"
import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"
import { getAllPages } from "lib/notion"
import { rootNotionPageId, homeId } from "config"

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV

const notion = new NotionAPI()

export const getStaticProps = async (context) => {
  try {
    const pageId = context.params.projectSlug
    const allPages = await getAllPages(notion)
    console.log(allPages)
    // const pageId = getCanonicalPageId(context.params.projectSlug, recordMap, {
    //   uuid: false,
    // })
    const recordMap = await notion.getPage(pageId)

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

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    }
  }

  const recordMap = await notion.getPage(rootNotionPageId)

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPages(notion)

  const paths = Object.keys(pages).map(
    (pageId) => `/${getCanonicalPageId(pageId, recordMap, { uuid: false })}`
  )

  return {
    paths,
    fallback: true,
  }
}

export default function Project({ recordMap }) {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log("title:", title)

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value
  const description = getPageProperty("Description", block, recordMap)
  console.log("description:", description)

  console.log(homeId)

  return (
    <>
      <Layout title={title}>
        <ProjectPage title={title} description={description}>
          <NotionRenderer
            recordMap={recordMap}
            fullPage={true}
            darkMode={false}
            rootPageId={homeId}
            components={{
              collection: Collection,
              collectionRow: CollectionRow,
            }}
          />
        </ProjectPage>
      </Layout>
    </>
  )
}
