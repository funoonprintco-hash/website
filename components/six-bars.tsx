import { cn } from "@/lib/utils"

// Proportions approximate the varying bar heights in the official Funoon logo mark.
const heights = [0.65, 0.85, 1.0, 0.75, 0.52, 0.38]

export function SixBars({
  className,
  barClassName,
}: {
  className?: string
  barClassName?: string
}) {
  return (
    <span className={cn("inline-flex items-end gap-[3px]", className)} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={cn("block w-[3px] rounded-full bg-current", barClassName)}
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </span>
  )
}
