import Layout from "@/components/Layout"

export default function Expereince() {
  return (
    <Layout title="Projects">
      <section className="w-full">
        <div className="max-w-6xl mx-auto h-48">
          <h1 className="text-5xl lg:text-9xl font-bold py-20 text-center md:text-left">
            Projects
            <span className="text-2xl md:text-4xl lg:text-6xl text-gray-300"> – a subset</span>
          </h1>
        </div>
        {/* Grid starts here */}
        <div className="bg-[#F1F1F1] px-3 sm:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 pb-40">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, harum!
          </div>
        </div>
      </section>
    </Layout>
  )
}
