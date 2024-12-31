import Image from "next/image"
import { type Project } from "../data/projects"
import { PhoneFrame } from "./frames/PhoneFrame"
import { DesktopFrame } from "./frames/DesktopFrame"

interface ProjectDisplayProps {
  projects: Project[]
  type: "mobile" | "web"
}

export function ProjectDisplay({ projects, type }: ProjectDisplayProps) {
  const Frame = type === "mobile" ? PhoneFrame : DesktopFrame

  return (
    <div className="relative flex w-full items-center justify-center bg-gray-950 p-8">
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-1/3 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent" />

      <div className="flex space-x-6 overflow-x-auto pb-8">
        {projects.map((project) => (
          <a
            className="block flex-none"
            key={project.id}
            href={project.link}
            target="_blank"
          >
            <Frame imageUrl={project.image} altText={project.title} />

            <div className="mt-4 flex items-center justify-center gap-4">
              <Image
                src={project.logo}
                alt={project.title}
                className="h-8 w-auto"
              />
              <p className="text-center text-gray-400">{project.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
