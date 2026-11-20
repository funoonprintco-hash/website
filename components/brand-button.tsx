import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";
export function BrandButton({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outlineDark" | "outlineLight" | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    "button",
    variant === "primary"
      ? "button-black"
      : variant === "outlineDark"
        ? "button-outline-white"
        : "button-outline",
    className,
  );
  if (href)
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
