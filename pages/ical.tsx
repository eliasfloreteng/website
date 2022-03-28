import HideShowEvents from "@/components/ical/HideShowEvents"
import Layout from "@/components/Layout"
import RuleEditor from "@/components/ical/RuleEditor"
import Head from "next/head"
import { useEffect, useState } from "react"
import EventCalendar from "@/components/ical/EventCalendar"
import KTHProxyUrl from "@/components/ical/KTHProxyUrl"

export default function Ical() {
  const [kthUrl, setKthUrl] = useState(null as string | null)
  useEffect(() => {
    setKthUrl(localStorage.getItem("kthUrl"))
  }, [])
  useEffect(() => {
    if (kthUrl) localStorage.setItem("kthUrl", kthUrl)
  }, [kthUrl])

  return (
    <Layout
      title="KTH calendar proxy"
      description="This service is a proxy for your KTH exported calendar that can hide
          or show certain events based on rules using regular expressions on the
          title, description, location or KTH event link/id."
      faviconHref={`https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${new Date().getDate()}.ico`}
      manifestHref="/ical/manifest.json"
    >
      <Head>
        <meta name="apple-mobile-web-app-title" content="KTH calendar proxy" />
        <meta name="application-name" content="KTH calendar proxy" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/ical/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/ical/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/ical/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/ical/icons/safari-pinned-tab.svg"
          color="#68b4c9"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/ical/icons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="container mx-auto space-y-6 p-4">
        <header className="space-y-5">
          <h1 className="text-6xl font-bold">KTH calendar proxy</h1>
          <p>
            This service is a proxy for your KTH exported calendar that can hide
            or show certain events based on rules using regular expressions on
            the title, description, location or KTH event link/id.
          </p>

          <details open={!kthUrl}>
            <summary className="mb-5 cursor-pointer select-none text-2xl font-semibold text-slate-900">
              Get KTH calendar and proxied calendar
            </summary>

            <KTHProxyUrl kthUrl={kthUrl} setKthUrl={setKthUrl} />
          </details>
        </header>

        {kthUrl && (
          <div className="space-y-12">
            <section className="">
              <EventCalendar kthUrl={kthUrl} />
            </section>

            <HideShowEvents kthUrl={kthUrl} />

            <section>
              <h2 className="mb-3 text-3xl font-semibold">Rules</h2>
              <RuleEditor kthUrl={kthUrl}></RuleEditor>
            </section>
          </div>
        )}
      </div>
    </Layout>
  )
}
