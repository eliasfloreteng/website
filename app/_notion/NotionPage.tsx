import { fetchBlockChildren, notion } from "../_notion/lib"
import { NotionRenderer } from "@notion-render/client"
import "@notion-render/client/dist/theme.css"

export interface NotionPageProps {
  pageId: string
  className?: string
}

export default async function NotionPage({
  pageId,
  className,
}: NotionPageProps) {
  const blocks = await fetchBlockChildren(pageId)

  const renderer = new NotionRenderer({
    client: notion,
  })
  const html = await renderer.render(...blocks)

  return (
    <div
      className={
        "notion-render prose prose-slate prose-invert max-w-none prose-blockquote:font-normal prose-blockquote:not-italic " +
          className || ""
      }
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}
