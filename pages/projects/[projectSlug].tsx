import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next"
import { getPageTitle, getPageProperty, getCanonicalPageId } from "notion-utils"
import { NotionAPI } from "notion-client"
import { NotionRenderer, Collection, CollectionRow } from "react-notion-x"
import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"
import { createMapPageUrl, getAllPages } from "lib/notion"
import { rootNotionPageId, homeId } from "config"
import { ExtendedRecordMap, PageBlock } from "notion-types"

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV

const notion = new NotionAPI()

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const projectSlug = context?.params?.projectSlug
    if (projectSlug && !Array.isArray(projectSlug)) {
      const allPages = await getAllPages({ notion })
      const pageId = allPages[projectSlug]
      const recordMap = await notion.getPage(pageId)

      return {
        props: {
          recordMap,
        },
        revalidate: 10,
      }
    } else {
      return {
        props: {},
        revalidate: 10,
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

  const recordMap = await notion.getPage(rootNotionPageId)

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPages({
    notion,
    options: { traverseCollections: true },
  })

  const paths = Object.keys(pages).map(
    (pageId) => `/${getCanonicalPageId(pageId, recordMap, { uuid: false })}`
  )

  return {
    paths,
    fallback: true,
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
            fullPage={true}
            darkMode={false}
            rootPageId={homeId}
            components={{
              collection: Collection,
              collectionRow: CollectionRow,
            }}
            mapPageUrl={createMapPageUrl(recordMap)}
          />
        </ProjectPage>
      </Layout>
    </>
  )
}
