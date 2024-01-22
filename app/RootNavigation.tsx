"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const ChevronRight = ({ strokeWidth = 1.5, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
)

export default function RootNavigation() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleNavigation =
    (href: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setLoading(true)
      router.prefetch(href)
      setTimeout(() => {
        router.push(href)
      }, 850)
    }

  return (
    <>
      <div className="absolute left-4 top-20 flex gap-4 text-white sm:left-6 md:left-auto md:right-8 md:top-6 md:gap-12">
        <button
          type="button"
          className="hover:text-shadow-grow group flex items-center gap-1 text-2xl drop-shadow-glow transition-[text-shadow] sm:gap-2"
          onMouseOver={() => {
            router.prefetch("/projects")
          }}
          onClick={handleNavigation("/projects")}
        >
          <ChevronRight className="inline-block h-6 w-6 transition-[stroke-width] group-hover:stroke-[4px]" />
          Projects
        </button>

        <button
          type="button"
          className="hover:text-shadow-grow group flex items-center gap-1 text-2xl drop-shadow-glow transition-[text-shadow] sm:gap-2"
          onMouseOver={() => {
            router.prefetch("/experience")
          }}
          onClick={handleNavigation("/experience")}
        >
          <ChevronRight className="inline-block h-6 w-6 transition-[stroke-width] group-hover:stroke-[4px]" />
          Experience
        </button>
      </div>

      {loading && (
        <>
          <div className="absolute inset-0 z-50 h-screen w-screen animate-wipe bg-slate-50" />
          <div className="absolute right-4 top-4 z-50">
            <svg
              className="h-8 w-8 animate-spin text-slate-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={3}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </>
      )}
    </>
  )
}
