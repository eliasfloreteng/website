import type { Metadata } from "next"
import "../styles/global.css"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Elias1233",
  description: "Portfolio for Elias1233",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Navbar />

          <main
            id="content"
            className="flex w-full flex-1 flex-col items-center justify-center"
          >
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
