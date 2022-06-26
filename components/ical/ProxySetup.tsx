import kthLogo from "@/public/ical/kth.svg"
import { proxiedUrl, useCalendarHits } from "lib/calendar"
import Image from "@/components/Image"
import Link from "next/link"
import { SetStateAction } from "react"

export default function ProxySetup({
  kthUrl,
  setKthUrl,
}: {
  kthUrl: string | null
  setKthUrl: (value: SetStateAction<string | null>) => void
}) {
  const { hitsLoaded, hits, latestHit } = useCalendarHits(kthUrl)

  const steps = [
    {
      title: <>Get exported calendar url from KTH</>,
      text: (
        <>
          KTH has the ability to export your schedule as a icalendar file. It
          can be enabled and copied on the paged linked to below.
        </>
      ),
      action: (
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
      ),
    },
    {
      title: <>Enter KTH calendar url</>,
      text: (
        <>
          Enter the page received during the previous step here to get access to
          your personal rules that can be customized and saved next time you
          return.
        </>
      ),
      action: (
        <div className="flex flex-col gap-1">
          <label htmlFor="kthUrl">Exported calendar url:</label>
          <input
            className="form-input min-w-[25ch] max-w-md rounded-lg border border-gray-200 px-4 py-3 invalid:bg-rose-700/25"
            id="kthUrl"
            name="kthUrl"
            type="url"
            value={kthUrl || ""}
            onChange={(e) => {
              setKthUrl(e.target.value)
            }}
            onFocus={(e) => {
              e.currentTarget.select()
            }}
            placeholder="https://www.kth.se/social/user/.../icalendar/..."
          />
        </div>
      ),
    },
    {
      shielded: true,
      title: <>Configure filtering rules</>,
      text: (
        <>
          Change the filters and rules below to show or hide specific events
          based on regular exceptions, hide or show specific events and preview
          events during the coming week.
        </>
      ),
      action: (
        <Link href={{ query: { tab: "regexrules" } }}>
          <a className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>{" "}
            Edit rules
          </a>
        </Link>
      ),
    },
    {
      shielded: true,
      title: <>Add the proxied url to your calendar</>,
      text: (
        <>
          A updated calendar with your rules applied are available at the link
          below. It can be added to{" "}
          <a
            href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Google Calendar
          </a>{" "}
          for example just like the original KTH exported calendar.
        </>
      ),
      action: (
        <>
          {hitsLoaded && (
            <p className="mb-2 text-slate-900">
              The proxied url has been used{" "}
              <span className="font-semibold">{hits}</span> times. Last time was{" "}
              <span className="font-semibold">
                {latestHit.toLocaleString()}
              </span>
              .
            </p>
          )}

          <div className="flex min-w-[25ch] max-w-md select-all rounded-lg border border-gray-200 bg-white text-slate-900">
            <span className="cursor-text truncate py-3 pl-4">
              {proxiedUrl(kthUrl) || ""}
            </span>
            <button
              className="transition focus:animate-bounce-once"
              title="Copy link to clipboard"
              onClick={() => {
                const url = proxiedUrl(kthUrl)
                if (navigator) {
                  url && navigator.clipboard.writeText(url)
                }
                return true
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="my-3 ml-2 mr-4 h-5 w-5 text-indigo-500"
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
        </>
      ),
    },
  ]

  return (
    <ol className="relative border-l border-gray-200">
      {steps.map(({ title, text, action, shielded }, index) => {
        if (shielded && !kthUrl) {
          return
        }
        return (
          <li className="mb-10 ml-[1.5rem] sm:ml-8" key={index}>
            <span className="absolute flex aspect-square h-7 -translate-x-[calc(1.5rem+50%)] items-center justify-center rounded-full bg-white font-semibold sm:h-9">
              {index + 1}.
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mb-4 text-gray-500">{text}</p>
            {action}
          </li>
        )
      })}
    </ol>
  )
}
