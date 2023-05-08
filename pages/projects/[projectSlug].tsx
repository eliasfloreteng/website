import { GetServerSideProps } from "next"
import { getPageTitle, getPageProperty } from "notion-utils"
import { NotionAPI } from "notion-client"
import { NotionRenderer } from "react-notion-x"
import { createMapPageUrl, getAllPages } from "lib/notion"
import { homeId } from "../../config"
import { ExtendedRecordMap, PageBlock } from "notion-types"
import { Components, hashCode } from "lib/util"

import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"
import LoadingSpinner from "@/components/LoadingSpinner"
import Skeleton from "@/components/Skeleton"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { GRADIENTS } from "lib/gradients"

const notion = new NotionAPI()

export const getServerSideProps: GetServerSideProps = async (context) => {
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
      }
    } else {
      return {
        props: {},
      }
    }
  } catch (error) {
    console.error("COULD NOT RENDER STATIC PAGE (try re-running build):", error)
    return {
      notFound: true,
    }
  }
}

export default function Project({
  recordMap,
}: {
  recordMap?: ExtendedRecordMap
}) {
  const router = useRouter()
  const [slug, setSlug] = useState<string | null>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams ? searchParams.toString() : "")
    setSlug(url.split("?")[0].split("/").at(-1) || null)
  }, [pathname, searchParams])

  // loading state fallback
  if (!recordMap) {
    return (
      <Layout title="Project">
        <ProjectPage
          title={<Skeleton title width="4em" />}
          description={
            <>
              <Skeleton width="20%" /> <Skeleton width="15%" />{" "}
              <Skeleton width="10%" /> <Skeleton width="25%" />
            </>
          }
          image={slug ? GRADIENTS[hashCode(slug, GRADIENTS.length)] : undefined}
        >
          <LoadingSpinner className="mx-auto h-14 w-14 text-stone-400" />
        </ProjectPage>
      </Layout>
    )
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
