import EventsPreview from "@/components/ical/EventsPreview"
import HideShowEvents from "@/components/ical/HideShowEvents"
import Layout from "@/components/Layout"
import RuleEditor from "@/components/ical/RuleEditor"
import kthLogo from "@/public/ical/kth.svg"
import { proxiedUrl } from "lib/calendar"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import EventCalendar from "@/components/ical/EventCalendar"

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

          <ol className="relative border-l border-gray-200">
            <li className="mb-10 ml-8">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
                1.
              </span>
              <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900">
                Get exported calendar url from KTH
              </h3>
              <p className="mb-4 text-gray-500">
                KTH has the ability to export your schedule as a icalendar file.
                It can be enabled and copied on the paged linked to below.
              </p>
              <a
                href="https://www.kth.se/social/home/calendar/settings/"
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                <span className="mr-2 h-4 w-4">
                  <Image src={kthLogo} alt="KTH logotype" />
                </span>{" "}
                KTH calendar settings
              </a>
            </li>
            <li className="mb-10 ml-8">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
                2.
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                Enter KTH calendar url
              </h3>
              <p className="mb-2 text-gray-500">
                Enter the page received during the previous step here to get
                access to your personal rules that can be customized and saved
                next time you return.
              </p>
              <div className="flex flex-col gap-1">
                <label htmlFor="kthUrl">Exported calendar url:</label>
                <input
                  className="form-input w-fit max-w-full rounded-lg border border-gray-200 px-4 py-3 invalid:bg-rose-700/25"
                  id="kthUrl"
                  name="kthUrl"
                  type="url"
                  value={kthUrl || ""}
                  onChange={(e) => {
                    setKthUrl(e.target.value)
                  }}
                  size={(kthUrl || {}).length}
                  placeholder="https://www.kth.se/social/user/.../icalendar/..."
                />
              </div>
            </li>
            {kthUrl && (
              <>
                <li className="mb-10 ml-8">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
                    3.
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Configure filtering rules
                  </h3>
                  <p className="mb-2 text-gray-500">
                    Change the filters and rules below to show or hide specific
                    events based on regular exceptions, hide or show specific
                    events and preview events during the coming week.
                  </p>
                  <a href="#rules" className="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>{" "}
                    Edit rules below
                  </a>
                </li>
                <li className="mb-10 ml-8">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white font-semibold ring-8 ring-white">
                    4.
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    Add the proxied url to your calendar
                  </h3>
                  <p className="mb-2 text-gray-500">
                    A updated calendar with your rules applied are available at
                    the link below. It can be added to{" "}
                    <a
                      href="https://calendar.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      Google Calendar
                    </a>{" "}
                    for example just like the original KTH exported calendar.
                  </p>

                  <div className="inline-flex max-w-full select-all rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900">
                    <span className="truncate">{proxiedUrl(kthUrl) || ""}</span>
                    <button
                      title="Copy link to clipboard"
                      onClick={() => {
                        const url = proxiedUrl(kthUrl)
                        url && navigator.clipboard.writeText(url)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              </>
            )}
          </ol>
        </header>

        {kthUrl && (
          <div className="space-y-12">
            <section className="space-y-8">
              <EventCalendar kthUrl={kthUrl} />
              <EventsPreview kthUrl={kthUrl} />
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
