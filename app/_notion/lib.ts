import "server-only"

import { Client } from "@notionhq/client"
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const fetchPages = (databaseId: string) =>
  notion.databases.query({
    database_id: databaseId,
  })

export const fetchBlockChildren = (pageId: string) =>
  notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[])

export const NOTION_COLORS = {
  blue: "rgba(0, 120, 223, 0.2)",
  orange: "rgba(245, 93, 0, 0.2)",
  green: "rgba(0, 135, 107, 0.2)",
  pink: "rgba(221, 0, 129, 0.2)",
  brown: "rgba(140, 46, 0, 0.2)",
  red: "rgba(255, 0, 26, 0.2)",
  yellow: "rgba(233, 168, 0, 0.2)",
  default: "rgba(206, 205, 202, 0.5)",
  purple: "rgba(103, 36, 222, 0.2)",
  gray: "rgba(155, 154, 151, 0.4)",
}
