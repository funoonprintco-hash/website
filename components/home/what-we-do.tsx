"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Eyebrow } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { services } from "@/lib/services"
import { cn } from "@/lib/utils"

export function WhatWeDo() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="border-t border-border bg-offwhite">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow className="mb-5">What We Do</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
                The print businesses need to show up well.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
              <p className="max-w-md font-sans text-base leading-relaxed text-graphite-mid">
                From everyday essentials to high-impact brand materials, we bring businesses the print
                they need to show up professionally.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Service list */}
          <ul className="lg:col-span-7">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "group flex items-center gap-6 border-b border-border py-6 transition-colors duration-300",
                    active === i ? "text-ink" : "text-graphite",
                  )}
                >
                  <span className="w-10 font-sans text-xs tabular-nums text-graphite-mid">
                    {service.number}
                  </span>
                  <span className="flex-1 font-display text-2xl font-medium tracking-[-0.01em] md:text-3xl">
                    {service.name}
                  </span>
                  <span
                    className={cn(
                      "translate-x-0 text-lg transition-transform duration-300 group-hover:translate-x-1",
                    )}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Sticky preview (desktop) */}
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-background">
                {services.map((service, i) => (
                  <Image
                    key={service.slug}
                    src={service.image || "/placeholder.svg"}
                    alt={service.imageAlt}
                    fill
                    sizes="30vw"
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
              <p className="mt-5 font-sans text-sm leading-relaxed text-graphite-mid">
                {services[active].short}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
