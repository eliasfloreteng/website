"use client"

import { start } from "app/_icosahedron/grid_icosahedron.js"
import { useEffect } from "react"

/**
 * https://codepen.io/alphardex/pen/dyOQyPJ
 */
export default function Icosahedron() {
  useEffect(() => {
    start()
  }, [])

  return (
    <div
      className="grid-icosahedron pointer-events-none absolute inset-0 h-full w-full overflow-hidden bg-black"
      onLoad={() => {
        start()
      }}
    />
  )
}
