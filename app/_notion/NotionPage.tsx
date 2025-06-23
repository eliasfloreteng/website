import { fetchBlockChildren, notion } from "../_notion/lib"
import { NotionRenderer } from "@notion-render/client"

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
        "prose prose-slate max-w-none prose-blockquote:font-normal prose-blockquote:not-italic " +
          className || ""
      }
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}
