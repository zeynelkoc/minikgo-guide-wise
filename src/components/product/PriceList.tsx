import type { SellerOffer } from "@/data/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function PriceList({ offers }: { offers: SellerOffer[] }) {
  const sorted = [...offers].sort((a, b) => a.price - b.price);
  const cheapest = sorted.find((o) => o.inStock)?.price;
  return (
    <div className="rounded-3xl bg-canvas p-6 ring-hairline">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="font-serif text-xl">Anlık fiyatlar</h3>
        <span className="text-xs text-ink-muted">{offers.length} satıcı</span>
      </div>
      <ul className="divide-y divide-ink/5">
        {sorted.map((o) => {
          const best = o.inStock && o.price === cheapest;
          return (
            <li
              key={o.seller}
              className={cn(
                "flex items-center justify-between gap-4 py-4",
                best && "rounded-2xl bg-sage-tint/60 px-4",
              )}
            >
              <div>
                <p className="text-sm font-medium">{o.seller}</p>
                <p className="text-xs text-ink-muted">
                  {o.inStock ? "Stokta var" : "Stokta yok"} {best && "· En düşük"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif text-lg tabular-nums">
                  {o.price.toLocaleString("tr-TR")} TL
                </span>
                <a
                  href={o.url}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-medium transition-colors",
                    best
                      ? "bg-sage text-white hover:bg-sage-soft"
                      : "border border-ink/10 text-ink-soft hover:border-sage hover:text-sage",
                  )}
                >
                  Satıcıda gör
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[11px] text-ink-muted">
        Sepet/kupon indirimleri dahil değildir. Fiyatlar saatlik güncellenir.
      </p>
    </div>
  );
}
