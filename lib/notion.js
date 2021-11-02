import { uuidToId, getAllPagesInSpace, getCanonicalPageId } from "notion-utils"
import { rootNotionPageId, rootNotionSpaceId } from "config"

export const getAllPages = async (notion) => {
  return await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections: false,
    }
  )
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
