import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "VoxelBase",
  description: (
    <>
      A website made for a fictional company that archives data with glass platters. Made during a
      web development course.
    </>
  ),
  date: "2019-11-13T00:00:00",
  image: "https://i.imgur.com/QtseZby.png",
  buttons: { Website: "https://elias123tre.github.io/voxelbase/" },
}

export default function voxelbase() {
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
