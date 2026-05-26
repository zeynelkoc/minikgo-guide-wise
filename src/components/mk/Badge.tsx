import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "neutral" | "sage" | "clay" | "good" | "warn" | "bad";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  neutral: "bg-ink/5 text-ink-soft",
  sage: "bg-sage-tint text-sage",
  clay: "bg-clay/15 text-clay",
  good: "bg-good/15 text-good",
  warn: "bg-warn/15 text-[oklch(0.5_0.13_75)]",
  bad: "bg-bad/10 text-bad",
};

export function Badge({ tone = "neutral", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
