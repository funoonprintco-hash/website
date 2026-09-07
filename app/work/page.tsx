import type { Metadata } from "next"
import { BrandButton } from "@/components/brand-button"
import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { WorkGallery } from "@/components/work-gallery"

export const metadata: Metadata = {
  title: "Work",
  description:
    "A selection of printed materials, branded products and visual applications produced for businesses across the UAE.",
}

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <Eyebrow className="mb-6">Selected Work</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.88] tracking-[-0.03em]">
                  The work.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-graphite">
                  A selection of the printed materials, branded products and visual applications
                  we produce for businesses across the UAE.
                </p>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <BrandButton href="/quote" variant="primary" className="md:shrink-0">
                Request a Quote
              </BrandButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <WorkGallery />
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
                Ready to add your project to the list?
              </h2>
              <div className="flex flex-wrap gap-4 md:shrink-0">
                <BrandButton href="/quote" variant="outlineDark">
                  Request a Quote
                </BrandButton>
                <BrandButton
                  href="/contact"
                  variant="ghost"
                  className="text-background hover:text-background/60"
                >
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
