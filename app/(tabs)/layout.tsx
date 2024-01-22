import Navbar from "app/(tabs)/Navbar"
import Footer from "app/(tabs)/Footer"
import { CalendarProvider } from "./calendar/Context"

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CalendarProvider>
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
    </CalendarProvider>
  )
}
