import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { NotionAPI } from "notion-client"
import { getPageTitle, getAllPagesInSpace, getBlockTitle } from "notion-utils"
import { ExtendedRecordMap } from "notion-types"
import { NotionRenderer, Collection, CollectionRow } from "react-notion-x"
import Head from "next/head"

const notion = new NotionAPI()

const getSlug = (id) => getPageInfo(id)?.title ?? "test"

export default function Project({ recordMap }) {
  const router = useRouter()
  const { projectSlug } = router.query

  if (!recordMap) {
    return null
  }

  const pageInfo = getPageInfo(recordMap)
  console.log(pageInfo)

  return (
    <>
      <Head>
        <title>{pageInfo.title}</title>
      </Head>

      <Layout>
        <NotionRenderer
          recordMap={recordMap}
          fullPage={true}
          darkMode={false}
          mapPageUrl={(path) => "/projects/" + getSlug(path)}
          components={{
            collection: Collection,
            collectionRow: CollectionRow,
          }}
        />
      </Layout>
    </>
  )
}

export const getStaticProps = async (context) => {
  const pageId = context.params.projectSlug
  const recordMap = await notion.getPage("7030c8cf489d423693398ba0724ac02d")

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  if (process.env.NODE_ENV !== "production") {
    return {
      paths: [],
      fallback: true,
    }
  }

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    "7030c8cf489d423693398ba0724ac02d", // rootNotionPageId
    "7030c8cf489d423693398ba0724ac02d", // rootNotionSpaceId
    notion.getPage.bind(notion),
    {
      traverseCollections: false,
    }
  )
  const paths = Object.keys(pages).map((pageId) => `/projects/${pageId}`)
  console.log(paths)

  return {
    paths,
    fallback: true,
  }
}

/**
 * @param recordMap {ExtendedRecordMap}
 */
function getPageInfo(recordMap) {
  const title = getPageTitle(recordMap)
  let description = ""
  let pageIcon = ""

  let isFirstPage = true
  for (const k in recordMap.block) {
    const v = recordMap.block[k]
    const block = v.value

    if (block?.type === "page" && isFirstPage) {
      isFirstPage = false

      // if (isEmoji(block?.format?.page_icon)) {
      //   pageIcon = block?.format?.page_icon
      // }
    }

    // if (isTextType(block)) {
    //   const blockTitle = getBlockTitle(block, recordMap)
    //   if (blockTitle) {
    //     description += blockTitle
    //     if (blockTitle[blockTitle.length - 1] !== ".") {
    //       description += "."
    //     }
    //     description += " "
    //   }
    // }
  }

  return {
    title,
    description,
    pageIcon,
    titleWithIcon: pageIcon ? `${pageIcon} ${title}` : title,
  }
}
