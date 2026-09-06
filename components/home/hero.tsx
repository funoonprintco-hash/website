import { BrandButton } from "@/components/brand-button"
import { HeroImage } from "@/components/hero-image"
import { Reveal } from "@/components/reveal"
import { SixBars } from "@/components/six-bars"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <SixBars className="h-5 text-ink" />
                <span className="font-sans text-[11px] uppercase tracking-label text-graphite-mid">
                  {site.location}
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display text-[clamp(3.25rem,11vw,9rem)] font-bold leading-[0.86] tracking-[-0.03em] text-balance">
                Made to
                <br />
                be seen.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-md font-sans text-lg leading-relaxed text-graphite md:text-xl">
                Premium printing and branded materials for businesses that care about every detail.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <BrandButton href="/quote" variant="primary">
                  Request a Quote
                </BrandButton>
                <BrandButton href="/work" variant="outlineLight">
                  View Our Work
                </BrandButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <HeroImage />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
