import { fetchPageBlocks, notion } from "../_notion/lib"
import { NotionRenderer } from "@notion-render/client"
import "@notion-render/client/sass/theme.scss"

export interface NotionPageProps {
  pageId: string
}

export default async function NotionPage({ pageId }: NotionPageProps) {
  const blocks = await fetchPageBlocks(pageId)

  const renderer = new NotionRenderer({
    client: notion,
  })
  const html = await renderer.render(...blocks)

  return (
    <div
      className="notion-render prose prose-slate max-w-none prose-blockquote:font-normal prose-blockquote:not-italic"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}
