import Link from "next/link"
import type React from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "outlineDark" | "outlineLight" | "ghost"

const base =
  "brand-btn group inline-flex items-center justify-center gap-3 rounded-[2px] px-7 py-4 font-sans text-[13px] font-medium tracking-[0.14em] uppercase transition-[colors,transform,opacity] duration-300 active:scale-[0.97] active:opacity-85 active:duration-[80ms] focus-visible:outline-2 focus-visible:outline-offset-2 select-none"

const variants: Record<Variant, string> = {
  // Black button with white text (light backgrounds)
  primary: "bg-ink text-background hover:bg-graphite",
  // Outlined button for dark sections (white outline/text)
  outlineDark: "border border-background/40 text-background hover:bg-background hover:text-ink",
  // Outlined button for light sections (black outline/text)
  outlineLight: "border border-ink/25 text-ink hover:bg-ink hover:text-background",
  ghost: "text-ink hover:text-graphite-mid",
}

export function BrandButton({
  href,
  children,
  variant = "primary",
  className,
  type,
  ...props
}: {
  href?: string
  children: React.ReactNode
  variant?: Variant
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], className)

  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")
    if (external) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type ?? "button"} className={classes} {...props}>
      {children}
    </button>
  )
}
