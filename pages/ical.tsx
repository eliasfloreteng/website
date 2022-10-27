import EventCalendar from "@/components/ical/EventCalendar"
import HideShowEvents from "@/components/ical/HideShowEvents"
import ProxySetup from "@/components/ical/ProxySetup"
import RuleEditor from "@/components/ical/RuleEditor"
import Layout from "@/components/Layout"
import { useCalendarHits } from "lib/calendar"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Ical() {
  const router = useRouter()

  const [kthUrl, setKthUrl] = useState(null as string | null)
  useEffect(() => {
    setKthUrl(localStorage.getItem("kthUrl"))
  }, [])
  useEffect(() => {
    if (kthUrl) localStorage.setItem("kthUrl", kthUrl)
  }, [kthUrl])

  const { hitsLoaded, hits, latestHitRelative } = useCalendarHits(kthUrl)

  const tab = kthUrl ? router.query.tab || "calendar" : "setup"

  const hideNavAndFoot = Boolean(
    process.env.EXPORTING || router.query.pwa !== undefined
  )
  return (
    <Layout
      title="KTH calendar proxy"
      description="This service is a proxy for your KTH exported calendar that can hide
          or show certain events based on rules using regular expressions on the
          title, description, location or KTH event link/id."
      faviconHref={`https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${new Date().getDate()}.ico`}
      manifestHref="/ical/manifest.json"
      hideNavbar={hideNavAndFoot}
      hideFooter={hideNavAndFoot}
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

      <div className="container mx-auto p-4">
        <header>
          <h1 className="mb-4 text-3xl font-bold md:text-6xl">
            KTH calendar proxy
          </h1>
          {!process.env.EXPORTING && (
            <p className="mb-2">
              This service is a proxy for your KTH exported calendar that can
              hide or show certain events based on rules using regular
              expressions on the title, description, location or KTH event
              link/id.
            </p>
          )}
          {hitsLoaded && (
            <p className="mb-2">
              The proxy has been used {hits} times ({latestHitRelative}).
            </p>
          )}
        </header>
        <div className="mb-4 flex flex-wrap border-b border-gray-200 text-center font-medium text-gray-500">
          <Link
            href={{ query: { ...router.query, tab: "setup" } }}
            scroll={false}
            className={`inline-flex items-center gap-1.5 rounded-t-lg border-b-2 p-4 ${
              tab == "setup"
                ? "border-blue-600 text-blue-600"
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Setup
          </Link>

          {kthUrl && (
            <>
              <Link
                href={{
                  query: { ...router.query, tab: "calendar" },
                }}
                scroll={false}
                className={`inline-flex items-center gap-1.5 rounded-t-lg border-b-2 p-4 ${
                  tab == "calendar"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent hover:border-gray-300 hover:text-gray-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Calendar
              </Link>
              <Link
                href={{
                  query: {
                    ...router.query,
                    tab: "hideshowrules",
                  },
                }}
                scroll={false}
                className={`inline-flex items-center gap-1.5 rounded-t-lg border-b-2 p-4 ${
                  tab == "hideshowrules"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent hover:border-gray-300 hover:text-gray-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Hide/show rules
              </Link>
              <Link
                href={{
                  query: {
                    ...router.query,
                    tab: "regexrules",
                  },
                }}
                scroll={false}
                className={`inline-flex items-center gap-1.5 rounded-t-lg border-b-2 p-4 ${
                  tab == "regexrules"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent hover:border-gray-300 hover:text-gray-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Regex rules
              </Link>
            </>
          )}
        </div>

        <div className="space-y-12">
          {tab == "setup" && (
            <ProxySetup kthUrl={kthUrl} setKthUrl={setKthUrl} />
          )}
          {kthUrl && (
            <>
              {tab == "calendar" && (
                <section>
                  <EventCalendar kthUrl={kthUrl} />
                </section>
              )}
              {tab == "hideshowrules" && <HideShowEvents kthUrl={kthUrl} />}
              {tab == "regexrules" && (
                <section>
                  <h2 className="mb-3 text-3xl font-semibold">Rules</h2>
                  <RuleEditor kthUrl={kthUrl}></RuleEditor>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
