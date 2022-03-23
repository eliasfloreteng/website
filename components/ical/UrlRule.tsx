import { HideShowRule } from "lib/calendar"
import { LegacyRef, useEffect, useRef, useState } from "react"

export default function UrlRule({
  rule,
  updateRule,
  deleteRule,
}: {
  rule: HideShowRule
  updateRule: (newRule: HideShowRule) => void
  deleteRule: () => void
}) {
  const [url, setUrl] = useState(rule.url)

  return (
    <div className="flex justify-between divide-x divide-x-reverse divide-gray-500 bg-white">
      <input
        type="url"
        required
        className="form-input w-full invalid:bg-pink-50"
        placeholder="https://www.kth.se/social/..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onBlur={() => updateRule({ ...rule, url })}
      />

      <a
        href={url}
        className="grid place-items-center border-y border-gray-500 px-2"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>

      <button className="border-y border-gray-500 px-2" onClick={deleteRule}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}
