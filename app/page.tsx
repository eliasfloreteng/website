import Image from "next/image"
import Background from "./background.jpg"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline"
import CatIcon from "./k0Hki.jpg/CatIcon"
import Link from "next/link"
import Socials from "./_components/Socials"
import { ProjectDisplay } from "./_components/ProjectDisplay"
import { ProjectSection } from "./_components/ProjectSection"
import {
  mobile_projects,
  software_projects,
  web_projects,
} from "./_data/projects"

export default function HomePage() {
  return (
    <>
      <main>
        <section id="home" className="relative h-screen">
          <Socials className="absolute right-4 top-4 z-10 flex gap-4" />

          <Image
            src={Background}
            alt="Elias Floreteng on stage holding a microphone"
            className="h-full object-cover"
            placeholder="blur"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_100%)]" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-4 text-center">
            <h1 className="text-5xl font-bold uppercase md:text-8xl">
              Elias Floreteng
            </h1>
            <p className="font-soft text-lg md:text-3xl">
              CTO, Co-founder at Accord • MSc computer science student at KTH
            </p>
          </div>

          <a
            href="#mobile"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 transform"
          >
            <ChevronDoubleDownIcon className="h-8 w-8 animate-bounce text-white" />
          </a>
        </section>

        <ProjectSection
          id="mobile"
          title="Mobile"
          subtitle="React Native & NativeScript"
        >
          <ProjectDisplay projects={mobile_projects} type="mobile" />
        </ProjectSection>

        <ProjectSection
          id="web"
          title="Web"
          subtitle="React, Next.js, Vue, WordPress"
        >
          <ProjectDisplay projects={web_projects} type="web" />
        </ProjectSection>

        <ProjectSection
          id="software"
          title="Software"
          subtitle="Node.js, Python, Rust"
        >
          <ProjectDisplay projects={software_projects} type="software" />
        </ProjectSection>

        <section className="flex flex-col items-center justify-center space-y-4 border-t border-gray-900 py-16">
          <h2 className="text-2xl font-bold">Want to see more?</h2>
          <div className="flex space-x-6">
            <Link
              href="https://eliasfloreteng.notion.site/View-projects-fd68966f87864c1e9eadea09c3d0e60c"
              target="_blank"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-100"
            >
              All projects
            </Link>
            <Link
              href="https://eliasfloreteng.notion.site/CV-Elias-Floreteng-155db39d4a314bc6800d094e23fb535d"
              target="_blank"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-100"
            >
              CV
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            For inquiries: elias (at) floreteng (dot) se
          </p>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center space-y-3 border-t border-gray-900 py-6">
        <Link
          className="flex items-center justify-center space-x-2"
          href="/k0Hki.jpg"
        >
          <CatIcon className="h-8 w-8" />
          <span>k0Hki.jpg</span>
        </Link>
      </footer>
    </>
  )
}
