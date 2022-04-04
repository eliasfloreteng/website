export const isDev =
  process.env.NODE_ENV === "development" || !process.env.NODE_ENV

export const rtf = new Intl.RelativeTimeFormat(
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language,
  {
    numeric: "auto",
  }
)
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
    number
  ][])
    if (Math.abs(elapsed) > value || key == "second")
      return rtf.format(Math.round(elapsed / value), key)
}

export async function fetcher(url: any, ...args: any) {
  const res = await fetch(url, ...args)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    // @ts-ignore
    error.info = await res.json()
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return res.json()
}
