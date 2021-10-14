/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout"
import ProjectPage from "@/components/ProjectPage"

export const meta = {
  title: "Web minigames",
  description: "Small hobby minigames made with javascript canvas and p5.js. Just for fun.",
  date: "2019-06-19T00:00:00",
  image: "https://i.imgur.com/fjCkglv.png",
  buttons: {
    "Color guess": "https://color-guess.glitch.me",
    "Color guess source code": "https://glitch.com/~color-guess",
    "Gravity simulation": "https://0csl4.csb.app/",
    "Gravity simulation source code": "https://codesandbox.io/s/gravity-simulator-0csl4",
    "Chrome dinosaur game": "https://editor.p5js.org/elias1233official/sketches/ZYE6yuzxK",
    "Breakout (not working)": "https://editor.p5js.org/elias1233official/sketches/a53Pw-Dg3",
  },
}

export default function minigames() {
  return (
    <Layout title={meta.title} description={meta.description} image={meta.image}>
      <ProjectPage className="prose max-w-none" {...meta}>
        <div>
          <a href="https://color-guess.glitch.me">
            <h2>Color guess</h2>
          </a>
          <a href="https://color-guess.glitch.me">
            <img src="https://i.imgur.com/fjCkglv.png" alt="" />
          </a>
          <small>Jun 19 2019</small>
          <p>A simple game where you guess the color on screen.</p>
          <a href="https://glitch.com/~color-guess">Source code</a>
        </div>

        <div>
          <a href="https://0csl4.csb.app/">
            <h2>Gravity simulation</h2>
          </a>
          <a href="https://0csl4.csb.app/">
            <img src="https://i.imgur.com/1lMNfrS.png" alt="" />
          </a>
          <small>Mar 31 2021</small>
          <p>En p5.js sketch som simulerar gravitation till ett statiskt objekt</p>
          <a href="https://codesandbox.io/s/gravity-simulator-0csl4">Source code</a>
        </div>

        <div>
          <a href="https://editor.p5js.org/elias1233official/sketches/ZYE6yuzxK">
            <h2>Chrome dinosaur game</h2>
          </a>
          <a href="https://editor.p5js.org/elias1233official/sketches/ZYE6yuzxK">
            <img
              src="https://tipsmake.com/data/thumbs/hack-the-dinosaur-game-of-google-chrome-to-make-your-trex-immortal-and-max-speed-thumb-4QovjTqzM.jpg"
              alt=""
            />
          </a>
          <small>Jun 19 2019</small>
        </div>

        <div>
          <a href="https://editor.p5js.org/elias1233official/sketches/a53Pw-Dg3">
            <h2>Breakout</h2>
          </a>
          <a href="https://editor.p5js.org/elias1233official/sketches/a53Pw-Dg3">
            <img src="https://i.imgur.com/HU1lvO0.png" alt="" />
          </a>
          <small>Jun 19 2019</small>
        </div>
      </ProjectPage>
    </Layout>
  )
}
