import { useRouter } from "next/router"
import Head from "next/head"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ReactNode } from "react"

export default function Layout({
  title,
  description,
  image,
  date,
  children,
}: {
  title: string
  description?: string
  image?: string
  date?: string
  children?: ReactNode
}) {
  const router = useRouter()

  const fromJSX = (elem: any /* ReactNode */) => {
    if (typeof elem == "string") {
      return elem
    } else if (typeof elem?.props?.children == "string") {
      return elem?.props?.children
    } else if (elem?.props?.children) {
      return elem?.props?.children.map((e: any) => fromJSX(e)).join(" ")
    } else {
      return ""
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={fromJSX(description)} name="description" />
        <meta
          property="og:url"
          content={`https://elias1233.se${router.asPath}`}
        />
        <link rel="canonical" href={`https://elias1233.se${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="elias1233" />
        <meta property="og:description" content={fromJSX(description)} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={fromJSX(description)} />
        <meta name="twitter:image" content={image} />
        {date && <meta property="article:published_time" content={date} />}
      </Head>

      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />

        <main
          id="content"
          className="flex w-full flex-1 flex-col items-center justify-center"
        >
          {children}
        </main>

        <Footer />
      </div>
    </>
  )
}
