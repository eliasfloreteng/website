import Layout from "@/components/Layout"

export default function Experience() {
  return (
    <Layout title="Experience" description="Software i work with">
      <section className="w-full">
        <div className="mx-auto h-48 max-w-6xl">
          <h1 className="py-20 text-center text-5xl font-bold md:text-left lg:text-9xl">
            Experience
            <span className="text-2xl text-slate-300 md:text-4xl lg:text-5xl">
              {" "}
              – software i work with
            </span>
          </h1>
        </div>
        {/* Grid starts here */}
        <div className="bg-[#F1F1F1] px-3 sm:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-20 pb-40 md:grid-cols-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, harum!
          </div>
        </div>
      </section>
    </Layout>
  )
}
