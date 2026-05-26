import type { Product } from "@/data/types";
import { cn } from "@/lib/utils";

const styles: Record<Product["buyOrWait"]["state"], { label: string; tone: string; dot: string }> = {
  buy:        { label: "Şimdi al sinyali",       tone: "bg-good/10 text-good",                   dot: "bg-good" },
  wait:       { label: "Biraz bekle sinyali",   tone: "bg-warn/10 text-[oklch(0.5_0.13_75)]", dot: "bg-warn" },
  watch:      { label: "Takip et",              tone: "bg-sage-tint text-sage",                dot: "bg-sage" },
  insufficient:{ label: "Yeterli veri yok",     tone: "bg-ink/5 text-ink-soft",                dot: "bg-ink/30" },
};

export function BuyOrWaitSignal({ signal }: { signal: Product["buyOrWait"] }) {
  const s = styles[signal.state];
  return (
    <div className="rounded-3xl bg-canvas p-6 ring-hairline">
      <div className={cn("mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium", s.tone)}>
        <span className={cn("size-1.5 rounded-full", s.dot)} />
        {s.label}
      </div>
      <h3 className="font-serif text-xl">{signal.headline}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{signal.body}</p>
    </div>
  );
}
