import { BrandButton } from "@/components/brand-button"
import { SixBars } from "@/components/six-bars"
import { Reveal } from "@/components/reveal"

export function EnquiryCta() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SixBars className="mb-10 h-8 text-ink" />
              <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-balance">
                The work starts
                <br />with a conversation.
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={100}>
              <p className="max-w-sm font-sans text-base leading-relaxed text-graphite-mid">
                Tell us what you have in mind, what you need, and when you need it. We'll take it
                from there.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <BrandButton href="/quote" variant="primary">
                  Request a Quote
                </BrandButton>
                <BrandButton href="/contact" variant="outlineLight">
                  Get in Touch
                </BrandButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
