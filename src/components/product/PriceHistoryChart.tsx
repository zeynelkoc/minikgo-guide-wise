import type { PriceHistoryPoint } from "@/data/types";
import { useMemo } from "react";

export function PriceHistoryChart({ data }: { data: PriceHistoryPoint[] }) {
  const { path, area, min, max, ticks } = useMemo(() => {
    const w = 600;
    const h = 180;
    const prices = data.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = Math.max(1, max - min);
    const stepX = w / (data.length - 1);
    const points = data.map((d, i) => {
      const x = i * stepX;
      const y = h - ((d.price - min) / range) * (h - 20) - 10;
      return [x, y] as const;
    });
    const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const area = `${path} L${w} ${h} L0 ${h} Z`;
    const ticks = [0, Math.floor(data.length / 2), data.length - 1].map((i) => data[i]);
    return { path, area, min, max, ticks };
  }, [data]);

  return (
    <div className="rounded-3xl bg-canvas p-6 ring-hairline">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-serif text-lg">Son 90 günün fiyat geçmişi</h3>
        <span className="text-xs text-ink-muted">
          Bant: {min.toLocaleString("tr-TR")} – {max.toLocaleString("tr-TR")} TL
        </span>
      </div>
      <svg viewBox="0 0 600 180" className="w-full">
        <defs>
          <linearGradient id="ph-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.04 145)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.62 0.04 145)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#ph-area)" />
        <path d={path} fill="none" stroke="oklch(0.62 0.04 145)" strokeWidth="2" />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-ink-muted">
        {ticks.map((t) => (
          <span key={t.date}>{formatDate(t.date)}</span>
        ))}
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}
