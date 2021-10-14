import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "Shortfilms showcase",
  description: (
    <>
      My first ever website. Made during a digital creation course, for showing off shortfilms made
      during the course.
      <br />
      <br />
      <span className="italic">
        The page is in swedish and most of the actual content is unavailable.
      </span>
    </>
  ),
  date: "2019-01-22T00:00:00",
  image: "https://i.imgur.com/LTb9I4k.png",
  buttons: {
    Website: "https://elias123tre.github.io/shortfilms-showcase/",
    "Source code": "https://github.com/elias123tre/shortfilms-showcase",
  },
}

export default function firstwebsite() {
  return (
    <Layout {...meta}>
      <ProjectPage className="prose max-w-none" {...meta}>
        <h1>Some title text</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, exercitationem!
          Reprehenderit quas, veniam quasi asperiores sequi quidem aliquam, vitae ab dolor doloribus
          nemo. Esse sit dolor error placeat. Inventore exercitationem repudiandae amet, expedita
          sequi dolor dolores. Commodi incidunt odio veritatis autem vitae quo, ut expedita ullam
          facilis sequi doloribus dolorem.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, exercitationem!
          Reprehenderit quas, veniam quasi asperiores sequi quidem aliquam, vitae ab dolor doloribus
          nemo. Esse sit dolor error placeat. Inventore exercitationem repudiandae amet, expedita
          sequi dolor dolores. Commodi incidunt odio veritatis autem vitae quo, ut expedita ullam
          facilis sequi doloribus dolorem.
        </p>
      </ProjectPage>
    </Layout>
  )
}
