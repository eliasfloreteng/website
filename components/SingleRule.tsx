import { Rule } from "lib/calendar"
import { useEffect, useState } from "react"

export default function SingleRule({
  rule,
  updateRule,
}: {
  rule: Rule
  updateRule: (newRule: Rule | null) => void
}) {
  const [title, setTitle] = useState(rule.title)

  return (
    <div className="rounded-xl border border-slate-400 px-3 py-4">
      <div className="flex justify-between gap-4">
        <input
          type="text"
          className="w-fit truncate bg-transparent text-lg"
          value={title}
          onChange={async (e) => {
            setTitle(e.target.value)
          }}
          onBlur={() => {
            updateRule({ ...rule, title })
          }}
        ></input>

        <div className="flex items-center gap-2">
          <button>
            Match{" "}
            <span className="underline">
              {rule.combine == "AND" ? "all" : "any"}
            </span>{" "}
            filter
            {rule.combine == "AND" ? "s" : ""}
          </button>

          <button
            className="relative w-10 select-none align-middle"
            onClick={() => {
              updateRule({ ...rule, enabled: !rule.enabled })
            }}
          >
            <div
              className={
                "absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white " +
                (rule.enabled ? "right-0 border-green-400" : "border-gray-300")
              }
            ></div>
            <label
              className={
                "block h-6 cursor-pointer overflow-hidden rounded-full " +
                (rule.enabled ? "bg-green-400" : "bg-gray-300")
              }
            ></label>
          </button>

          <button
            onClick={() => {
              updateRule(null)
            }}
          >
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
      </div>
      <div>
        <div className="text-slate-500">Filters:</div>
        <div>
          {rule.filters.map((filter) => (
            <div>{filter.regex}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
