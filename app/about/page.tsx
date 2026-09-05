import type { Metadata } from "next"
import Image from "next/image"
import { BrandButton } from "@/components/brand-button"
import { SixBars } from "@/components/six-bars"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "About",
  description:
    "Funoon Print Co. exists to help businesses turn their brand into tangible, well-made printed experiences. Based in Sharjah, UAE.",
}

const principles = [
  {
    number: "01",
    title: "Intentional materials",
    body: "Every paper stock, finish and format is chosen to serve the brand — not just fill a brief.",
  },
  {
    number: "02",
    title: "Consistency across touchpoints",
    body: "A card, a bag, a letterhead — held to the same standard so the brand reads the same everywhere.",
  },
  {
    number: "03",
    title: "Clarity from the start",
    body: "Clear communication, honest timelines, and no surprises — from the first conversation to delivery.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
          <Reveal>
            <span className="block font-sans text-[11px] uppercase tracking-[0.22em] text-graphite-mid">
              About
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em] text-balance">
              Print should feel like part of the brand.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-offwhite">
                <Image
                  src="/work/quality-detail.png"
                  alt="Extreme close-up of premium printed material showing paper texture and ink detail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <SixBars className="mb-10 h-7 text-ink" />
              <p className="font-display text-2xl font-medium leading-[1.2] tracking-[-0.01em] text-balance md:text-3xl">
                Funoon Print Co. exists to help businesses turn their brand into tangible,
                well-made experiences.
              </p>
              <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-graphite-mid">
                <p>
                  From business essentials to corporate gifts, packaging and branded materials, we
                  focus on creating print that feels considered, professional and ready to represent
                  the businesses behind it.
                </p>
                <p>
                  We work with corporate teams, real estate companies and premium hospitality
                  brands — businesses that understand that the way something looks and feels in
                  the hand says something about the brand that made it.
                </p>
                <p>
                  Based in Sharjah, UAE, we serve businesses across the Emirates who want print
                  that holds up close — not just on screen.
                </p>
              </div>
              <div className="mt-12">
                <BrandButton href="/quote" variant="primary">
                  Request a Quote
                </BrandButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-border bg-offwhite">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
              How we approach every project.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[2px] border border-border bg-border md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.number} delay={i * 80}>
                <div className="flex h-full flex-col bg-offwhite p-8 md:p-10">
                  <span className="font-sans text-xs tabular-nums text-graphite-mid">
                    {p.number}
                  </span>
                  <h3 className="mt-12 font-display text-2xl font-medium tracking-[-0.01em] md:mt-20">
                    {p.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-graphite-mid">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
                Your brand deserves print that holds up close.
              </h2>
              <div className="flex flex-wrap gap-4 md:shrink-0">
                <BrandButton href="/quote" variant="primary">
                  Request a Quote
                </BrandButton>
                <BrandButton href="/contact" variant="outlineLight">
                  Get in Touch
                </BrandButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
