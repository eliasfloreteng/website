import { GRADIENTS } from "../gradients"
import ProjectCard from "./ProjectCard"
import { Project, fetchProjects } from "./lib"
import { Metadata } from "next"

export const revalidate = 10

export const metadata: Metadata = {
  title: "Projects",
}

const isFeatured = (project: Project) => project.featured

export default async function ProjectsPage() {
  const projects = await fetchProjects()

  const featuredProjects = projects.filter(isFeatured)
  const otherProjects = projects.filter((p) => !isFeatured(p))

  return (
    <section className="w-full">
      <div className="mx-auto h-48 max-w-6xl">
        <h1 className="py-20 text-center text-5xl font-bold md:text-left lg:text-9xl">
          Projects
          <span className="text-2xl text-slate-300 md:text-4xl lg:text-6xl">
            {" "}
            – a subset
          </span>
        </h1>
      </div>

      <div className="container mx-auto bg-white px-[calc(min(96px,8vw))] py-8 text-slate-800 2xl:max-w-[2048px]">
        <h2 className="mb-1 mt-6 text-3xl font-semibold text-slate-800">
          Featured projects
        </h2>
        <p className="py-2">
          Below are the most extensive projects I have worked on. Made for
          companies, associations and degree projects.
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-[6vmin] pt-4">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              href={`/projects/${project.slug}`}
              image={project.coverUrl || GRADIENTS[index]}
            />
          ))}
        </div>

        <hr className="my-10" />

        <h2 className="mb-1 text-3xl font-semibold text-slate-800">
          Other projects
        </h2>
        <p className="py-2">
          Some of my other side projects and smaller assignments are shown
          below.
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-[6vmin] pt-4">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              href={`/projects/${project.slug}`}
              image={project.coverUrl || GRADIENTS[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
