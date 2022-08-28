import { GetStaticProps, GetStaticPaths } from "next"
import { getPageTitle, getPageProperty } from "notion-utils"
import { NotionAPI } from "notion-client"
import { NotionRenderer } from "react-notion-x"
import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"
import { createMapPageUrl, getAllPages } from "lib/notion"
import { homeId } from "config"
import { ExtendedRecordMap, PageBlock } from "notion-types"
import { Components, isDev } from "lib/util"

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
        revalidate: 300,
      }
    } else {
      return {
        props: {},
        revalidate: 300,
      }
    }
  } catch (error) {
    console.error("COULD NOT RENDER STATIC PAGE (try re-running build):", error)
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    }
  }

  const alwaysGenerate = [
    "staffinmotion",
    "star-stockholm",
    "recycle-right",
    "always-bemanning",
  ]
  return {
    paths: alwaysGenerate.map((projectSlug) => ({
      params: { projectSlug },
    })),
    fallback: "blocking",
  }

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  const allPages = await getAllPages({
    notion,
    options: { traverseCollections: false, onlyFeatured: true }, // set to true to pre-generate all subpages
  })

  const paths = Object.keys(allPages)
    .filter((slug) => !["projects", "view-projects"].includes(slug))
    .map((projectSlug) => ({
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
  const image = (() => {
    const coverLink = (block as PageBlock).format?.page_cover
    if (!coverLink) return null
    const encoded = encodeURIComponent(coverLink)
    return `https://www.notion.so/image/${encoded}?table=block&id=${block.id}&cache=v2`
  })()

  // useful for debugging from the dev console
  if (typeof window !== "undefined") {
    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]]?.value
    const g = window as any
    g.recordMap = recordMap
    g.block = block
  }

  return (
    <>
      <Layout title={title}>
        <ProjectPage
          title={title}
          description={`${description}`}
          link={`${link}`}
          image={image}
        >
          <NotionRenderer
            recordMap={recordMap}
            mapPageUrl={createMapPageUrl(recordMap)}
            fullPage={false}
            darkMode={false}
            rootPageId={homeId}
            components={Components}
          />
        </ProjectPage>
      </Layout>
    </>
  )
}
