import { remark } from "remark"
import html from "remark-html"

export default async function Markdown({
  content,
  className,
  ...props
}: {
  content: string
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return (
    <div
      className={
        "prose prose-invert max-w-none" + (className ? ` ${className}` : "")
      }
      dangerouslySetInnerHTML={{ __html: contentHtml }}
      {...props}
    />
  )
}
