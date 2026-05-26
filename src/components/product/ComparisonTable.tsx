import type { Product } from "@/data/types";
import { lowestPrice } from "@/data/products";
import { Badge } from "@/components/mk/Badge";
import { ImagePlaceholder } from "@/components/mk/ImagePlaceholder";
import { ArrowUpRight, Check, Minus } from "lucide-react";

interface Row {
  label: string;
  read: (p: Product) => string | number | boolean;
}

const defaultRows: Row[] = [
  { label: "Marka", read: (p) => p.brand },
  { label: "Anlık fiyat", read: (p) => `${lowestPrice(p).toLocaleString("tr-TR")} TL` },
  { label: "Ağırlık", read: (p) => `${p.attributes.weight ?? "—"} kg` },
  { label: "Katlanma tipi", read: (p) => String(p.attributes.foldType ?? "—") },
  { label: "Çevrilebilir oturak", read: (p) => Boolean(p.attributes.reversibleSeat) },
  { label: "Travel system", read: (p) => Boolean(p.attributes.travelSystem) },
  { label: "Puan", read: (p) => `${p.rating} / 5` },
  { label: "Yorum sayısı", read: (p) => p.reviewCount },
];

export function ComparisonTable({ products, rows = defaultRows }: { products: Product[]; rows?: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-canvas ring-hairline">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 p-6 text-left align-bottom">
              <span className="eyebrow">Karşılaştırma</span>
            </th>
            {products.map((p) => (
              <th key={p.slug} className="p-6 align-bottom text-left">
                <ImagePlaceholder
                  prompt={p.name}
                  ratio="square"
                  className="mb-3 max-w-[140px] bg-sage-tint/40"
                  label={p.brand}
                />
                <p className="eyebrow !text-[10px]">{p.brand}</p>
                <h3 className="mt-1 font-serif text-lg">{p.name}</h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.badges.slice(0, 1).map((b) => (
                    <Badge key={b.label} tone="sage">{b.label}</Badge>
                  ))}
                </div>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-sage px-4 py-2 text-xs font-medium text-white"
                >
                  Satıcıda gör <ArrowUpRight className="size-3" />
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-ink/5">
              <th className="w-40 p-4 text-left text-xs font-medium text-ink-muted">{r.label}</th>
              {products.map((p) => {
                const v = r.read(p);
                return (
                  <td key={p.slug} className="p-4 text-sm">
                    {typeof v === "boolean" ? (
                      v ? <Check className="size-4 text-sage" /> : <Minus className="size-4 text-ink-muted/50" />
                    ) : (
                      v
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
