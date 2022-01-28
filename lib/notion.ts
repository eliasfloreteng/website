import { uuidToId, getAllPagesInSpace, getCanonicalPageId } from "notion-utils"
import { rootNotionPageId, rootNotionSpaceId } from "config"
import { NotionAPI } from "notion-client"
import { ExtendedRecordMap } from "notion-types"

export const getAllPages = async ({
  notion,
  options,
}: {
  notion: NotionAPI
  options?: { traverseCollections?: boolean }
}) => {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    options || {
      traverseCollections: false,
    }
  )
  const canonicalPageMap = Object.keys(pageMap).reduce(
    (map: { [key: string]: string }, pageId) => {
      const recordMap = pageMap[pageId]
      if (!recordMap) {
        throw new Error(`Error loading page "${pageId}"`)
      }

      const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
        uuid: false, // wether to include uuid after slug
      })

      if (canonicalPageId && !map[canonicalPageId]) {
        return {
          ...map,
          [canonicalPageId]: pageId,
        }
      } else {
        console.error(
          "error duplicate canonical page id",
          canonicalPageId,
          pageId,
          canonicalPageId && map[canonicalPageId]
        )
        return map
      }
    },
    {}
  )

  return canonicalPageMap
}

export const createMapPageUrl =
  (recordMap: ExtendedRecordMap, searchParams?: URLSearchParams) =>
  (pageId = "") => {
    if (uuidToId(pageId) === rootNotionPageId) {
      return createUrl("/projects", searchParams)
    } else {
      return createUrl(
        `/projects/${getCanonicalPageId(pageId, recordMap, { uuid: false })}`,
        searchParams
      )
    }
  }

function createUrl(path: string, searchParams?: { toString: () => any }) {
  return [path, searchParams?.toString?.()].filter(Boolean).join("?")
}
