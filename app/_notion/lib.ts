import "server-only"

import { Client } from "@notionhq/client"
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const fetchPages = (database_id: string) =>
  notion.databases.query({
    database_id,
  })

export const fetchPageBlocks = (pageId: string) =>
  notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results as BlockObjectResponse[])
