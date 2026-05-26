import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  prompt: string;
  ratio?: "square" | "portrait" | "landscape" | "wide" | "auto";
  label?: string;
}

const ratios: Record<NonNullable<Props["ratio"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  auto: "",
};

/**
 * Görsel placeholder — gerçek marka/telifli görsel kullanılmıyor.
 * Hafif renk noise ile sıcak, kataloğa benzer doku.
 */
export function ImagePlaceholder({ prompt, ratio = "square", label, className, ...rest }: Props) {
  const seed = prompt.length;
  const hue = (seed * 23) % 60 + 30; // 30-90 sıcak aralık
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl ring-hairline",
        ratios[ratio],
        className,
      )}
      style={{
        background: `linear-gradient(135deg,
          oklch(0.96 0.02 ${hue}),
          oklch(0.93 0.025 ${hue + 20}))`,
      }}
      {...rest}
    >
      <div className="absolute inset-0 flex items-end p-4">
        <span className="eyebrow !text-[10px] opacity-50">{label ?? "Görsel"}</span>
      </div>
    </div>
  );
}
