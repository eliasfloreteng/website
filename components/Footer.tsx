import Image from "next/image"
import vercelLogo from "../public/vercel.svg"

export default function Footer() {
  return (
    <footer className="flex h-24 w-full flex-wrap items-center justify-center border-t">
      <div>Developed by Elias Floreteng, with</div>

      <a
        href="https://vercel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2"
      >
        <Image src={vercelLogo} height={16} width={80} alt="Vercel Logo" />
      </a>
    </footer>
  )
}
