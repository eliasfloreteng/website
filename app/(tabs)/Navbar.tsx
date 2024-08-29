"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"
import Logo from "@/public/logo.svg"
import Image from "next/image"
import Socials from "app/Socials"

export default function Navbar() {
  const pathname = usePathname() || ""

  const ActiveLink = ({
    href,
    exact,
    children,
  }: {
    href: string
    exact?: boolean
    children?: ReactNode
  }) => {
    const isActive = exact ? pathname == href : pathname.startsWith(href)
    return (
      <Link
        href={href}
        className={`${
          isActive ? "font-bold text-slate-800" : "text-slate-600"
        }`}
      >
        {children}
      </Link>
    )
  }

  return (
    <header className="mx-auto w-full max-w-6xl px-4 py-10 md:py-20">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-col">
          <Link href="/" className="group flex items-center gap-4">
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={Logo}
              alt="Logotype for Elias Floreteng"
              className="transition-transform group-hover:rotate-[30deg]"
              height={78}
              width={78}
            />
            <div>
              <h1 className="text-xl font-semibold">Elias Floreteng</h1>
              <p className="text-slate-500">
                Software developer styding at{" "}
                <abbr title="Royal Institute of Technology in Stockholm">
                  KTH
                </abbr>
              </p>
            </div>
          </Link>
        </div>

        <nav className="order-last mt-4 w-full space-x-4 text-center md:order-none md:mt-0 md:w-auto md:space-x-8 md:text-left">
          <ActiveLink href="/projects">Projects</ActiveLink>
          <ActiveLink href="/experience">Experience</ActiveLink>
        </nav>

        <Socials className="ml-auto flex flex-row items-center space-x-4 sm:ml-0" />
      </div>
    </header>
  )
}
