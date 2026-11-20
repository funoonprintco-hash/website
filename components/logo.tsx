import { cn } from "@/lib/utils";
// Original vector symbol and wordmark; the legacy suffix is outside the viewBox.
export function Logo({
  variant = "dark",
  className,
  priority = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("brand-logo", className)} aria-label="Funoon FZC">
      <img
        src={`/brand/funoon-wordmark-${variant}.svg`}
        alt=""
        width="1870"
        height="1135"
        fetchPriority={priority ? "high" : "auto"}
      />
      <span className="brand-suffix">FZC</span>
    </span>
  );
}
