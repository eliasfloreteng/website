import { getWeekdays, HideShowRule, proxiedUrl, weekNumber } from "lib/calendar"
import { fetcher } from "lib/util"
import { useState } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import LoadingSpinner from "@/components/LoadingSpinner"
import EventCard from "./EventCard"

export interface RawEvent {
  summary: string | null
  description: string | null
  location: string | null
  startDate: string
  endDate: string
  url: string | null
}

export type Event = Omit<RawEvent, "startDate" | "endDate"> & {
  mandatory: boolean
  courseCode: string | null
  startDate: Date
  endDate: Date
}

let colors = [
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-stone-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-yellow-500",
  "bg-slate-500",
  "bg-lime-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-pink-500",
]
let courseColors: { [key: string]: string } = {}

/**
 * Assign each coursecode to a color in order from array `colors`
 * @param courseCode string of coursecode to be turned into color
 * @returns tailwind bg color class
 */
function colorFromCourseCode(courseCode: string) {
  const color = courseColors[courseCode]
  if (color) {
    return color
  }
  const newColor = colors.shift()
  if (!newColor) {
    return "bg-zinc-700"
  }
  courseColors[courseCode] = newColor
  return newColor
}

export default function EventCalendar({ kthUrl }: { kthUrl: string }) {
  const hourHeight = 48
  const startHour = 8

  const today = new Date()

  // if after friday 19:00
  if (
    (today.getDay() == 5 && today.getHours() >= 19) ||
    today.getDay() > 5 || // after friday
    today.getDay() < 1 // before monday
  ) {
    // skip to next week
    today.setDate(today.getDate() + 7)
  }
  const currentWeek = weekNumber(today)

  const [weekNum, _setWeekNum] = useState(currentWeek)
  type UseState<S> = (action: S | ((prevState: S) => S)) => void
  const setWeekNum: UseState<number> = (arg) => {
    const mod = (num: number, n: number) => ((num % n) + n) % n || 52
    if (typeof arg === "number") {
      _setWeekNum(mod(arg, 52))
    } else {
      _setWeekNum((week) => mod(arg(week), 52))
    }
  }

  // skip according to week offset
  today.setDate(today.getDate() + (weekNum - currentWeek) * 7)
  const weekdays = getWeekdays(today)

  const { data, error, mutate } = useSWR<RawEvent[]>(
    `${proxiedUrl(kthUrl)}/preview`,
    fetcher
  )

  const [eventModal, setEventModal] = useState<Event | null>(null)

  const events: Event[] = (data || []).map((e) => ({
    ...e,
    description: (e.description || "").trim().replace(/&amp;/g, "&") || null,
    mandatory: new RegExp(/^\s*\*\s*/).test(e.summary || ""),
    courseCode:
      e.summary
        // Extract course code from last occuring parenthesis
        ?.match(/\(((?:\w{2}\d{4})|(?:[\w\d]{2,}[ ,\wåäöÅÄÖ\d]*))\)/gi)
        ?.pop()
        ?.replace(/[\(\)]/g, "") || null,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }))

  if (error) {
    console.error(error, error.status, error.info)
    return <div>Error!</div>
  }

  return (
    <>
      <div className="w-full overflow-clip rounded-xl ring-1 ring-gray-900/5 md:rounded-lg">
        <div className="flex items-center justify-between gap-4 bg-neutral-100 px-6 py-5">
          <button
            className="text-xl font-semibold tracking-wide"
            title="Reset to current week"
            onClick={() => {
              setWeekNum(currentWeek)
            }}
          >
            Week {weekNum}
          </button>

          <div className="inline-flex -space-x-px">
            <button
              className="ml-0 block rounded-l-lg border border-gray-300 bg-white py-2 px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              onClick={() => setWeekNum((week) => week - 1)}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <input
              type="number"
              className="appearance-textfield box-content border border-gray-300 bg-white py-2 px-2 text-center font-semibold slashed-zero lining-nums tabular-nums leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-slate-900/25"
              value={weekNum}
              onInput={(event) =>
                setWeekNum(parseInt(event.currentTarget.value, 10))
              }
              size={1}
              min={1}
              max={53}
              maxLength={2}
            />

            <button
              className="block rounded-r-lg border border-gray-300 bg-white py-2 px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              onClick={() => setWeekNum((week) => week + 1)}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="relative flex overflow-x-auto">
          <div className="hidden w-0 overflow-clip border-t border-r text-right text-xs text-slate-400 md:block md:w-10">
            <div
              className="border-b-2 border-transparent"
              style={{ height: 62 }}
            ></div>
            <div className="pr-0.5" style={{ height: hourHeight * 2 }}>
              <div className="-translate-y-1/2">8:00</div>
            </div>
            <div className="pr-0.5" style={{ height: hourHeight * 2 }}>
              <div className="-translate-y-1/2">10:00</div>
            </div>
            <div className="pr-0.5" style={{ height: hourHeight }}>
              <div className="-translate-y-1/2">12:00</div>
            </div>
            <div className="pr-0.5" style={{ height: hourHeight * 2 }}>
              <div className="-translate-y-1/2">13:00</div>
            </div>
            <div className="pr-0.5" style={{ height: hourHeight * 2 }}>
              <div className="-translate-y-1/2">15:00</div>
            </div>
            <div className="pr-0.5" style={{ height: hourHeight * 2 }}>
              <div className="-translate-y-1/2">17:00</div>
            </div>
          </div>

          <div className="grid flex-auto grid-flow-col divide-x border-t">
            {weekdays.map((day) => {
              let weekday = day.toLocaleDateString("sv", {
                weekday: "short",
              })
              const today = new Date()
              let isToday =
                day.getDate() === today.getDate() &&
                day.getMonth() === today.getMonth() &&
                day.getFullYear() === today.getFullYear()

              return (
                <div key={day.toString()} className="min-w-[9rem]">
                  <div className="flex items-center justify-center gap-2 border-b-2 p-4 capitalize">
                    <span className="text-slate-600">{weekday}</span>
                    <span
                      className={`h-7 w-7 text-center font-semibold leading-7 ${
                        isToday ? "rounded-full bg-sky-500 text-slate-100" : ""
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="h-full w-full">
                      {/* Gridlines */}
                      <div
                        className="border-b"
                        style={{ height: hourHeight * 2 }}
                      />
                      <div
                        className="border-b"
                        style={{ height: hourHeight * 2 }}
                      />
                      <div
                        className="border-b"
                        style={{ height: hourHeight }}
                      />
                      <div
                        className="border-b"
                        style={{ height: hourHeight * 2 }}
                      />
                      <div
                        className="border-b"
                        style={{ height: hourHeight * 2 }}
                      />
                      <div style={{ height: hourHeight * 2 }} />
                    </div>

                    {events
                      .filter(
                        (event) =>
                          event.startDate.toLocaleDateString() ==
                          day.toLocaleDateString()
                      )
                      .map((event) => {
                        let fromTop =
                          event.startDate.getHours() -
                          startHour +
                          event.startDate.getMinutes() / 60

                        let eventHeight =
                          event.endDate.getHours() +
                          event.endDate.getMinutes() -
                          event.startDate.getHours() -
                          event.startDate.getMinutes()

                        return (
                          <button
                            key={JSON.stringify(event)}
                            className="absolute p-1 text-left"
                            style={{ top: fromTop * hourHeight }}
                            onClick={() => setEventModal(event)}
                          >
                            <div
                              className={
                                "grid content-center rounded-xl px-4 text-sm text-white " +
                                (event.courseCode
                                  ? colorFromCourseCode(event.courseCode)
                                  : "bg-gray-700")
                              }
                              style={{
                                height:
                                  eventHeight * hourHeight -
                                  8 /* to remove padding */,
                              }}
                            >
                              <div className="flex justify-between gap-1">
                                <div>
                                  {event.startDate.toLocaleTimeString("sv", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  &ndash;{" "}
                                  {event.endDate.toLocaleTimeString("sv", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                                {event.mandatory && (
                                  <div className="text-xs">&#x2731;</div>
                                )}
                              </div>

                              <div
                                className="font-medium line-clamp-2"
                                title={event.summary ?? undefined}
                              >
                                {event.summary?.replace(/^\*\s*/, "")}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="hidden w-0 border-t border-l md:block md:w-5"></div>
          {!data && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/10 text-xl text-white">
              <LoadingSpinner className="-ml-1 mr-3 h-10 w-10" />
              Loading...
            </div>
          )}
        </div>
      </div>

      {eventModal && (
        <div className="fixed top-0 right-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/40 md:inset-0 md:h-full">
          <div className="grid h-full w-full max-w-2xl place-items-center p-4 md:h-auto">
            <EventCard
              event={eventModal}
              onClose={() => setEventModal(null)}
              onHide={async (event) => {
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
                  setEventModal(null)
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
