import type { Metadata } from "next"
import "styles/global.css"
import { Merriweather, Montserrat } from "next/font/google"
import { type Viewport } from "next"
import NextTopLoader from "nextjs-toploader"
import { CalendarProvider } from "./calendar/Context"

export const viewport: Viewport = {
  themeColor: "#f8fafc",
}

if (!process.env.VERCEL_URL && process.env.NODE_ENV === "production") {
  console.warn(
    "The environment variable VERCEL_URL is not set and this is a production deployment. This is required for the metadata to work correctly."
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Elias Floreteng",
  description:
    "I have been programming for over 7 years and I am currently taking a Master's Degree in Computer Science at KTH Royal Institute of Technology in Stockholm. Parallel with this I co-founded and I am currently the CTO of the app Accord.",
  applicationName: "Elias Floreteng",
  appleWebApp: {
    title: "Elias Floreteng",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon/favicon-32x32.png",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Elias Floreteng",
    description: "Portfolio for Elias Floreteng",
    siteName: "Elias Floreteng",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elias Floreteng",
    description: "Portfolio for Elias Floreteng",
  },
  category: "technology",
  keywords: ["portfolio", "projects", "blog", "resume"],
  manifest: "/manifest.json",
}

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${merriweather.variable} h-full scroll-smooth antialiased`}
    >
      <body className="h-full">
        <NextTopLoader color="#38bdf8" />

        <CalendarProvider>{children}</CalendarProvider>
      </body>
    </html>
  )
}
