import Image from "next/image"
import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { industries } from "@/lib/industries"

export function IndustriesSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="mb-5">Who We Work With</Eyebrow>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
              Made for brands that care how they show up.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.number} delay={i * 100}>
              <article className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-offwhite">
                  <Image
                    src={industry.image || "/placeholder.svg"}
                    alt={industry.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="font-sans text-xs tabular-nums text-graphite-mid">
                    {industry.number}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.01em]">
                    {industry.name}
                  </h3>
                </div>
                <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-graphite-mid">
                  {industry.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
