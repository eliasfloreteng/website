"use client"

import { useEffect } from "react"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

export type Calendar = string | null

export const Context = createContext<
  [Calendar, (newCalendar: Calendar) => void] | undefined
>(undefined)

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [calendar, setCalendarState] = useState<Calendar>(null)

  useEffect(() => {
    setCalendarState(localStorage.getItem("calendar"))
  }, [])

  const setCalendar = (calendar: Calendar) => {
    if (calendar) {
      localStorage.setItem("calendar", calendar)
    } else {
      localStorage.removeItem("calendar")
    }
    setCalendarState(calendar)
  }

  return (
    <Context.Provider value={[calendar, setCalendar]}>
      {children}
    </Context.Provider>
  )
}

export function useCalendar() {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider")
  }
  return context
}
