"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

/*
  Cursor parallax on the hero business-cards image.
  Apple principle: content moves with the user's attention — depth cue through motion.
  Uses rAF lerp (approx spring, damping ≈ 0.94/frame at 60fps) so motion is
  interruptible and velocity-aware: reversing the cursor blends naturally, no "brick wall."
  prefers-reduced-motion: the effect is removed entirely.
*/
export function HeroImage() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return

    let rafId: number
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    // rAF lerp — approximates a critically damped spring at ~0.06 factor per frame
    function tick() {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      img.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px) scale(1.08)`
      rafId = requestAnimationFrame(tick)
    }

    function onMove(e: MouseEvent) {
      const rect = wrap.getBoundingClientRect()
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2  // [-1, 1]
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      // Opposite direction to cursor = parallax depth (object behind viewport)
      tx = -normX * 10
      ty = -normY * 8
    }

    function onLeave() {
      tx = 0
      ty = 0
    }

    // Track on the section, not the image, for a wider trigger area
    const section = wrap.closest("section") ?? document.documentElement
    section.addEventListener("mousemove", onMove as EventListener)
    section.addEventListener("mouseleave", onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      section.removeEventListener("mousemove", onMove as EventListener)
      section.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-offwhite"
    >
      {/* Inner div carries the parallax transform; scale(1.08) hides the shifted edges */}
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{ transform: "scale(1.08)", willChange: "transform" }}
      >
        <Image
          src="/work/hero-business-cards.png"
          alt="Funoon Print Co. business cards — black front with logo and white back with contact details on a stone surface"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
