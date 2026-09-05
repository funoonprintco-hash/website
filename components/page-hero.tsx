import type React from "react"
import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: string
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <Reveal>
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="max-w-4xl font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-balance">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-graphite">{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
