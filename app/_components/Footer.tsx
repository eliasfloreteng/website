import Link from "next/link"
import Image from "next/image"
import nextjs from "@/public/nextjs.ico"

export default function Footer() {
  return (
    <footer className="mx-auto mt-8 flex w-full max-w-6xl flex-col items-center justify-center space-y-3 border-t py-6">
      <div className="space-y-2 px-3">
        <div className="text-slate-500">
          Website from scratch by Elias Floreteng, using{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="link inline-flex items-baseline gap-1"
          >
            <Image src={nextjs} height={14} width={14} alt="next.js logo" />
            Next.js
          </a>
        </div>

        <div>
          <div className="text-lg font-semibold">Quick links:</div>
          <div>
            <div>
              <Link href="/ical" className="link">
                KTH icalendar proxy
              </Link>
            </div>
            <div>
              <Link href="/k0Hki.jpg" className="link">
                Cute cat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
