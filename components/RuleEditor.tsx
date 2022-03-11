import { useCalendar, Rule, Filter, proxiedUrl } from "lib/calendar"
import produce from "immer"
import SingleRule from "@/components/SingleRule"

const RuleTag = (rule: Rule) => (
  <div className="py-2">
    <div className="flex items-baseline justify-between gap-2">
      <div className="text-lg font-semibold">{rule.title}</div>
      <div className="text-sm">{rule.enabled ? "enabled" : "disabled"}</div>
    </div>
    <div className="text-sm text-slate-600">Action:</div>
    <div className="leading-none">${rule.type}</div>
    {rule.filters.map((filter: Filter) => (
      <div>
        <div>{filter.property}</div>
        <input type="text" value="{filter.regex}" />
      </div>
    ))}
  </div>
)

export default function RuleEditor({ kthUrl }: { kthUrl: string | null }) {
  const { rules, loading, error, mutate } = useCalendar(kthUrl)

  if (loading) return <div>Loading...</div>
  if (error) {
    console.error(error)
    return <div>Error!</div>
  }

  async function updateRules(newRules: Rule[]) {
    await mutate(newRules, false)
    const proxy = kthUrl && proxiedUrl(kthUrl)
    if (proxy) {
      await fetch(`${proxy}/rules`, {
        method: "POST",
        body: JSON.stringify(newRules),
      })
      mutate()
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {!rules.length && <div>No rules configured</div>}

        {rules.filter(Boolean).map((rule, idx) => (
          <SingleRule
            rule={rule}
            key={idx + rule.title}
            updateRule={async (newRule) => {
              const producer = produce((data) => {
                if (newRule) {
                  data[idx] = newRule
                } else {
                  delete data[idx]
                }
              })
              mutate(producer, false)
              const proxy = kthUrl && proxiedUrl(kthUrl)
              if (proxy) {
                await fetch(`${proxy}/rules`, {
                  method: "POST",
                  body: JSON.stringify(producer(rules)),
                })
                mutate()
              }
            }}
          ></SingleRule>
        ))}

        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2 px-4 shadow-lg"
          onClick={async () => {
            const newRules: Rule[] = [
              ...rules,
              {
                title: "Title",
                enabled: true,
                combine: "AND",
                type: "hide",
                filters: [],
              },
            ]
            updateRules(newRules)
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
