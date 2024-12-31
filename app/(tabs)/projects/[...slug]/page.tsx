import { notFound } from "next/navigation"
import { fetchProjectBySlug } from "../lib"
import Image from "next/image"
import { type Metadata, type ResolvingMetadata } from "next"
import NotionPage from "app/_notion/NotionPage"
import Link from "next/link"
import { NOTION_COLORS } from "app/_notion/lib"
import DatabaseTable from "./DatabaseTable"

type Props = {
  params: { slug: string[] }
}

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = slug[0] && (await fetchProjectBySlug(slug[0]))
  if (!project) return notFound()

  const previousImages = (await parent).openGraph?.images ?? []

  return {
    title: `${project.title} – Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      publishedTime: project.created
        ? new Date(project.created).toISOString()
        : undefined,
      authors: ["Elias Floreteng"],
      images: project.coverUrl
        ? [project.coverUrl, ...previousImages]
        : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.coverUrl
        ? [project.coverUrl, ...previousImages]
        : previousImages,
    },
  }
}

export default async function ProjectPage({ params: { slug } }: Props) {
  const project = slug[0] && (await fetchProjectBySlug(slug[0]))
  if (!project) return notFound()

  return (
    <div className="w-full">
      {project.coverUrl && (
        <div className="relative">
          <Image
            src={project.coverUrl}
            width={2000}
            height={1000}
            unoptimized
            alt="Project cover image"
            className="h-96 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-25% opacity-30"></div>
        </div>
      )}

      <div className="container relative -top-6 mx-auto max-w-max rounded-lg bg-gray-950 px-6 pb-8 pt-12 shadow-md sm:px-12 md:pt-8 lg:max-w-6xl">
        <h1 className="py-5 text-left text-3xl font-bold text-white md:text-7xl">
          {project.title}
        </h1>

        <div>
          <span className="space-x-2">
            {project.tags
              .filter((tag) => !tag.name.toLowerCase().includes("featured"))
              .map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block rounded px-2 py-1 text-xs font-semibold text-slate-300"
                  style={{
                    backgroundColor: NOTION_COLORS[tag.color],
                  }}
                >
                  {tag.name}
                </span>
              ))}
          </span>

          <span className="mx-4 border-l border-slate-600"></span>

          <span className="space-x-2">
            {project.language.map((lang) => (
              <span
                key={lang.id}
                className="inline-block rounded px-2 py-1 text-xs font-semibold text-slate-300"
                style={{
                  backgroundColor: NOTION_COLORS[lang.color],
                }}
              >
                {lang.name}
              </span>
            ))}
          </span>

          {project.created && (
            <>
              <span className="mx-4 border-l border-slate-600"></span>

              <span className="text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline-block h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>{" "}
                Created {new Date(project.created).toLocaleDateString()}
              </span>
            </>
          )}
        </div>

        <p className="mt-5 text-slate-400">{project.description}</p>

        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            className="mt-5 inline-block rounded-md bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            View project ({new URL(project.link).hostname})
          </Link>
        )}

        <DatabaseTable pageId={project.id} slugs={slug} />

        <NotionPage
          className="mt-4 border-t pt-4 empty:mt-0 empty:border-t-0 empty:pt-0"
          pageId={project.id}
        />
      </div>
    </div>
  )
}
