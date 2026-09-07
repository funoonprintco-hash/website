"use client"

import Link from "next/link"
import type React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "outlineDark" | "outlineLight" | "ghost"

/*
  FlowButton animation wired into every BrandButton variant.
  - Arrow slides in from left; right arrow exits right.
  - Text shifts right on hover.
  - Expanding circle fills the button (color varies per variant).
*/

const variantConfig: Record<
  Variant,
  { container: string; circle: string; arrowIdle: string; arrowActive: string; text: string; textActive: string }
> = {
  primary: {
    container:
      "border-ink/0 bg-ink text-background hover:border-transparent hover:text-background hover:rounded-[12px]",
    circle: "bg-graphite",
    arrowIdle: "stroke-background",
    arrowActive: "group-hover:stroke-background",
    text: "text-background",
    textActive: "group-hover:text-background",
  },
  outlineLight: {
    container:
      "border-ink/25 bg-transparent text-ink hover:border-transparent hover:text-background hover:rounded-[12px]",
    circle: "bg-ink",
    arrowIdle: "stroke-ink",
    arrowActive: "group-hover:stroke-background",
    text: "text-ink",
    textActive: "group-hover:text-background",
  },
  outlineDark: {
    container:
      "border-background/40 bg-transparent text-background hover:border-transparent hover:text-ink hover:rounded-[12px]",
    circle: "bg-background",
    arrowIdle: "stroke-background",
    arrowActive: "group-hover:stroke-ink",
    text: "text-background",
    textActive: "group-hover:text-ink",
  },
  ghost: {
    container: "border-transparent bg-transparent text-ink hover:text-graphite-mid",
    circle: "hidden",
    arrowIdle: "hidden",
    arrowActive: "hidden",
    text: "text-inherit",
    textActive: "",
  },
}

function FlowInner({
  children,
  variant,
  className,
}: {
  children: React.ReactNode
  variant: Variant
  className?: string
}) {
  const cfg = variantConfig[variant]

  if (variant === "ghost") {
    return (
      <span
        className={cn(
          "brand-btn inline-flex items-center justify-center gap-3 rounded-[2px] px-7 py-4 font-sans text-[13px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 active:scale-[0.97] active:duration-[80ms] select-none",
          cfg.container,
          className,
        )}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "brand-btn group relative inline-flex items-center justify-center overflow-hidden rounded-[100px] border-[1.5px] px-8 py-3.5 font-sans text-[13px] font-semibold tracking-[0.14em] uppercase cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] select-none",
        cfg.container,
        className,
      )}
    >
      {/* Arrow in */}
      <ArrowRight
        className={cn(
          "absolute w-4 h-4 left-[-25%] fill-none z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4",
          cfg.arrowIdle,
          cfg.arrowActive,
        )}
      />

      {/* Label */}
      <span
        className={cn(
          "relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out",
          cfg.text,
          cfg.textActive,
        )}
      >
        {children}
      </span>

      {/* Expanding circle */}
      <span
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover:w-[280px] group-hover:h-[280px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          cfg.circle,
        )}
      />

      {/* Arrow out */}
      <ArrowRight
        className={cn(
          "absolute w-4 h-4 right-4 fill-none z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%]",
          cfg.arrowIdle,
          cfg.arrowActive,
        )}
      />
    </span>
  )
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
  if (href) {
    const external =
      href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")
    if (external) {
      return (
        <a href={href}>
          <FlowInner variant={variant} className={className}>
            {children}
          </FlowInner>
        </a>
      )
    }
    return (
      <Link href={href}>
        <FlowInner variant={variant} className={className}>
          {children}
        </FlowInner>
      </Link>
    )
  }

  return (
    <button type={type ?? "button"} {...props}>
      <FlowInner variant={variant} className={className}>
        {children}
      </FlowInner>
    </button>
  )
}
