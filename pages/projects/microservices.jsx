import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "Web microservices",
  description: "Some microservices for the web",
  date: "2020-07-11T00:00:00",
  image: "https://i.imgur.com/QtseZby.png",
  buttons: { Website: "https://elias123tre.github.io/voxelbase/" },
}

// [
//           "title" => "YouTube trend finder",
//           "description" => "En hemsida som hittar de mest visade videorna från en specifik YouTube kanal",
//           "date" => strtotime("May 29 2019"),
//           "image" => "https://i.imgur.com/6yNTJ4a.png",
//           "buttons" => [
//             "Se hemsidan" => "https://youtube-latest.glitch.me",
//             "Se källkoden" => "https://glitch.com/~youtube-latest"
//           ]
//         ],
//         [
//           "title" => "Adobe Downloader",
//           "description" => "En hemsida som hittar de mest visade videorna från en specifik YouTube kanal",
//           "date" => strtotime("May 1 2020"),
//           "image" => "https://i.imgur.com/QeZ6Hqi.png",
//           "buttons" => [
//             "Se hemsidan" => "https://adobe-download.glitch.me",
//             "Se källkoden" => "https://glitch.com/~adobe-download"
//           ]
//         ],

export default function microservices() {
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
