import { GetStaticProps, GetStaticPaths } from "next"
import { getPageTitle, getPageProperty } from "notion-utils"
import { NotionAPI } from "notion-client"
import { NotionRenderer, Collection, CollectionRow } from "react-notion-x"
import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"
import { createMapPageUrl, getAllPages } from "lib/notion"
import { homeId } from "config"
import { ExtendedRecordMap, PageBlock } from "notion-types"

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const projectSlug = context?.params?.projectSlug
    if (projectSlug && !Array.isArray(projectSlug)) {
      const allPages = await getAllPages({ notion })
      const pageId = allPages[projectSlug]
      if (!pageId) {
        throw new Error(`Page id undefined for slug: ${projectSlug}`)
      }
      const recordMap = await notion.getPage(pageId)

      return {
        props: {
          recordMap,
        },
        revalidate: isDev ? 10 : 300,
      }
    } else {
      return {
        props: {},
        revalidate: isDev ? 10 : 300,
      }
    }
  } catch (err) {
    console.error("page error", err)
    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    }
  }
  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const allPages = await getAllPages({
    notion,
    options: { traverseCollections: true },
  })

  const paths = Object.keys(allPages).map((projectSlug) => ({
    params: { projectSlug },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export default function Project({
  recordMap,
}: {
  recordMap?: ExtendedRecordMap
}) {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value
  const description = getPageProperty("Description", block, recordMap)
  const link = getPageProperty("Link", block, recordMap)
  const image = (block as PageBlock).format?.page_cover

  return (
    <>
      <Layout title={title}>
        <ProjectPage
          title={title}
          description={description}
          link={link}
          image={image}
        >
          <NotionRenderer
            recordMap={recordMap}
            mapPageUrl={createMapPageUrl(recordMap)}
            fullPage={false}
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
