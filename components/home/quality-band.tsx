import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SixBars } from "@/components/six-bars"

export function QualityBand() {
  return (
    <section className="relative">
      <div className="relative min-h-[70vh] w-full overflow-hidden">
        <Image
          src="/work/quality-detail.png"
          alt="Extreme close-up of premium printed material showing paper texture and ink detail"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 md:px-10 md:pb-24">
            <Reveal>
              <SixBars className="mb-8 h-6 text-background/80" />
              <p className="max-w-3xl text-balance font-display text-2xl font-medium leading-[1.1] tracking-[-0.01em] text-background md:text-4xl">
                Every material is chosen, every finish is checked, and every piece is produced to the
                standard the brand deserves.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
