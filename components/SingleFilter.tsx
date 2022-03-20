import { Filter } from "lib/calendar"
import { useState } from "react"

export default function SingleFilter({
  filter,
  updateFilter,
  deleteFilter,
}: {
  filter: Filter
  updateFilter: (newFilter: Filter) => void
  deleteFilter: () => void
}) {
  const [regex, setRegex] = useState(filter.regex)

  return (
    <div className="flex flex-wrap items-center gap-4">
      <input
        type="text"
        required
        className="form-input truncate bg-transparent"
        title="Regex for when to match this filter"
        value={regex}
        onChange={(e) => {
          setRegex(e.target.value)
        }}
        onBlur={() => updateFilter({ ...filter, regex })}
      />

      <label className="flex items-center gap-1 text-sm text-slate-500">
        <span>Property:</span>
        <select
          className="form-select text-black"
          value={filter.property}
          onChange={(e) => {
            updateFilter({
              ...filter,
              property: e.target.value as Filter["property"],
            })
          }}
        >
          <option value="summary">Summary</option>
          <option value="description">Description</option>
          <option value="date">Date</option>
        </select>
      </label>

      <label className="flex items-center gap-1 text-sm text-slate-500">
        <span>Negated:</span>
        <input
          type="checkbox"
          className="form-checkbox"
          checked={filter.negated}
          onChange={() => {
            updateFilter({ ...filter, negated: !filter.negated })
          }}
        />
      </label>

      <button className="text-blue-700" onClick={deleteFilter}>
        - Remove filter
      </button>
    </div>
  )
}
