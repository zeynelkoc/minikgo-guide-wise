import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({ className, size = "default", ...props }: ContainerProps) {
  const max = size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[1400px]" : "max-w-7xl";
  return <div className={cn("mx-auto w-full px-5 sm:px-8", max, className)} {...props} />;
}
