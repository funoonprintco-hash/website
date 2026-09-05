import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BrandButton } from "@/components/brand-button"
import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { services } from "@/lib/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business cards, corporate gifts, brochures, packaging, apparel, large-format and more — premium printing for UAE businesses.",
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
          <Reveal>
            <Eyebrow className="mb-6">Services</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-4xl font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em] text-balance">
              The print businesses need to show up well.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-graphite">
              From everyday essentials to high-impact brand materials — produced with the materials,
              finish and consistency that a business deserves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 60}>
              <Link
                href={`/services/${service.slug}`}
                className="group block"
                aria-label={`Learn about ${service.name}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-offwhite">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5" />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-sans text-xs tabular-nums text-graphite-mid">
                        {service.number}
                      </span>
                      <h2 className="font-display text-xl font-medium tracking-[-0.01em]">
                        {service.name}
                      </h2>
                    </div>
                    <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-graphite-mid">
                      {service.short}
                    </p>
                  </div>
                  <span
                    className="mt-0.5 shrink-0 translate-x-0 text-lg text-graphite-mid transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-border bg-ink text-background">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
                Not sure where to start?
              </h2>
              <div className="flex flex-wrap gap-4 md:shrink-0">
                <BrandButton href="/quote" variant="outlineDark">
                  Request a Quote
                </BrandButton>
                <BrandButton href="/contact" variant="ghost" className="text-background hover:text-background/60">
                  Talk to Us
                </BrandButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
