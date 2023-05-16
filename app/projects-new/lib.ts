import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { fetchPages } from "app/_notion/lib"

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  featured: boolean
  language: string[]
  coverUrl: string | null
  slug: string
  created: string | undefined
  link: string | null
}

export function pageToProject(project: PageObjectResponse): Project | null {
  const { Name, Tags, Description, Language, Created, Link } =
    project.properties

  const image = project.cover
  const coverUrl =
    image?.type === "external"
      ? image.external.url
      : image?.type === "file"
      ? image.file.url
      : null

  if (
    Name.type === "title" &&
    Tags.type === "multi_select" &&
    Description.type === "rich_text" &&
    Language.type === "multi_select" &&
    Created.type === "date" &&
    Link.type === "url"
  ) {
    return {
      id: project.id,
      title: Name.title.map((t) => t.plain_text).join(" "),
      description: Description.rich_text.map((t) => t.plain_text).join(" "),
      tags: Tags.multi_select.map((t) => t.name),
      featured: Tags.multi_select.map((t) => t.name).includes("Featured"),
      language: Language.multi_select.map((t) => t.name),
      coverUrl,
      slug: urlToSlug(project.url),
      created: Created.date?.start,
      link: Link.url,
    }
  }

  return null
}

// https://www.notion.so/StaffInMotion-app-b8af33025ad04a4382eeca505d505856 -> staffinmotion-app
export function urlToSlug(url: string) {
  const parts = url.split("/")
  const id = parts[parts.length - 1]
  return id.split("-").slice(0, -1).join("-").toLowerCase()
}

export async function fetchProjects() {
  const database_pages = await fetchPages(process.env.NOTION_PROJECTS_ID!)

  const project_pages = database_pages.results as PageObjectResponse[]
  const projects = project_pages
    .map((page) => pageToProject(page))
    .filter(Boolean) as Project[]

  return projects
}

export async function fetchProjectBySlug(slug: string) {
  const database_pages = await fetchPages(process.env.NOTION_PROJECTS_ID!)
  const project_pages = database_pages.results as PageObjectResponse[]

  for (const page of project_pages) {
    const project = pageToProject(page)
    if (project?.slug === slug) {
      return project
    }
  }
  return null
}
