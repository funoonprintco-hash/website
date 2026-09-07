"use client"

import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

// Module-level flag — resets on every full page refresh,
// persists across SPA navigations so it only shows once per load.
let shownThisLoad = false

export function LoadingWrapper() {
  const [show, setShow] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/" && !shownThisLoad) {
      shownThisLoad = true
      setShow(true)
    }
  }, [pathname])

  const handleComplete = useCallback(() => setShow(false), [])

  if (!show) return null
  return <LoadingScreen onComplete={handleComplete} />
}
