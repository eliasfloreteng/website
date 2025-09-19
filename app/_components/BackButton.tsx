"use client"

import { useRouter } from "next/navigation"

export default function BackButton({
  children,
  ...props
}: {
  children: React.ReactNode
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const router = useRouter()

  return (
    <button {...props} onClick={() => router.back()}>
      {children}
    </button>
  )
}
