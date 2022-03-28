import { HideShowRule, proxiedUrl } from "lib/calendar"
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
  startDate: Date
  endDate: Date
}

// TODO: add modal with hide event button & more info

const colors = [
  "bg-slate-500",
  "bg-gray-500",
  "bg-zinc-500",
  "bg-neutral-500",
  "bg-stone-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
]
function colorFromCourseCode(courseCode: string) {
  var hash = 0
  if (courseCode.length === 0) return hash
  for (let i = 0; i < courseCode.length; i++) {
    let chr = courseCode.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return colors[Math.abs(hash % colors.length)]
}

export default function EventCalendar({ kthUrl }: { kthUrl: string }) {
  const { data, error, mutate } = useSWR<RawEvent[]>(
    `${proxiedUrl(kthUrl)}/preview`,
    fetcher
  )
  const [eventModal, setEventModal] = useState<Event | null>(null)

  const events: Event[] = (data || []).map((e) => ({
    ...e,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }))
  const loading = !error && !data

  if (loading)
    return (
      <div
        style={{ height: 651 }}
        className="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-900/10 text-xl"
      >
        <LoadingSpinner />
        Loading...
      </div>
    )
  if (error) {
    console.error(error, error.status, error.info)
    return <div>Error!</div>
  }

  let firstOfWeek = new Date()
  firstOfWeek.setDate(firstOfWeek.getDate() - firstOfWeek.getDay())
  let weekdays = []
  for (let i = 0; i < 5; i++) {
    firstOfWeek.setDate(firstOfWeek.getDate() + 1)
    weekdays.push(new Date(firstOfWeek))
  }

  // https://github.com/jquery/jquery-ui/blob/cf938e286382cc8f6cb74b3c6f75275073672aeb/ui/widgets/datepicker.js#L1153
  let yearStart = new Date()
  yearStart.setDate(yearStart.getDate() + 4 - (yearStart.getDay() || 7))
  let time = yearStart.getTime()
  yearStart.setMonth(0)
  yearStart.setDate(1)
  const weekNum =
    Math.floor(Math.round((time - yearStart.valueOf()) / 86400000) / 7) + 1

  const hourHeight = 48
  const startHour = 8

  return (
    <>
      <div className="w-full overflow-clip rounded-xl ring-1 ring-gray-900/5 md:rounded-lg">
        <div className="bg-neutral-100 px-6 py-5 text-xl font-semibold tracking-wide">
          Vecka {weekNum}
        </div>
        <div className="flex overflow-x-auto">
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
              let isToday = day.getDate() == new Date().getDate()

              return (
                <div key={day.toString()} className="min-w-[8rem]">
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

                        let courseCode =
                          event.summary?.match(/\((\w{2}\d{4})\)/i)?.[1]

                        return (
                          <button
                            key={JSON.stringify(event)}
                            className="absolute p-1 text-left"
                            style={{ top: fromTop * hourHeight }}
                            onClick={() => setEventModal(event)}
                          >
                            <div
                              className={`grid content-center rounded-xl px-4 text-sm text-white ${
                                courseCode
                                  ? colorFromCourseCode(courseCode)
                                  : "bg-fuchsia-400"
                              }`}
                              style={{
                                height:
                                  eventHeight * hourHeight -
                                  8 /* to remove padding */,
                              }}
                            >
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
        </div>
      </div>

      {eventModal && (
        <div className="fixed top-0 right-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/40 md:inset-0 md:h-full">
          <div className="h-full w-full max-w-2xl p-4 md:h-auto">
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
