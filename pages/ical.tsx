import EventsPreview from "@/components/ical/EventsPreview"
import HideShowEvents from "@/components/ical/HideShowEvents"
import Layout from "@/components/Layout"
import RuleEditor from "@/components/ical/RuleEditor"
import { proxiedUrl } from "lib/calendar"
import Head from "next/head"
import { useEffect, useState } from "react"

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
    >
      <Head>
        <link
          type="image/x-icon"
          rel="icon"
          href={`https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${new Date().getDate()}.ico`}
        ></link>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={`https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${new Date().getDate()}.ico`}
        />
      </Head>

      <div className="container mx-auto space-y-6 p-4">
        <header className="space-y-4">
          <h1 className="text-6xl font-bold">KTH calendar proxy</h1>
          <p>
            This service is a proxy for your KTH exported calendar that can hide
            or show certain events based on rules using regular expressions on
            the title, description, location or KTH event link/id.
          </p>
          <p>
            Get your export link on the{" "}
            <a
              href="https://www.kth.se/social/home/calendar/settings/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline focus:underline"
            >
              KTH calendar settings
            </a>{" "}
            page and paste it below.
          </p>
          <div className="flex flex-col">
            <label htmlFor="kthUrl">KTH exported calendar url:</label>
            <input
              className="form-input invalid:bg-pink-50"
              id="kthUrl"
              name="kthUrl"
              type="url"
              value={kthUrl || ""}
              onChange={(e) => {
                setKthUrl(e.target.value)
              }}
            />
          </div>
          {kthUrl && (
            <p>
              <a
                className="mb-2 inline-block rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-4 py-2 text-center text-sm text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                href={(kthUrl && proxiedUrl(kthUrl)) || "#"}
              >
                Download the ICS file
              </a>
              {" or "}
              <button
                className="mb-2 inline-block rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-4 py-2 text-center text-sm text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={() => {
                  const url = proxiedUrl(kthUrl)
                  url && navigator.clipboard.writeText(url)
                }}
              >
                Copy Google calendar link
              </button>
            </p>
          )}
        </header>

        {kthUrl && (
          <>
            <h2 className="text-3xl font-semibold">Filtered events preview</h2>
            <EventsPreview kthUrl={kthUrl} />

            <HideShowEvents kthUrl={kthUrl} />

            <section>
              <h2 className="mb-3 text-3xl font-semibold">Rules</h2>
              <RuleEditor kthUrl={kthUrl}></RuleEditor>
            </section>
          </>
        )}
      </div>
    </Layout>
  )
}
