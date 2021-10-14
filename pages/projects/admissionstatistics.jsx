import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "Admission statistics for Swedish universities",
  description: (
    <>
      A simple website that shows detailed views of the admission statistics for different
      universities in Sweden. With graphing of historical admission stats and relevant tables.
    </>
  ),
  date: "2020-07-11T00:00:00",
  image: "https://i.imgur.com/2F97E36.png",
  buttons: { Website: "https://app.elias1233.se/admissionstats" },
}

export default function dinosaurgame() {
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
