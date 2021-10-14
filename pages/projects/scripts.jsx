import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "Useful scripts",
  description: "Some useful scripts. Made mostly with python.",
  date: "2020-07-11T00:00:00",
  image: "https://i.imgur.com/QtseZby.png",
  buttons: { Website: "https://elias123tre.github.io/voxelbase/" },
}

// [
//           "title" => "ProductOfFirstNPrimes",
//           "description" => "Ger produkten av de N första primtalen",
//           "date" => strtotime("Dec 14 2019"),
//           "image" => "https://i.imgur.com/2co6nnL.png",
//           "buttons" => [
//             "Se projektet" => "https://repl.it/@elias1233/ProductOfFirstNPrimes"
//           ]
//         ],
//         [
//           "title" => "Räkna vokaler",
//           "description" => "Ett python skript som räknar antal vokaler per rad",
//           "date" => strtotime("Feb 14 2020"),
//           "image" => "https://i.imgur.com/wPoAlA4.png",
//           "buttons" => [
//             "Se projektet" => "https://repl.it/@elias1233/Count-Syllables"
//           ]
//         ],
//         [
//           "title" => "Pythagoreisk trippel",
//           "description" => "Ett python skript som räknar ut <a href='https://sv.wikipedia.org/wiki/Pythagoreisk_trippel' target='_blank'>pythagoreiska tripplar </a>",
//           "date" => strtotime("Feb 13 2020"),
//           "image" => "https://i.imgur.com/iLjEOdV.png",
//           "buttons" => [
//             "Se projektet" => "https://repl.it/@elias1233/Euler-Problem-9-Pythagorian-triplet"
//           ]
//         ],
// [
//           "title" => "Node.js Lifx Timer",
//           "description" => "En server som kontrollerar en lifx lampa med en rörelsesensor kodad i Node.js",
//           "date" => strtotime("Aug 22 2019"),
//           "image" => "https://i.imgur.com/Zr7NWsF.png",
//           "buttons" => [
//             "Se källkoden" => "https://gist.github.com/elias123tre/940b0a441293c11052a8e8149da8c16d"
//           ]
//         ],
// [
//           "title" => "C++ Lifx Timer (Alpha-version)",
//           "description" => "En server som kontrollerar en lifx lampa med en rörelsesensor kodad i C++",
//           "date" => strtotime("Dec 26 2019"),
//           "image" => "https://i.imgur.com/w6ok3a5.png",
//           "buttons" => [
//             "Se källkoden" => "https://pastebin.com/raw/BPB5Bv9V"
//           ]
//         ],

// [
//           "title" => "Clean Temp Directory",
//           "description" => "Ett python skript som ränsar gamla filer i Temp mappen i Windows",
//           "date" => strtotime("May 7 2020"),
//           "image" => "https://i.imgur.com/KgHXOJU.png",
//           "buttons" => [
//             "Se källkoden" => "https://drive.google.com/file/d/1uFgok3I3y7JnmvU1A5OuEuXTza7cLMmQ"
//           ]
//         ],
//         [
//           "title" => "Search Lyrics",
//           "description" => "Ett python skript som letar efter låttexter från flera olika sidor samtidigt",
//           "date" => strtotime("May 15 2020"),
//           "image" => "https://i.imgur.com/KgHXOJU.png",
//           "buttons" => [
//             "Se källkoden" => "https://drive.google.com/file/d/1y3mDJhNqTqGl6RcahFrhGVbZ4M_CNg-E"
//           ]
//         ]

export default function scripts() {
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
