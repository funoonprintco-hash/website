import { cn } from "@/lib/utils"

// `dark` = black artwork for light backgrounds. `light` = white artwork for dark backgrounds.
export function Logo({
  variant = "dark",
  className,
  priority: _priority,
}: {
  variant?: "dark" | "light"
  className?: string
  priority?: boolean
}) {
  const src = variant === "light"
    ? "/brand/funoon-logo-light.svg"
    : "/brand/funoon-logo-dark.svg"

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt="Funoon Print Co."
      className={cn("h-auto w-auto object-contain", className)}
    />
  )
}
