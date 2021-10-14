/* eslint-disable @next/next/no-img-element */
// "title" => "Java Kalkylator",
//     "description" => "En kalkulator som evaluerar ett mattematiskt uttryck i textform",
//         "date" => strtotime("Apr 23 2020"),
//             "image" => "https://i.imgur.com/KgHXOJU.png",
//                 "buttons" => [
//                     "Ladda ner" => "https://drive.google.com/uc?export=download&id=1OeoP3MK75tyQO5XCX51gT2tcqihXB0TS",
//                     "Se källkoden" => "https://drive.google.com/file/d/1SWLHrefAbUATgTO7lrfneO8snk2YcC03"
//                 ]

import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "GUI programs (Java & .NET)",
  description: (
    <>Some GUI programs made with Java during a programming course and some personal projects.</>
  ),
  date: "2020-04-23T00:00:00",
  image: "https://i.imgur.com/KgHXOJU.png",
  buttons: { Website: "https://elias123tre.github.io/voxelbase/" },
}

export default function guiprograms() {
  return (
    <Layout {...meta}>
      <ProjectPage className="prose max-w-none" {...meta}>
        <div>
          <a href="https://drive.google.com/uc?export=download&id=1kDtaU9DQX1u1PUbGS0vCvWj0NrO-Z4BO">
            <h1>Java: Monty hall simulator</h1>
          </a>
          <a href="https://drive.google.com/uc?export=download&id=1kDtaU9DQX1u1PUbGS0vCvWj0NrO-Z4BO">
            <img src="https://i.imgur.com/jZXu4Cf.png?1" alt="" />
          </a>
          <small>Jan 30 2020</small>
          <p>
            Simulation of monty hall game:{" "}
            <a href="https://sv.wikipedia.org/wiki/Monty_Hall-problemet">
              https://sv.wikipedia.org/wiki/Monty_Hall-problemet
            </a>
          </p>
        </div>

        <div>
          <h1>Java: Calculator</h1>
          <img src="https://i.imgur.com/KgHXOJU.png" alt="" />
          <small>Apr 23 2020</small>
          <p>En kalkulator som evaluerar ett mattematiskt uttryck i textform</p>
        </div>

        <div>
          <a href="https://drive.google.com/uc?export=download&id=15UTn5H8ESYh8-Qn8SUq1x9fUBI4FcJBB">
            <h1>.NET: YouTube mp3 downloader</h1>
          </a>
          <a href="https://drive.google.com/uc?export=download&id=15UTn5H8ESYh8-Qn8SUq1x9fUBI4FcJBB">
            <img src="https://i.imgur.com/KgHXOJU.png" alt="" />
          </a>
          <small>Nov 15 2019</small>
          <p>Download youtube videos in mp3 format</p>
          <a href="https://drive.google.com/drive/folders/1pEo6bT_ZekyOoVeV2JFcdZiGcp0hQ-UT">
            Source code
          </a>
        </div>
      </ProjectPage>
    </Layout>
  )
}
