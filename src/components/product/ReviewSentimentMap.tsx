import type { ReviewConfidence, ReviewSentimentItem } from "@/data/types";
import { cn } from "@/lib/utils";

const levelMeta: Record<ReviewConfidence["level"], { label: string; tone: string; note: string }> = {
  high:   { label: "Yüksek güven",  tone: "bg-good/15 text-good",                   note: "Çok sayıda yorum analiz edildi." },
  medium: { label: "Orta güven",    tone: "bg-warn/15 text-[oklch(0.5_0.13_75)]", note: "Yeterli ama sınırlı veri." },
  low:    { label: "Düşük güven",   tone: "bg-bad/10 text-bad",                     note: "Yorum sayısı az; analiz sınırlı." },
};

export function ReviewSentimentMap({
  items,
  confidence,
}: {
  items: ReviewSentimentItem[];
  confidence: ReviewConfidence;
}) {
  const meta = levelMeta[confidence.level];
  return (
    <div className="rounded-3xl bg-canvas p-6 ring-hairline">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-xl">Yorum haritası</h3>
        <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium", meta.tone)}>
          {meta.label} · {confidence.sampleSize} yorum
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-ink-muted">Henüz yeterli yorum yok.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.label}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="text-ink">{it.label}</span>
                <span className="tabular-nums text-ink-muted">%{it.percent}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink/5">
                <div
                  className={cn(
                    "h-full rounded-full",
                    it.tone === "positive" ? "bg-sage" : "bg-clay",
                  )}
                  style={{ width: `${Math.min(100, it.percent)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-xs text-ink-muted">
        {confidence.note ?? meta.note}
      </p>
    </div>
  );
}
