import Layout from "@/components/Layout"

export default function Experience() {
  return (
    <Layout title="Experience" description="Software i know">
      <section className="w-full">
        <div className="mx-auto h-48 max-w-6xl">
          <h1 className="py-16 text-center text-5xl font-bold md:text-left lg:text-8xl">
            Software i know
          </h1>
        </div>

        <div className="bg-[#F1F1F1] px-3 sm:px-8">
          <div className="prose mx-auto max-w-6xl">
            <h2>My skills</h2>
            <h3>Programming languages</h3>
            <ul>
              <li>Python</li>
              <li>Rust</li>
              <li>JavaScript</li>
            </ul>

            <h3>Frameworks</h3>
            <ul>
              <li>Next.js</li>
              <li>React</li>
              <li>Vue</li>
              <li>Flask</li>
              <li>Express</li>
              <li>jQuery</li>
              <li>Vanilla JavaScript</li>
            </ul>

            <h3>Miscellaneous</h3>
            <ul>
              <li>Ubuntu, debian server programming</li>
              <li>Custom IOT server for Raspberry Pi</li>
            </ul>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-20 pb-40 md:grid-cols-2">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, harum!
            </div>
            <div>
              levels: ask me about anything, i can google it, hello world
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
