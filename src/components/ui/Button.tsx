import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-sage text-white hover:bg-sage-soft shadow-[0_8px_24px_-12px_oklch(0.62_0.04_145/0.4)]",
  secondary:
    "bg-canvas border border-ink/10 text-ink hover:border-sage hover:text-sage",
  ghost: "text-ink-soft hover:text-sage hover:bg-sage-tint",
  quiet: "text-ink-soft hover:text-sage underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-sm",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: never;
}

export function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

interface LinkButtonProps {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function LinkButton({ to, params, search, variant = "primary", size = "md", className, children }: LinkButtonProps) {
  return (
    <Link
      to={to as any}
      params={params as any}
      search={search as any}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}
