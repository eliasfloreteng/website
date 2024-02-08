import type { Metadata } from "next"
import "styles/global.css"
import { Merriweather, Montserrat } from "next/font/google"
import { Viewport } from "next"
import NextTopLoader from "nextjs-toploader"
import { CalendarProvider } from "./(tabs)/calendar/Context"

export const viewport: Viewport = {
  themeColor: "#f8fafc",
}

export const metadata: Metadata = {
  title: "Elias Floreteng",
  description:
    "I am an enthusiastic software developer with a passion for creating high-quality, maintainable, and readable code. I am currently pursuing a Master's Degree in Computer Science at KTH Royal Institute of Technology in Stockholm, I bring with me over 6 years of prior programming experience and I am always eager to learn new new things.",
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
