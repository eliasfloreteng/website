export const currentLang =
  typeof window !== "undefined"
    ? (navigator?.languages?.[0] ?? navigator?.language)
    : undefined

export const rtf = (() => {
  return new Intl.RelativeTimeFormat(currentLang ?? "sv-SE", {
    numeric: "auto",
  })
})()

// in milliseconds
const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
}

export function getRelativeTime(d1: Date, d2 = new Date()) {
  const elapsed = d1.getTime() - d2.getTime()
  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const [key, value] of Object.entries(units) as [
    keyof typeof units,
    number,
  ][])
    if (Math.abs(elapsed) > value || key == "second")
      return rtf.format(Math.round(elapsed / value), key)
}

export async function fetcher(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    // @ts-expect-error info is not defined in error type
    error.info = (await res.json()) as unknown
    // @ts-expect-error status is not defined in error type
    error.status = res.status
    throw error
  }

  return res.json() as unknown
}

/**
 * Get iso8601 week number from javascript Date
 *
 * Credit: https://github.com/jquery/jquery-ui/blob/cf938e286382cc8f6cb74b3c6f75275073672aeb/ui/widgets/datepicker.js#L1153-L1164
 * @param date input date to get week of
 */
export function weekNumber(date: string | number | Date) {
  const yearStart = new Date(date)
  yearStart.setDate(yearStart.getDate() + 4 - (yearStart.getDay() || 7))
  const time = yearStart.getTime()
  yearStart.setMonth(0)
  yearStart.setDate(1)
  return Math.floor(Math.round((time - yearStart.getTime()) / 86400000) / 7) + 1
}

/**
 * Get all weekdays of the same week as inputDay
 * @param inputDay
 * @returns array of dates (mon-fri)
 */
export function getWeekdays(inputDay: string | number | Date) {
  // start date
  const firstOfWeek = new Date(inputDay)
  // this weeks monday
  firstOfWeek.setDate(firstOfWeek.getDate() - firstOfWeek.getDay() + 1)

  const weekdays = []
  for (let i = 0; i < 5; i++) {
    weekdays.push(new Date(firstOfWeek))
    firstOfWeek.setDate(firstOfWeek.getDate() + 1)
  }
  return weekdays
}

export function generateCalendarPath(user: number, icalendar: string) {
  return `social/user/${user}/icalendar/${icalendar}`
}
export function parseCalendarPath(rawUrl: string | null) {
  if (!rawUrl) return null
  try {
    const url = new URL(rawUrl)
    const res = RegExp(/social\/user\/(\d{6})\/icalendar\/([\da-f]{40})$/).exec(
      url.pathname
    )
    if (!res?.[1] || !res[2]) return null
    return { user: parseInt(res[1], 10), icalendar: res[2] }
  } catch (error) {
    if (error instanceof TypeError) {
      return null
    } else {
      throw error
    }
  }
}

export function proxiedUrl(rawUrl: string | null) {
  const parsed = parseCalendarPath(rawUrl)
  if (!parsed) {
    return null
  }
  const { user, icalendar } = parsed
  const path = generateCalendarPath(user, icalendar)

  return `https://kth-calendar-proxy.elias1233.workers.dev/${path}`
}

export interface Rule {
  id: number
  title: string
  enabled: boolean
  type: "show" | "hide"
  filters: Filter[]
  combine: "AND" | "OR"
}

export interface Filter {
  property: "summary" | "description" | "date"
  regex: string
  negated: boolean
}

export interface HideShowRule {
  id: number
  url: string
  type: "hide" | "show"
}
