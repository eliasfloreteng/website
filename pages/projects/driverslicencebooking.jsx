import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "Driver licence booking watcher",
  description: (
    <>
      Find latest drivers license bookings with up to date information from Trafikverket.
      <br />
      <br />
      <span className="italic">The page is in swedish</span>
    </>
  ),
  date: "2020-06-23T00:00:00",
  image: "https://i.imgur.com/tdDTRT4.png",
  buttons: {
    Website: "https://app.elias1233.se/forarprov",
    "Source code": "https://drive.google.com/file/d/1-BXA0QFaCFklwQVNDnDQq7uYAzabqxmV",
  },
}

export default function driverslicencebooking() {
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
