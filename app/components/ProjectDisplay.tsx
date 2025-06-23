"use client"

import Image from "next/image"
import { type Project } from "../data/projects"
import { PhoneFrame } from "./frames/PhoneFrame"
import { DesktopFrame } from "./frames/DesktopFrame"
import { useEffect, useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

interface ProjectDisplayProps {
  projects: Project[]
  type: "mobile" | "web" | "software"
}

export function ProjectDisplay({ projects, type }: ProjectDisplayProps) {
  const Frame = type === "mobile" ? PhoneFrame : DesktopFrame
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [rightGradientOpacity, setRightGradientOpacity] = useState(1)
  const [leftGradientOpacity, setLeftGradientOpacity] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)

  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current
      setIsScrollable(scrollWidth > clientWidth)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPercentage =
        container.scrollLeft / (container.scrollWidth - container.clientWidth)
      setRightGradientOpacity(scrollPercentage > 0.99 ? 0 : 1)
      setLeftGradientOpacity(scrollPercentage < 0.01 ? 0 : 1)
    }

    container.addEventListener("scroll", handleScroll)
    checkScrollable()
    window.addEventListener("resize", checkScrollable)
    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkScrollable)
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full bg-gray-950 p-8">
      <div className="relative flex items-center justify-center">
        {isScrollable && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-4 z-20 rounded-full bg-gray-800 p-3 text-white transition-opacity duration-500 hover:bg-gray-800/75"
              style={{ opacity: leftGradientOpacity }}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-4 z-20 rounded-full bg-gray-800 p-3 text-white transition-opacity duration-500 hover:bg-gray-800/75"
              style={{ opacity: rightGradientOpacity }}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-1/5 bg-gradient-to-l from-gray-950/90 to-transparent transition-opacity duration-500"
          style={{ opacity: rightGradientOpacity }}
        />
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-1/5 bg-gradient-to-r from-gray-950/90 to-transparent transition-opacity duration-500"
          style={{ opacity: leftGradientOpacity }}
        />
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-2"
        >
          {projects.map((project) => (
            <a
              className="block flex-none"
              key={project.id}
              href={project.link}
              target="_blank"
            >
              <Frame imageUrl={project.image} altText={project.title} />
              <div className="mt-4 flex items-center justify-center gap-4">
                <Image
                  src={project.logo}
                  alt={project.title}
                  className="h-8 w-auto"
                />
                <p className="text-center text-gray-400">{project.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
