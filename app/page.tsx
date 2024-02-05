import Link from "next/link"
import Icosahedron from "./_icosahedron/Icosahedron"
import RootNavigation from "./RootNavigation"
import { metadata } from "./layout"

export default function HomePage() {
  return (
    <main className="relative h-full w-full flex-1">
      <Icosahedron />

      <Link
        href="/"
        className="absolute left-4 top-6 text-4xl font-semibold text-white drop-shadow-glow sm:left-6"
      >
        Elias Floreteng
      </Link>

      <RootNavigation />

      <button
        className="peer absolute bottom-6 left-6 block text-white md:hidden"
        tabIndex={-1}
      >
        Who am i?
      </button>

      <div
        className="text-shadow-glow sm:text-shadow-dark absolute inset-x-0 top-1/2 w-full -translate-y-1/2 hyphens-auto px-6 text-justify text-sm font-medium text-black opacity-0 transition hover:drop-shadow-glow focus:opacity-100 peer-hover:opacity-100 peer-focus:opacity-100 sm:px-24 sm:hover:text-white md:bottom-6 md:left-6 md:top-auto md:w-3/4 md:translate-y-0 md:px-0 md:text-left md:text-gray-700 md:opacity-100 lg:w-1/3 xl:w-2/5"
        tabIndex={-1}
      >
        {metadata.description}
      </div>

      <div className="absolute bottom-6 right-6 flex flex-row items-center space-x-4 sm:ml-0">
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
    </main>
  )
}
