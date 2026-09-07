"use client"

import { useState, useCallback, useEffect } from "react"
import { LoadingScreen } from "@/components/loading-screen"

export function LoadingWrapper() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("funoon_loaded")) {
        setShow(true)
      }
    } catch {
      // sessionStorage unavailable (private browsing strict mode) — skip loader
    }
  }, [])

  const handleComplete = useCallback(() => {
    try { sessionStorage.setItem("funoon_loaded", "1") } catch {}
    setShow(false)
  }, [])

  if (!show) return null
  return <LoadingScreen onComplete={handleComplete} />
}
