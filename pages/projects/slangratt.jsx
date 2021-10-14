import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "Waste sorting search engine",
  description: (
    <>
      A search engine for instructions on sorting and recycling waste. Enter a search term and the
      results show you how to recycle it. Also shows nearby sorting stations. Made during the
      gymansiearbete (high scool project/coursework).
    </>
  ),
  date: "2020-07-11T00:00:00",
  image: "https://i.imgur.com/pZjAYC6.png",
  buttons: {
    Website: "https://slangratt.floreteng.se/",
    "Source code": "https://github.com/elias123tre/slangratt",
    "Technical report":
      "https://docs.google.com/document/d/1FUPUYPag2lSc8CQyJ-629HQvtDQGA-oFk_H-iWgxYUQ/edit",
  },
}

export default function slangratt() {
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
