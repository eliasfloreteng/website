import { notFound } from "next/navigation"
import { fetchProjectBySlug } from "../lib"

export default async function ProjectPage({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const project = await fetchProjectBySlug(slug)
  if (!project) return notFound()

  return (
    <div>
      Project content
      <div className="prose">
        <pre>
          <code>{JSON.stringify(project, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}
