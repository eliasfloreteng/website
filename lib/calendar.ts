import useSWR from "swr"
import { fetcher, getRelativeTime, isDev } from "./util"

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
export function parseCalendarPath(rawUrl: string) {
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
export function proxiedUrl(rawUrl: string) {
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
