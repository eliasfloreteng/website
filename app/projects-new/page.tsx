import { GRADIENTS } from "lib/gradients"
import ProjectCard from "./ProjectCard"
import { Project, fetchProjects } from "./lib"

export const revalidate = 10

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

      <div className="bg-white pt-8">
        <h2 className="mb-1 mt-6 text-3xl font-semibold text-slate-800">
          Featured projects
        </h2>
        <p className="py-2">
          Below are the most extensive projects I have worked on. Made for
          companies, associations and degree projects.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              href={`/projects-new/${project.slug}`}
              image={project.coverUrl || GRADIENTS[index]}
              number={index + 1}
            />
          ))}
        </div>

        <h2 className="mb-1 mt-6 text-3xl font-semibold text-slate-800">
          Other projects
        </h2>
        <p className="py-2">
          Some of my other side projects and smaller assignments are shown
          below.
        </p>

        <div className="grid grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              href={`/projects-new/${project.slug}`}
              image={project.coverUrl || GRADIENTS[index]}
              number={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
