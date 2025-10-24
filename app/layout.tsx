import type { Metadata } from "next"
import "styles/global.css"
import { Merriweather, Montserrat, Quicksand } from "next/font/google"
import { type Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"

export const viewport: Viewport = {
  themeColor: "#f8fafc",
}

if (!process.env.VERCEL_URL && process.env.NODE_ENV === "production") {
  console.warn(
    "The environment variable VERCEL_URL is not set and this is a production deployment. This is required for the metadata to work correctly.",
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        `http://localhost:${process.env.PORT || 3000}`,
  ),
  title: "Elias Floreteng",
  description:
    "CTO, Co-founder at Accord • MSc computer science student at KTH",
  applicationName: "Elias Floreteng",
  appleWebApp: {
    title: "Elias Floreteng",
    statusBarStyle: "black-translucent",
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
}

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const quicksand = Quicksand({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
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
      className={`${montserrat.variable} ${quicksand.variable} ${merriweather.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-gray-950 text-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
