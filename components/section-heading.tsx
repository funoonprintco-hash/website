import type React from "react"
import { cn } from "@/lib/utils"

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "block font-sans text-[11px] font-medium uppercase tracking-label text-graphite-mid",
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  className,
  titleClassName,
  as: Tag = "h2",
}: {
  eyebrow?: string
  title: React.ReactNode
  className?: string
  titleClassName?: string
  as?: React.ElementType
}) {
  return (
    <div className={className}>
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "font-display text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.02em] md:text-6xl",
          titleClassName,
        )}
      >
        {title}
      </Tag>
    </div>
  )
}
