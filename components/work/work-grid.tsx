"use client";
import { useState } from "react";
import Link from "next/link";
import { workItems, workFilters, type WorkCategory } from "@/lib/portfolio";
import { WorkCard } from "@/components/work-card";
export function WorkGrid() {
  const [active, setActive] = useState<WorkCategory | "All">("All");
  const items =
    active === "All"
      ? workItems
      : workItems.filter((w) => w.category === active);
  return (
    <>
      <div
        className="work-filters"
        role="group"
        aria-label="Filter completed work"
      >
        {workFilters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="results-count" role="status">
        {items.length} {items.length === 1 ? "project" : "projects"}
        {active !== "All" ? ` in ${active}` : " selected"}
      </p>
      {items.length ? (
        <div className="work-pair">
          {items.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="empty-work">
          <h2>More work to share, in time.</h2>
          <p>
            We haven’t published a project in this category yet. Tell us what
            you have in mind and we can discuss relevant options.
          </p>
          <Link
            href={`/quote?service=${encodeURIComponent(active)}`}
            className="button button-black"
          >
            Discuss Your Project
          </Link>
        </div>
      )}
    </>
  );
}
