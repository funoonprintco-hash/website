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
  const src = variant === "light" ? "/brand/funoon-logo-light.png" : "/brand/funoon-logo-dark.png"
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt="Funoon Print Co."
      width={533}
      height={391}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  )
}
