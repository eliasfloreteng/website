"use client"

import { useCalendar } from "./Context"

export default function Input() {
  const [kthUrl, setKthUrl] = useCalendar()

  return (
    <>
      <label htmlFor="kthUrl">Enter KTH calendar link.</label>
      <div className="mt-2">
        <input
          className="form-input w-[25ch] max-w-md rounded-lg border border-gray-200 px-4 py-3 invalid:bg-rose-700/25"
          id="kthUrl"
          name="kthUrl"
          type="url"
          value={kthUrl || ""}
          onChange={(e) => {
            setKthUrl(e.target.value)
          }}
          onFocus={(e) => {
            e.currentTarget.select()
          }}
          placeholder="https://www.kth.se/social/user/.../icalendar/..."
        />
      </div>
    </>
  )
}
