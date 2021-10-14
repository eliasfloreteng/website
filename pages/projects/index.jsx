/* eslint-disable @next/next/no-img-element */
import fs from "fs"
import Layout from "@/components/Layout"
import Link from "next/link"

export default function Projects({ projects }) {
  return (
    <Layout title="Projects" description="Projects made by Elias">
      <section className="w-full">
        <div className="max-w-6xl mx-auto h-48">
          <h1 className="text-5xl lg:text-9xl font-bold py-20 text-center md:text-left">
            Projects
            <span className="text-2xl md:text-4xl lg:text-6xl text-gray-300"> – a subset</span>
          </h1>
        </div>
        {/* Grid starts here */}
        <div className="bg-[#F1F1F1] px-3 sm:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 pb-40">
            {projects.map((proj, idx) => (
              <ProjectCard number={`${idx + 1}`} {...proj} key={idx} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

const ProjectCard = ({ pagename, title, image, number }) => (
  <Link href={`/projects/${pagename}`}>
    <a className="w-full grid shadow-2xl group overflow-hidden h-72">
      <div className="bg-black bg-opacity-10 row-start-1 col-start-1 z-10"></div>
      <div className="row-start-1 col-start-1 flex flex-col justify-between z-10">
        <h1 className="text-gray-50 font-bold text-xl max-w-max bg-red-500 rounded-md m-10 py-1 px-2">
          {title}
        </h1>
        <h1 className="text-gray-50 font-bold text-xl m-10">
          {number.length === 1 ? "0" + number : number}
        </h1>
      </div>
      <img
        src={image}
        alt="portfolio"
        className="row-start-1 col-start-1 h-full w-full transform group-hover:scale-125 transition-transform duration-[2000ms] ease-out object-cover"
      />
    </a>
  </Link>
)

export async function getStaticProps() {
  const projectfiles = fs.readdirSync("./pages/projects")
  const projectnames = projectfiles
    .filter((e) => !e.startsWith("index") && (e.endsWith("jsx") || e.endsWith("js")))
    .map((e) => e.replace(/\..+$/, ""))

  let pages = []
  projectnames.map(async (project) => {
    let proj = await import(`./${project}`)
    pages.push({ pagename: project, ...proj.meta })
  })

  return {
    props: {
      projects: pages,
    },
  }
}
