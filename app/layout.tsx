import type { Metadata } from "next"
import "styles/global.css"
import { Merriweather, Montserrat } from "next/font/google"
import { Viewport } from "next"
import NextTopLoader from "nextjs-toploader"

export const viewport: Viewport = {
  themeColor: "#f8fafc",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://elias1233.se"),
  title: "Elias Floreteng",
  description: "Portfolio for Elias1233",
  applicationName: "Elias1233",
  appleWebApp: {
    title: "Elias1233",
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
    url: "https://elias1233.se",
    title: "Elias1233",
    description: "Portfolio for Elias1233",
    siteName: "Elias1233",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elias1233",
    description: "Portfolio for Elias1233",
  },
  category: "technology",
  keywords: ["elias1233", "portfolio", "projects", "blog", "resume"],
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

        {children}
      </body>
    </html>
  )
}
