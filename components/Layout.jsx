import { useRouter } from "next/router"
import Head from "next/head"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Layout({ children, ...metaData }) {
  const router = useRouter()

  const meta = {
    title: "Elias",
    description: "",
    image: "",
    ...metaData,
  }

  const fromJSX = (elem) => {
    if (typeof elem == "string") {
      return elem
    } else if (typeof elem?.props?.children == "string") {
      return elem?.props?.children
    } else if (elem?.props?.children) {
      return elem?.props?.children.map((e) => fromJSX(e)).join(" ")
    } else {
      return ""
    }
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={fromJSX(meta.description)} name="description" />
        <meta
          property="og:url"
          content={`https://elias1233.se${router.asPath}`}
        />
        <link rel="canonical" href={`https://elias1233.se${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Elias" />
        <meta property="og:description" content={fromJSX(meta.description)} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={fromJSX(meta.description)} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main
          id="content"
          className="flex flex-col items-center justify-center w-full flex-1"
        >
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}
