import { Event } from "@/components/ical/EventCalendar"
import React, { RefObject, useEffect, useRef } from "react"

export default function EventCard({
  event,
  onClose,
  onHide,
}: {
  event: Event
  onClose: () => void
  onHide: (event: Event) => void
}) {
  const ref: RefObject<HTMLDivElement> = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [onClose])

  return (
    <div ref={ref} className="flex flex-col rounded-lg bg-white shadow">
      <div className="flex items-center justify-between rounded-t border-b p-5">
        <a
          className="flex-1 text-lg font-semibold text-slate-900 line-clamp-2"
          title={event.summary || ""}
          href={event.url || "#"}
          target="_blank"
          rel="noreferrer"
        >
          {event.summary}
        </a>

        <button
          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4">
        {RegExp(/^\s*\*\s*/).test(event.summary || "") && (
          <div className="text-sm">
            <span className="text-red-500">&#x2731;</span> This event is
            mandatory
          </div>
        )}

        <div className="grid grid-flow-col gap-2">
          <div className="flex items-center gap-1 sm:gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <div className="text-slate-600">Time:</div>
              {event.startDate.toLocaleTimeString("sv", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" to "}
              {event.endDate.toLocaleTimeString("sv", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {event.location && (
            <div className="flex items-center gap-1 sm:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <div className="text-slate-600">Location: </div>
                {(event.location || "").split(/,\s+/).map((part, idx) => (
                  <React.Fragment key={idx}>
                    {Boolean(idx) && ", "}
                    <a
                      key={part}
                      className="link"
                      href={`https://www.kth.se/search?entityFilter=kth-place&filterLabel=Lokaler&lang=sv&btnText=S%C3%B6k&q=${part}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {part}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {event.description && (
          <textarea
            className="form-textarea min-h-[4rem] w-full overscroll-y-contain rounded-md"
            rows={4}
            readOnly
            value={(event.description || "").trim()}
          />
        )}
      </div>

      <div className="flex items-center gap-6 border-t p-6">
        <button
          className="flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          title="No longer show this event"
          onClick={() => onHide(event)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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

        <button
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
