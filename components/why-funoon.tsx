import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const values = [
  {
    number: "01",
    title: "Premium Quality",
    body: "Materials, finishes and production chosen so every piece feels considered in the hand.",
  },
  {
    number: "02",
    title: "Brand Consistency",
    body: "Colour, detail and finish held to the same standard across every item we produce.",
  },
  {
    number: "03",
    title: "Reliable Delivery",
    body: "Clear timelines and dependable production, so what you plan is what arrives.",
  },
  {
    number: "04",
    title: "Attention to Detail",
    body: "The small things — edges, alignment, weight — treated as the things that matter most.",
  },
]

export function WhyFunoon() {
  return (
    <section className="bg-ink text-background">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow className="mb-5 text-background/40">Why Funoon</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
                Details matter.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
              <p className="max-w-md font-sans text-base leading-relaxed text-background/60">
                We work with businesses that understand print is part of the brand — and treat it that
                way, from the first proof to the final delivery.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[2px] bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.number} delay={(i % 4) * 80}>
              <div className="flex h-full flex-col bg-ink p-8 md:p-10">
                <span className="font-sans text-xs tabular-nums text-background/40">
                  {value.number}
                </span>
                <h3 className="mt-16 font-display text-2xl font-medium tracking-[-0.01em] md:mt-24">
                  {value.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-background/60">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
