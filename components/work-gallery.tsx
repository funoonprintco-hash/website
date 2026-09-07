"use client"

import { useState } from "react"
import { workItems, workFilters } from "@/lib/portfolio"
import type { WorkCategory } from "@/lib/portfolio"
import { PortfolioCard } from "@/components/portfolio-card"
import { cn } from "@/lib/utils"

export function WorkGallery() {
  const [active, setActive] = useState<WorkCategory | "All">("All")

  const filtered = active === "All" ? workItems : workItems.filter((i) => i.category === active)

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {workFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 font-sans text-[12px] uppercase tracking-[0.14em] transition-colors duration-200",
              active === f
                ? "bg-ink text-background"
                : "bg-offwhite text-graphite-mid hover:bg-graphite-light hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <PortfolioCard
            key={item.slug}
            item={item}
            priority={i < 3}
            className={item.size === "wide" ? "sm:col-span-2" : ""}
          />
        ))}
      </div>
    </div>
  )
}
