import type { Metadata } from "next"
import Image from "next/image"
import kthLogo from "@/public/ical/kth.svg"
import { CalendarProvider } from "./Context"
import Input from "./Input"
import AddButton from "./AddButton"
import Calendar from "./Calendar"
import Script from "next/script"
import LastUpdated from "./LastUpdated"

export const metadata: Metadata = {
  title: "KTH calendar proxy",
  description:
    "This service is a proxy for your KTH exported calendar that can hide or show certain events based on rules using regular expressions on the title, description, location or KTH event link/id.",
  icons: {
    icon: `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_31.ico`,
    apple:
      "https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_31.ico",
  },
  manifest: "/ical/manifest.json",
}

export default function CalendarPage() {
  return (
    <>
      {/* Polyfill Intl.RelativeTimeFormat, its dependencies & `en`, `se` locale data */}
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en,Intl.RelativeTimeFormat.~locale.se" />

      <div className="container mx-auto p-4">
        <header>
          <h1 className="mb-4 text-3xl font-bold md:text-6xl">
            KTH calendar proxy
          </h1>
          <p className="mb-4">
            This service is a proxy for your KTH exported calendar that can hide
            or show certain events based on rules using regular expressions on
            the title, description, location or KTH event link/id.
          </p>

          <ol className="flex list-inside list-decimal flex-wrap gap-x-12 gap-y-6 marker:font-medium">
            <li>
              <span>Enable KTH calendar export and copy link.</span>

              <div className="mt-2">
                <a
                  href="https://www.kth.se/social/home/calendar/settings/"
                  target="_blank"
                  rel="noreferrer"
                  className="button whitespace-nowrap"
                >
                  <span className="mr-2 h-4 w-4 flex-shrink-0">
                    <Image src={kthLogo} alt="KTH logotype" />
                  </span>{" "}
                  KTH calendar settings
                </a>
              </div>
            </li>

            <li>
              <Input />
            </li>

            <li>
              <span>
                Add the proxied calendar (will be copied to clipboard).
              </span>

              <div className="mt-2">
                <AddButton />
              </div>
            </li>
          </ol>
        </header>

        <LastUpdated />

        <section className="mt-12">
          <Calendar />
        </section>
      </div>
    </>
  )
}
