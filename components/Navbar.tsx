import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

export default function Navbar() {
  const router = useRouter()

  const ActiveLink = ({
    href,
    children,
  }: {
    href: string
    children?: ReactNode
  }) => (
    <Link href={href}>
      <a
        className={`${
          router.asPath.startsWith(href)
            ? "font-bold text-slate-800"
            : "text-slate-600"
        }`}
      >
        {children}
      </a>
    </Link>
  )

  return (
    <nav className="mx-auto w-full max-w-6xl px-4 py-10 md:py-20">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-col">
          <Link href="/">
            <a className="group">
              <h1 className="text-xl font-semibold">
                Elias
                <span className="text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                  1233
                </span>
              </h1>
              <p className="text-slate-500">
                Software developer styding at{" "}
                <abbr title="Royal Institute of Technology in Stockholm">
                  KTH
                </abbr>
              </p>
            </a>
          </Link>
        </div>

        <div className="order-last mt-4 w-full space-x-4 text-center md:order-none md:mt-0 md:w-auto md:space-x-8 md:text-left">
          <ActiveLink href="/about">About</ActiveLink>
          <ActiveLink href="/projects">Projects</ActiveLink>
          <ActiveLink href="/experience">Experience</ActiveLink>
          <ActiveLink href="/contact">Contact</ActiveLink>
        </div>

        <div className="flex flex-row items-center space-x-4">
          <a
            href="https://github.com/elias123tre"
            className="text-slate-600 dark:text-slate-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="2 2 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/eliasfloreteng/"
            className="text-slate-600 dark:text-slate-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
