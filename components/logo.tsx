import Image from "next/image"
import { cn } from "@/lib/utils"

// Uses the supplied official logo asset (background removed, artwork preserved).
// `dark` = black artwork for light backgrounds. `light` = white artwork for dark backgrounds.
export function Logo({
  variant = "dark",
  className,
  priority,
}: {
  variant?: "dark" | "light"
  className?: string
  priority?: boolean
}) {
  if (variant === "light") {
    return (
      <Image
        src="/brand/funoon-logo-light.png"
        alt="Funoon Print Co."
        width={533}
        height={391}
        priority={priority}
        className={cn("h-auto w-auto object-contain", className)}
      />
    )
  }

  // Dark variant — use SVG for pixel-perfect crispness at any size
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/funoon-logo-dark.svg"
      alt="Funoon Print Co."
      className={cn("h-auto w-auto object-contain", className)}
    />
  )
}
