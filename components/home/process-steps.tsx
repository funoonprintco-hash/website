import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    body: "Share your project — what you're producing, quantities, timelines, and any artwork you have ready.",
  },
  {
    number: "02",
    title: "We work through the details",
    body: "We review the brief, ask the right questions, and confirm the best materials, format and finish for your project.",
  },
  {
    number: "03",
    title: "We prepare and produce",
    body: "Once approved, we manage the full production — from prepress checks to final quality review.",
  },
  {
    number: "04",
    title: "You receive the finished piece",
    body: "Delivered to your door or ready for collection. Clean. Complete. Ready to represent your brand.",
  },
]

export function ProcessSteps() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow className="mb-5">How It Works</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[0.96] tracking-[-0.02em] text-balance md:text-6xl">
                A simple process.
                <br />A better finish.
              </h2>
            </div>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <p className="max-w-sm font-sans text-base leading-relaxed text-graphite-mid">
                From the first conversation to the finished piece, we keep things clear and
                straightforward — so you always know where your project stands.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[2px] border border-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 80}>
              <div className="flex h-full flex-col p-8 md:p-10">
                <span className="font-sans text-xs tabular-nums text-graphite-mid">
                  {step.number}
                </span>
                <h3 className="mt-10 font-display text-xl font-medium leading-tight tracking-[-0.01em] md:mt-16 md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-graphite-mid">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
