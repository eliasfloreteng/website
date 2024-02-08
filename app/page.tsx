import Link from "next/link"
import Icosahedron from "./_icosahedron/Icosahedron"
import RootNavigation from "./RootNavigation"
import { metadata } from "./layout"
import Socials from "./Socials"

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

      <Socials className="absolute bottom-6 right-6 flex flex-row items-center space-x-4 sm:ml-0" />
    </main>
  )
}
