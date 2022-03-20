import UrlRule from "@/components/UrlRule"
import { proxiedUrl, HideShowRule } from "lib/calendar"
import { fetcher } from "lib/util"
import useSWR from "swr"

const AddIcon = () => (
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
)

export default function HideShowEvents({ kthUrl }: { kthUrl: string }) {
  const { data, error, mutate } = useSWR<HideShowRule[]>(
    `${proxiedUrl(kthUrl)}/hideshowrules`,
    fetcher
  )

  const rules = data || []
  const loading = !error && !rules

  const addRule = async (type: "show" | "hide") => {
    const newRule: HideShowRule = {
      id: rules.length,
      url: "",
      type,
    }
    const newRules = [...rules, newRule]
    await mutate(newRules, false)
    const proxy = kthUrl && proxiedUrl(kthUrl)
    if (proxy) {
      mutate(
        fetcher(`${proxy}/hideshowrule`, {
          method: "POST",
          body: JSON.stringify(newRule),
        })
      )
    }
  }

  const updateRule = async (newRule: HideShowRule) => {
    const newRules: HideShowRule[] = rules.map((e) =>
      e.id == newRule.id ? newRule : e
    )
    await mutate(newRules, false)
    const proxy = kthUrl && proxiedUrl(kthUrl)
    if (proxy) {
      mutate(
        fetcher(`${proxy}/hideshowrule`, {
          method: "PUT",
          body: JSON.stringify(newRule),
        })
      )
    }
  }

  const deleteRule = async (rule: HideShowRule) => {
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
        fetcher(`${proxy}/hideshowrule/${rule.id}`, {
          method: "DELETE",
        })
      )
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) {
    console.error(error, error.status, error.info)
    return <div>Error!</div>
  }

  return (
    <section className="flex divide-x">
      <div className="flex-1 pr-4">
        <h2 className="mb-3 text-3xl font-semibold">Hidden events</h2>

        <div className="flex flex-col gap-2">
          {rules
            .filter((rule) => rule.type == "hide")
            .map((rule) => (
              <UrlRule
                key={rule.id}
                rule={rule}
                updateRule={updateRule}
                deleteRule={() => deleteRule(rule)}
              ></UrlRule>
            ))}

          <button
            className="mx-auto flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2 px-4 shadow-lg"
            onClick={() => addRule("hide")}
          >
            <AddIcon />
            Add hidden event
          </button>
        </div>
      </div>

      <div className="flex-1 pl-4">
        <h2 className="mb-3 text-3xl font-semibold">Shown events</h2>

        <div className="flex flex-col gap-2">
          {rules
            .filter((rule) => rule.type == "show")
            .map((rule) => (
              <UrlRule
                key={rule.id}
                rule={rule}
                updateRule={updateRule}
                deleteRule={() => deleteRule(rule)}
              ></UrlRule>
            ))}

          <button
            className="mx-auto flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2 px-4 shadow-lg"
            onClick={() => addRule("show")}
          >
            <AddIcon />
            Add shown event
          </button>
        </div>
      </div>
    </section>
  )
}
