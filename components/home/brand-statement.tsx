import { Reveal } from "@/components/reveal"

export function BrandStatement() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-balance md:text-5xl">
              Printing is more than ink on paper. It is how a brand shows up in the real world.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:pt-3">
          <Reveal delay={120}>
            <p className="max-w-sm font-sans text-base leading-relaxed text-graphite-mid lg:ml-auto">
              From corporate stationery to branded gifts, large-format materials and packaging, Funoon
              creates printed experiences designed to represent businesses with clarity, consistency and
              attention to detail.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
