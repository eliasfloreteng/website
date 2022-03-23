import { HideShowRule, proxiedUrl } from "lib/calendar"
import { fetcher } from "lib/util"
import useSWR, { mutate as globalMutate } from "swr"

interface RawEvent {
  summary: string | null
  description: string | null
  location: string | null
  startDate: string
  endDate: string
  url: string | null
}

type Event = Omit<RawEvent, "startDate" | "endDate"> & {
  startDate: Date
  endDate: Date
}

export default function EventsPreview({ kthUrl }: { kthUrl: string }) {
  const { data, error, mutate } = useSWR<RawEvent[]>(
    `${proxiedUrl(kthUrl)}/preview`,
    fetcher
  )

  const events = (data || []).map((e) => ({
    ...e,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }))
  const loading = !error && !data

  const SingleEvent = ({ event }: { event: Event }) => {
    const format = new Intl.DateTimeFormat("sv", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      weekday: "short",
    })

    const timeInterval =
      // @ts-ignore
      format?.formatRange?.(event.startDate, event.endDate) ??
      `${event.startDate.toLocaleString()} till ${event.endDate.toLocaleString()}`

    return (
      <div className="flex snap-start snap-always flex-col gap-2">
        <a
          className="text font-semibold line-clamp-2 hover:underline"
          title={event.summary || ""}
          href={event.url || "#"}
          target="_blank"
          rel="noreferrer"
        >
          {event.summary}
        </a>
        <div>{timeInterval}</div>
        <div className="flex flex-wrap gap-1">
          Location:
          {(event.location || "").split(/,\s+/).map((part) => (
            <a
              key={part}
              className="link"
              href={`https://www.kth.se/search?entityFilter=kth-place&filterLabel=Lokaler&lang=sv&btnText=S%C3%B6k&q=${part}`}
              target="_blank"
              rel="noreferrer"
            >
              {part}
            </a>
          ))}
        </div>
        <textarea
          className="form-textarea rounded-md"
          rows={4}
          readOnly
          value={(event.description || "").trim()}
        />
        <button
          className="addButton"
          title="Add event to hidden events"
          onClick={async () => {
            const newRule: HideShowRule = {
              id: -1,
              url: event.url || "",
              type: "hide",
            }
            const proxy = kthUrl && proxiedUrl(kthUrl)
            if (proxy) {
              await globalMutate(
                `${proxy}/hideshowrule`,
                fetcher(`${proxy}/hideshowrule`, {
                  method: "POST",
                  body: JSON.stringify(newRule),
                })
              )
              await globalMutate(`${proxy}/hideshowrules`)
              await mutate()
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
              clipRule="evenodd"
            />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
          Hide this event
        </button>
      </div>
    )
  }

  if (loading) return <div>Loading...</div>
  if (error) {
    console.error(error, error.status, error.info)
    return <div>Error!</div>
  }

  return (
    <div className="grid snap-x snap-mandatory auto-cols-auto grid-flow-col gap-6 overflow-x-scroll pb-5">
      {events.map((event) => (
        <SingleEvent key={event.url} event={event} />
      ))}
    </div>
  )
}
