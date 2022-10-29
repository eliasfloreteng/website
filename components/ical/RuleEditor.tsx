import { proxiedUrl, Rule } from "lib/calendar"
import SingleRule from "@/components/ical/SingleRule"
import useSWR, { mutate as globalMutate } from "swr"
import { fetcher } from "lib/util"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function RuleEditor({ kthUrl }: { kthUrl: string }) {
  const { data, error, mutate } = useSWR<Rule[]>(
    `${proxiedUrl(kthUrl)}/rules`,
    fetcher
  )
  const rules = data || []
  const loading = !error && !rules

  if (loading)
    return (
      <div
        style={{ height: 810 }}
        className="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-900/10 text-xl"
      >
        <LoadingSpinner className="-ml-1 mr-3 h-10 w-10" />
        Loading...
      </div>
    )
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
                await mutate(
                  fetcher(`${proxy}/rule`, {
                    method: "PUT",
                    body: JSON.stringify(newRule),
                  })
                )
                globalMutate(`${proxy}/preview`)
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
                await mutate(
                  fetcher(`${proxy}/rule/${rule.id}`, {
                    method: "DELETE",
                  })
                )
                globalMutate(`${proxy}/preview`)
              }
            }}
          ></SingleRule>
        ))}

        <button
          className="button-add"
          onClick={async () => {
            const newRule: Rule = {
              id: rules.length,
              title: "Title",
              enabled: true,
              combine: "OR",
              type: "hide",
              filters: [],
            }
            const newRules = [...rules, newRule]
            await mutate(newRules, false)
            const proxy = kthUrl && proxiedUrl(kthUrl)
            if (proxy) {
              await mutate(
                fetcher(`${proxy}/rule`, {
                  method: "POST",
                  body: JSON.stringify(newRule),
                })
              )
              globalMutate(`${proxy}/preview`)
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
