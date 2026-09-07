"use client"

import Image from "next/image"
import { useRef } from "react"
import type { WorkItem } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

/*
  3D perspective tilt on hover — Apple-style depth cue.
  Max tilt: ±4deg X, ±5deg Y. Perspective: 900px.
  On leave, springs back to flat via CSS transition (damped, no overshoot).
  prefers-reduced-motion: tilt skipped, only opacity/zoom runs.
*/
export function PortfolioCard({
  item,
  className,
  priority,
}: {
  item: WorkItem
  className?: string
  priority?: boolean
}) {
  const figRef = useRef<HTMLElement>(null)

  const aspect =
    item.size === "tall" ? "aspect-[3/4]" : item.size === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const fig = figRef.current
    if (!fig) return
    // Check reduced motion at interaction time (Safari late-reads the MQ)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const rect = fig.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // [-0.5, 0.5]
    const y = (e.clientY - rect.top) / rect.height - 0.5

    fig.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`
    fig.style.transition = "transform 80ms linear"  // follows finger instantly
  }

  function onLeave() {
    const fig = figRef.current
    if (!fig) return
    // Spring back: cubic-bezier(0.16,1,0.3,1) ≈ critically damped spring, no overshoot
    fig.style.transition = "transform 600ms cubic-bezier(0.16,1,0.3,1)"
    fig.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)"
  }

  return (
    <figure
      ref={figRef}
      className={cn("group cursor-default", className)}
      style={{ willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className={cn("relative w-full overflow-hidden rounded-[2px] bg-offwhite", aspect)}>
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5" />
      </div>
      <figcaption className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-lg font-medium tracking-[-0.01em] text-ink">
            {item.title}
          </span>
          <span className="font-sans text-[11px] uppercase tracking-label text-graphite-mid">
            {item.category}
          </span>
        </div>
        {item.note && (
          <p className="mt-1.5 font-sans text-[11px] text-graphite-mid italic">{item.note}</p>
        )}
      </figcaption>
    </figure>
  )
}
