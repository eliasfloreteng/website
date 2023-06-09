import React, { Fragment, RefObject, useEffect, useRef } from "react"

export interface RawEvent {
  summary: string | null
  description: string | null
  location: string | null
  startDate: string
  endDate: string
  hidden: boolean
  url: string | null
  courseCode: string | null
  mandatory: boolean
}

export type Event = Omit<RawEvent, "startDate" | "endDate"> & {
  startDate: Date
  endDate: Date
}

export default function CalendarEvent({
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
          className="line-clamp-2 flex-1 text-lg font-semibold text-slate-900"
          title={event.summary || ""}
          href={event.url || "#"}
          target="_blank"
          rel="noreferrer"
        >
          {event.summary?.replace(/^\* /, "")}
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
        {event.mandatory && (
          <div className="text-sm">
            <span className="text-red-500">&#x2731;</span> This event is
            mandatory
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <div className="flex flex-grow items-center gap-1 sm:gap-3">
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
            <div className="flex flex-grow items-center gap-1 sm:gap-3">
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

          {event.courseCode && (
            <div className="flex flex-grow items-center gap-1 sm:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>

              <div>
                <div className="text-slate-600">Course: </div>
                {new RegExp(/\w{2}\d{4}/).test(event.courseCode) ? (
                  <a
                    className="link"
                    href={`https://www.kth.se/social/course/${event.courseCode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {event.courseCode}
                  </a>
                ) : (
                  <span>{event.courseCode}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {event.description && (
          <textarea
            className="form-textarea min-h-[4rem] w-full overscroll-y-contain rounded-md"
            rows={4}
            readOnly
            value={event.description}
          />
        )}
      </div>

      <div className="flex items-center gap-6 border-t p-6">
        <button
          className="flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          title="No longer show this event"
          onClick={() => onHide(event)}
        >
          {event.hidden ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              Show this event
            </>
          ) : (
            <>
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
            </>
          )}
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
