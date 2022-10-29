export default function Skeleton({
  title,
  width,
}: {
  title?: boolean
  width: string
}) {
  return (
    <span
      className={`inline-block h-[1em] animate-pulse ${title ? "pb-3" : ""}`}
      style={{ width }}
    >
      <div className="h-full w-full rounded-2xl bg-stone-300/70"></div>
    </span>
  )
}
