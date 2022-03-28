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

// TODO: add modal with hide event button & more info

export default function EventCalendar({ kthUrl }: { kthUrl: string }) {
  const { data, error, mutate } = useSWR<RawEvent[]>(
    `${proxiedUrl(kthUrl)}/preview`,
    fetcher
  )

  const events: Event[] = (data || []).map((e) => ({
    ...e,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }))
  const loading = !error && !data

  if (loading) return <div>Loading...</div>
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
  let weekNum =
    Math.floor(Math.round((time - yearStart.valueOf()) / 86400000) / 7) + 1

  return (
    <div className="w-full overflow-clip rounded-xl ring-1 ring-gray-900/5 md:rounded-lg">
      <div className="bg-neutral-100 px-6 py-5 text-xl font-semibold tracking-wide">
        Vecka {weekNum}
      </div>
      <div className="flex overflow-x-auto">
        <div className="border-y border-r md:w-6"></div>

        <div className="grid flex-auto grid-flow-col divide-x border-t">
          {weekdays.map((day) => {
            let weekday = day.toLocaleDateString("sv", {
              weekday: "short",
            })
            let isToday = day.getDate() == new Date().getDate()

            let hourHeight = 48
            let startHour = 8

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
                    <div className="border-b" style={{ height: hourHeight }} />
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
                        <div
                          key={JSON.stringify(event)}
                          className="absolute p-1"
                          style={{ top: fromTop * hourHeight }}
                        >
                          <div
                            className="grid content-center rounded-xl bg-fuchsia-400 px-4 text-sm text-white"
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
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-y border-l md:w-6"></div>
      </div>
    </div>
  )
}
