"use client"

import { useState } from "react"
import { PortfolioCard } from "@/components/portfolio-card"
import { Reveal } from "@/components/reveal"
import { workItems, workFilters, type WorkCategory } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

export function WorkGrid() {
  const [active, setActive] = useState<WorkCategory | "All">("All")

  const filtered =
    active === "All" ? workItems : workItems.filter((item) => item.category === active)

  return (
    <>
      {/* Filter bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {workFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={cn(
                  "shrink-0 border-b-2 pb-4 pr-7 pt-5 font-sans text-[12px] uppercase tracking-[0.18em] transition-colors duration-200",
                  active === filter
                    ? "border-ink text-ink"
                    : "border-transparent text-graphite-mid hover:text-ink",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={`${active}-${item.slug}`} delay={(i % 3) * 60}>
              <PortfolioCard item={item} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-sans text-sm text-graphite-mid">
            No projects in this category yet.
          </p>
        )}
      </div>
    </>
  )
}
