import { Metadata } from "next"
import HousingFilter from "./HousingFilter"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Housing Queue",
  description: "A page for filtering housing queue listings",
}

export default function HousingQueuePage() {
  return (
    <Suspense>
      <HousingFilter />
    </Suspense>
  )
}
