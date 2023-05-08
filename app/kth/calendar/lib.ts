import useSWR from "swr"
import { fetcher, getRelativeTime, isDev } from "lib/util"

/**
 * Get iso8601 week number from javascript Date
 *
 * Credit: https://github.com/jquery/jquery-ui/blob/cf938e286382cc8f6cb74b3c6f75275073672aeb/ui/widgets/datepicker.js#L1153-L1164
 * @param date input date to get week of
 */
export function weekNumber(date: string | number | Date) {
  let yearStart = new Date(date)
  yearStart.setDate(yearStart.getDate() + 4 - (yearStart.getDay() || 7))
  let time = yearStart.getTime()
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
  let firstOfWeek = new Date(inputDay)
  // this weeks monday
  firstOfWeek.setDate(firstOfWeek.getDate() - firstOfWeek.getDay() + 1)

  let weekdays = []
  for (let i = 0; i < 5; i++) {
    weekdays.push(new Date(firstOfWeek))
    firstOfWeek.setDate(firstOfWeek.getDate() + 1)
  }
  return weekdays
}

export interface Hits {
  hits: number
  latestHit: string | Date
  latestHitRelative?: string
}

export function useCalendarHits(
  kthUrl: string | null
): (Partial<Hits> & { hitsLoaded: false }) | (Hits & { hitsLoaded: true }) {
  const { data, error } = useSWR<Hits>(
    kthUrl ? `${proxiedUrl(kthUrl)}/hits` : null,
    fetcher,
    // Milliseconds between refreshes: 120_000 = 2 minutes
    { refreshInterval: 120_000 }
  )
  if (!data) {
    return { hitsLoaded: false }
  }
  const latestHit = new Date(data.latestHit)
  return {
    ...data,
    hitsLoaded: true,
    latestHit,
    latestHitRelative: getRelativeTime(latestHit),
  }
}

export function generateCalendarPath(user: number, icalendar: string) {
  return `social/user/${user}/icalendar/${icalendar}`
}
export function parseCalendarPath(rawUrl: string | null) {
  if (!rawUrl) return null
  try {
    const url = new URL(rawUrl)
    let res = RegExp(/social\/user\/(\d{6})\/icalendar\/([\da-f]{40})$/).exec(
      url.pathname
    )
    if (!res || !res[1] || !res[2]) return null
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

  // TODO: change while developing service worker
  if (isDev && false) {
    return `http://localhost:8787/${path}`
  } else {
    return `https://ical.elias1233.workers.dev/${path}`
  }
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
