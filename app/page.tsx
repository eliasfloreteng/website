import Image from "next/image"
import Background from "./background.jpg"
import AccordImage from "./_images/accord.png"
import AccordLogo from "./_images/accordLogo.png"
import ReachingAppImage from "./_images/reachingapp.png"
import ReachingAppWebImage from "./_images/reachingappWeb.jpeg"
import ReachingAppLogo from "./_images/reachingappLogo.png"
import StarImage from "./_images/star.jpeg"
import StarLogo from "./_images/starLogo.png"
import MhmImage from "./_images/mhm.png"
import MhmLogo from "./_images/mhmLogo.png"
import QswapImage from "./_images/qswap.png"
import QswapLogo from "./_images/qswapLogo.png"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline"
import CatIcon from "./k0Hki.jpg/CatIcon"
import Link from "next/link"
import Socials from "./Socials"

const mobile_projects = [
  {
    id: "accord",
    title: "Accord",
    link: "https://accord-app.com",
    image: AccordImage,
    logo: AccordLogo,
  },
  {
    id: "reachingapp",
    title: "ReachingApp",
    link: "https://reachingapp.com",
    image: ReachingAppImage,
    logo: ReachingAppLogo,
  },
]

const web_projects = [
  {
    id: "mhm",
    title: "MHM Klätterförening",
    link: "https://mhmklatterforening.se",
    image: MhmImage,
    logo: MhmLogo,
  },
  {
    id: "star",
    title: "STAR Personalförening",
    link: "https://starstockholm.se",
    image: StarImage,
    logo: StarLogo,
  },
  {
    id: "qswap",
    title: "QSwap",
    link: "https://qswap.se",
    image: QswapImage,
    logo: QswapLogo,
  },
  {
    id: "reachingapp",
    title: "ReachingApp",
    link: "https://reachingapp.com",
    image: ReachingAppWebImage,
    logo: ReachingAppLogo,
  },
]

function PhoneFrame({
  imageUrl,
  altText,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  imageUrl: React.ComponentProps<typeof Image>["src"]
  altText?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-[3rem] border-4 border-gray-800 ${className}`}
      {...props}
    >
      <div className="relative h-[580px] w-[280px] border-[14px] border-gray-900 bg-gray-900">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gray-800">
          {/* Image */}
          <Image
            src={imageUrl}
            alt={altText ?? "Phone screen content"}
            className="h-full w-full object-cover object-center"
            width={280}
            height={580}
          />
        </div>
        {/* Notch */}
        <div className="absolute left-1/2 top-2 h-[25px] w-[80px] -translate-x-1/2 transform rounded-full bg-gray-900"></div>
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-1 w-[120px] -translate-x-1/2 transform rounded-full bg-gray-900 opacity-50"></div>
      </div>
    </div>
  )
}

function MobileScreens() {
  return (
    <div className="relative flex w-full items-center justify-center bg-gray-950 p-8">
      {/* Fixed gradient overlay */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-1/3 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent" />

      <div className="flex space-x-6 overflow-x-auto pb-8">
        {mobile_projects.map((phone) => (
          <a
            className="block flex-none"
            key={phone.id}
            href={phone.link}
            target="_blank"
          >
            <PhoneFrame imageUrl={phone.image} altText={phone.title} />

            <div className="mt-4 flex items-center justify-center gap-4">
              <Image
                src={phone.logo}
                alt={phone.title}
                className="h-8 w-auto"
              />
              <p className="text-center text-gray-400">{phone.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function DesktopFrame({
  imageUrl,
  altText,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  imageUrl: React.ComponentProps<typeof Image>["src"]
  altText?: string
}) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`} {...props}>
      <div className="overflow-hidden rounded-[3rem] border-4 border-gray-800">
        <div className="h-[360px] w-[576px] border-[14px] border-gray-900 bg-gray-900">
          {/* Screen */}
          <div className="h-full w-full overflow-hidden rounded-[2rem] bg-gray-800">
            {/* Image */}
            <Image
              src={imageUrl}
              alt={altText ?? "Desktop screen content"}
              className="h-full w-full object-cover object-top"
              width={576}
              height={360}
            />
          </div>
        </div>
      </div>
      <div className="-mt-1 h-[24px] w-[calc(576px+32px)] rounded-b-[3rem] rounded-t-md border-2 border-gray-800 bg-gray-900" />
    </div>
  )
}

function WebScreens() {
  return (
    <div className="relative flex w-full items-center justify-center bg-gray-950 p-8">
      {/* Fixed gradient overlay */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-1/3 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent" />

      <div className="flex space-x-6 overflow-x-auto pb-8">
        {web_projects.map((phone) => (
          <a
            className="block flex-none"
            key={phone.id}
            href={phone.link}
            target="_blank"
          >
            <DesktopFrame imageUrl={phone.image} altText={phone.title} />

            <div className="mt-4 flex items-center justify-center gap-4">
              <Image
                src={phone.logo}
                alt={phone.title}
                className="h-8 w-auto"
              />
              <p className="text-center text-gray-400">{phone.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <main>
        <section id="home" className="relative h-screen">
          {/* Add Socials component */}
          <Socials className="absolute right-4 top-4 z-10 flex gap-4" />

          <Image
            src={Background}
            alt="Elias Floreteng on stage holding a microphone"
            className="h-full object-cover"
            placeholder="blur"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_100%)]" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-4 text-center">
            <h1 className="text-5xl font-bold uppercase md:text-8xl">
              Elias Floreteng
            </h1>
            <p className="font-soft text-lg md:text-3xl">
              CTO, Co-founder at Accord • MSc computer science student at KTH
            </p>
          </div>

          <a
            href="#mobile"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 transform"
          >
            <ChevronDoubleDownIcon className="h-8 w-8 animate-bounce text-white" />
          </a>
        </section>

        <section
          id="mobile"
          className="flex h-screen flex-col items-center justify-center border-t border-gray-900"
        >
          <div className="flex flex-col justify-center text-center">
            <h1 className="text-6xl font-bold uppercase">Mobile</h1>
            <p className="font-soft text-lg">React Native & NativeScript</p>
          </div>

          <MobileScreens />
        </section>

        <section
          id="web"
          className="flex h-screen flex-col items-center justify-center border-t border-gray-900"
        >
          <div className="flex flex-col justify-center text-center">
            <h1 className="text-6xl font-bold uppercase">Web</h1>
            <p className="font-soft text-lg">React, Next.js, Tailwind CSS</p>
          </div>

          <WebScreens />
        </section>

        <section
          id="software"
          className="flex h-screen flex-col items-center justify-center border-t border-gray-900"
        >
          <div className="flex flex-col justify-center text-center">
            <h1 className="text-6xl font-bold uppercase">Software</h1>
            <p className="font-soft text-lg">Node.js, Python, Rust</p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center space-y-4 border-t border-gray-900 py-16">
          <h2 className="text-2xl font-bold">Want to see more?</h2>
          <div className="flex space-x-6">
            <Link
              href="/projects"
              className="rounded-lg border border-gray-800 px-6 py-3 transition-colors hover:bg-gray-900"
            >
              View all projects
            </Link>
            <Link
              href="/experience"
              className="rounded-lg border border-gray-800 px-6 py-3 transition-colors hover:bg-gray-900"
            >
              Work experience
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center space-y-3 border-t border-gray-900 py-6">
        <Link
          className="flex items-center justify-center space-x-2"
          href="/k0Hki.jpg"
        >
          <CatIcon className="h-8 w-8" />
          <span>k0Hki.jpg</span>
        </Link>
      </footer>
    </>
  )
}
