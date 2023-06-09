"use client"

import useSWR from "swr"
import { useCalendar } from "./Context"
import { fetcher, getRelativeTime, proxiedUrl } from "./lib"

export default function LastUpdated() {
  const [kthUrl, setKthUrl] = useCalendar()

  const { data, error } = useSWR<{ lastUpdated: string | null }>(
    kthUrl ? `${proxiedUrl(kthUrl)}/last-updated` : null,
    fetcher,
    // Milliseconds between refreshes: 120_000 = 2 minutes
    { refreshInterval: 120_000 }
  )
  if (!data?.lastUpdated) {
    return null
  }
  if (error) {
    console.error(error)
    return null
  }
  const lastUpdated = new Date(data.lastUpdated)

  return lastUpdated ? (
    <div className="mt-4 flex items-center gap-4 rounded-lg border border-slate-500 bg-white p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 flex-shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>

      <div>
        Your Google Calendar data was last updated{" "}
        <span
          className="font-bold underline decoration-dotted"
          title={lastUpdated.toLocaleString()}
        >
          {getRelativeTime(lastUpdated)}
        </span>
        . Changes made after this time will take some time to be updated in
        Google Calendar. Be patient.
      </div>
    </div>
  ) : (
    <div className="mt-4 flex items-center gap-4 rounded-lg border border-slate-500 bg-amber-200 p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 flex-shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <div>
        Google Calendar is now fetching the new data (this can take up to a
        couple of days). When the data is fetched, it will be shown here.
      </div>
    </div>
  )
}
