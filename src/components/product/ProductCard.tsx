import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/types";
import { lowestPrice, priceDropPercent } from "@/data/products";
import { Badge } from "@/components/mk/Badge";
import { ImagePlaceholder } from "@/components/mk/ImagePlaceholder";
import { Star } from "lucide-react";

const badgeTone = {
  editor: "sage",
  value: "clay",
  lightest: "good",
  drop: "warn",
} as const;

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const price = lowestPrice(product);
  const drop = priceDropPercent(product);
  return (
    <Link
      to="/urunler/$kategori/$slug"
      params={{ kategori: product.categorySlug, slug: product.slug }}
      className="group flex flex-col rounded-3xl bg-canvas p-4 ring-hairline transition-all hover:-translate-y-1"
    >
      <ImagePlaceholder
        prompt={product.name}
        ratio="square"
        label={product.brand}
        className="mb-4 bg-sage-tint/40"
      />
      <div className="flex-1 px-1">
        <div className="mb-2 flex flex-wrap gap-1">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b.label} tone={badgeTone[b.kind]}>
              {b.label}
            </Badge>
          ))}
        </div>
        <p className="eyebrow !text-[10px]">{product.brand}</p>
        <h3 className="mt-1 font-serif text-lg leading-tight group-hover:text-sage">
          {product.name}
        </h3>
        {!compact && (
          <p className="mt-2 line-clamp-2 text-xs text-ink-muted">{product.blurb}</p>
        )}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-serif text-2xl">{price.toLocaleString("tr-TR")} TL</p>
            {drop > 0 && (
              <p className="text-[11px] text-good">%{drop} düştü</p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-ink-muted">
            <Star className="size-3 fill-clay text-clay" />
            <span>{product.rating}</span>
            <span className="opacity-50">· {product.reviewCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
