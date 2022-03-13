import { proxiedUrl, fetcher, Rule, parseCalendarPath } from "lib/calendar"
import SingleRule from "@/components/SingleRule"
import useSWR from "swr"

export default function RuleEditor({ kthUrl }: { kthUrl: string | null }) {
  const { user, icalendar } = (kthUrl && parseCalendarPath(kthUrl)) || {
    user: 0,
    icalendar: "0",
  }

  const { data, error, mutate } = useSWR<Rule[]>(
    `https://ical.elias1233.workers.dev/social/user/${user}/icalendar/${icalendar}/rules`,
    fetcher
  )
  const rules = data || []
  const loading = !error && !rules

  if (loading) return <div>Loading...</div>
  if (error) {
    console.error(error)
    return <div>Error!</div>
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {!rules.length && <div>No rules configured</div>}

        {rules.map((rule) => (
          <SingleRule
            rule={rule}
            key={rule.id}
            updateRule={async (newRule) => {
              const newRules: Rule[] = rules.map((e) =>
                e.id == newRule.id ? newRule : e
              )
              await mutate(newRules, false)
              const proxy = kthUrl && proxiedUrl(kthUrl)
              if (proxy) {
                mutate(
                  fetcher(`${proxy}/rule`, {
                    method: "PUT",
                    body: JSON.stringify(newRule),
                  })
                )
              }
            }}
            deleteRule={async () => {
              await mutate(
                rules
                  .filter((e) => e.id != rule.id)
                  // recalculate unique indexes (negative numbers)
                  .map((e, idx) => ({ ...e, id: -idx - 1 })),
                false
              )
              const proxy = kthUrl && proxiedUrl(kthUrl)
              if (proxy) {
                mutate(
                  fetcher(`${proxy}/rule`, {
                    method: "DELETE",
                    body: JSON.stringify(rule),
                  })
                )
              }
            }}
          ></SingleRule>
        ))}

        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2 px-4 shadow-lg"
          onClick={async () => {
            const newRule: Rule = {
              id: rules.length,
              title: "Title",
              enabled: true,
              combine: "AND",
              type: "hide",
              filters: [],
            }
            const newRules = [...rules, newRule]
            await mutate(newRules, false)
            const proxy = kthUrl && proxiedUrl(kthUrl)
            if (proxy) {
              mutate(
                fetcher(`${proxy}/rule`, {
                  method: "POST",
                  body: JSON.stringify(newRule),
                })
              )
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Add rule
        </button>
      </div>
    </div>
  )
}
