import { uuidToId, getAllPagesInSpace, getCanonicalPageId } from "notion-utils"
import { rootNotionPageId, rootNotionSpaceId } from "config"

export const getAllPages = async (notion, { traverseCollections = false }) => {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections,
    }
  )
  const canonicalPageMap = Object.keys(pageMap).reduce((map, pageId) => {
    const recordMap = pageMap[pageId]
    if (!recordMap) {
      throw new Error(`Error loading page "${pageId}"`)
    }

    const canonicalPageId = getCanonicalPageId(pageId, recordMap, {
      uuid: false, // wether to include uuid after slug
    })

    if (map[canonicalPageId]) {
      console.error(
        "error duplicate canonical page id",
        canonicalPageId,
        pageId,
        map[canonicalPageId]
      )

      return map
    } else {
      return {
        ...map,
        [canonicalPageId]: pageId,
      }
    }
  }, {})

  return canonicalPageMap
}

export const createMapPageUrl =
  (recordMap, searchParams) =>
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

function createUrl(path, searchParams) {
  return [path, searchParams?.toString?.()].filter(Boolean).join("?")
}
