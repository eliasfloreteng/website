"use client"

import Image from "next/image"

export default function AddButton() {
  const url = "https://www.kth.se/social/user/.../icalendar/..."

  return (
    <a
      href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl"
      target="_blank"
      rel="noreferrer"
      className="button whitespace-nowrap"
      onClick={() => navigator.clipboard.writeText(url)}
    >
      <span className="mr-2 h-4 w-4 flex-shrink-0">
        <Image
          src="https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_31.ico"
          width={32}
          height={32}
          alt="Google Calendar logotype"
        />
      </span>{" "}
      Add to Google Calendar
    </a>
  )
}
