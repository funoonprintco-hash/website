import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { BrandButton } from "@/components/brand-button"
import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { services, getService } from "@/lib/services"
import { SixBars } from "@/components/six-bars"

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.description,
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 pb-0 pt-36 md:px-10 md:pt-48">
          <Reveal>
            <Eyebrow className="mb-6">
              Services — {service.number}
            </Eyebrow>
          </Reveal>
          <div className="grid items-end gap-12 pb-0 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal delay={80}>
                <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em]">
                  {service.name}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-lg font-sans text-lg leading-relaxed text-graphite">
                  {service.description}
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-10 flex flex-wrap gap-4 pb-20 md:pb-28">
                  <BrandButton href="/quote" variant="primary">
                    Request a Quote
                  </BrandButton>
                  <BrandButton href="/services" variant="outlineLight">
                    All Services
                  </BrandButton>
                </div>
              </Reveal>
            </div>
            <div className="relative lg:col-span-5">
              <Reveal delay={100}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[2px] bg-offwhite">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Good for */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="mb-8">Good for</Eyebrow>
              <ul className="space-y-4">
                {service.goodFor.map((item) => (
                  <li key={item} className="flex items-center gap-4 border-b border-border pb-4">
                    <SixBars className="h-3 shrink-0 text-graphite-mid" />
                    <span className="font-sans text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Options — example only */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <Eyebrow className="mb-8">
                Example options{" "}
                <span className="ml-2 normal-case tracking-normal text-graphite-mid/60">
                  — placeholders only
                </span>
              </Eyebrow>
              <div className="space-y-8">
                {service.options.map((opt) => (
                  <div key={opt.label}>
                    <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-graphite-mid">
                      {opt.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {opt.examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-[2px] border border-border px-3 py-1.5 font-sans text-sm text-graphite"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full-width CTA */}
      <section className="border-t border-border bg-offwhite">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mt-3 font-sans text-base text-graphite-mid">
                  Tell us about your project and we'll work through the details with you.
                </p>
              </div>
              <BrandButton href="/quote" variant="primary" className="md:shrink-0">
                Request a Quote
              </BrandButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <Eyebrow className="mb-10">Other Services</Eyebrow>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {otherServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <a href={`/services/${s.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-offwhite">
                    <Image
                      src={s.image || "/placeholder.svg"}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg font-medium tracking-[-0.01em]">
                      {s.name}
                    </span>
                    <span className="text-graphite-mid transition-transform duration-300 group-hover:translate-x-1" aria-hidden>↗</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
