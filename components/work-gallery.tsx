"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { workItems, workFilters } from "@/lib/portfolio"
import type { WorkCategory } from "@/lib/portfolio"
import { PortfolioCard } from "@/components/portfolio-card"
import { ContinuousTabs } from "@/components/continuous-tabs"

export function WorkGallery() {
  const [active, setActive] = useState<WorkCategory | "All">("All")

  const tabs = workFilters.map((f) => ({ id: f, label: f }))
  const filtered = active === "All" ? workItems : workItems.filter((i) => i.category === active)

  return (
    <div>
      {/* Animated filter tabs */}
      <div className="flex justify-center">
        <ContinuousTabs
          tabs={tabs}
          defaultActiveId="All"
          onChange={(id) => setActive(id as WorkCategory | "All")}
        />
      </div>

      {/* Animated grid */}
      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 28,
                mass: 0.8,
                delay: i * 0.04,
              }}
              className={item.size === "wide" ? "sm:col-span-2" : ""}
            >
              <PortfolioCard item={item} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
