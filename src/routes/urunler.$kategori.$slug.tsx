import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { Badge } from "@/components/mk/Badge";
import { ImagePlaceholder } from "@/components/mk/ImagePlaceholder";
import { findProduct } from "@/data/products";
import { categories } from "@/data/categories";
import { PriceList } from "@/components/product/PriceList";
import { PriceHistoryChart } from "@/components/product/PriceHistoryChart";
import { BuyOrWaitSignal } from "@/components/product/BuyOrWaitSignal";
import { ReviewSentimentMap } from "@/components/product/ReviewSentimentMap";
import { DynamicSpecTable } from "@/components/product/DynamicSpecTable";
import { MicroSurvey } from "@/components/product/MicroSurvey";
import { findArticle } from "@/data/articles";
import { Star } from "lucide-react";

export const Route = createFileRoute("/urunler/$kategori/$slug")({
  head: ({ params }) => {
    const p = findProduct(params.slug);
    return {
      meta: [
        { title: `${p?.brand ?? ""} ${p?.name ?? "Ürün"} — minikgo` },
        { name: "description", content: p?.blurb ?? "Ürün detayı" },
        { property: "og:title", content: `${p?.name ?? ""} — minikgo` },
        { property: "og:description", content: p?.blurb ?? "" },
      ],
    };
  },
  component: ProductDetail,
});

const badgeTone = {
  editor: "sage",
  value: "clay",
  lightest: "good",
  drop: "warn",
} as const;

function ProductDetail() {
  const { kategori, slug } = Route.useParams();
  const product = findProduct(slug);
  if (!product) throw notFound();
  const category = categories.find((c) => c.slug === kategori);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb
        items={[
          { label: "Ana sayfa", to: "/" },
          { label: "Ürünler", to: "/urunler" },
          { label: category?.name ?? "Kategori", to: "/urunler/$kategori", params: { kategori } },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[5fr_6fr]">
        {/* Gallery */}
        <div className="space-y-3">
          <ImagePlaceholder prompt={product.name} ratio="square" className="bg-sage-tint/30" label={product.brand} />
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <ImagePlaceholder
                key={i}
                prompt={`${product.name} açı ${i}`}
                ratio="square"
                className="bg-sage-tint/20"
              />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badges.map((b) => (
              <Badge key={b.label} tone={badgeTone[b.kind]}>{b.label}</Badge>
            ))}
          </div>
          <p className="eyebrow mt-4 !text-[10px]">{product.brand}</p>
          <h1 className="mt-2 font-serif text-5xl leading-[1.05]">{product.name}</h1>
          <p className="mt-4 text-lg text-ink-soft">{product.blurb}</p>
          <div className="mt-5 flex items-center gap-4 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-clay text-clay" /> {product.rating}
            </span>
            <span>{product.reviewCount} yorum</span>
          </div>

          <div className="mt-8 space-y-5">
            <PriceList offers={product.offers} />
            <BuyOrWaitSignal signal={product.buyOrWait} />
          </div>
        </div>
      </div>

      {/* Price history */}
      <section className="mt-16">
        <PriceHistoryChart data={product.priceHistory} />
      </section>

      {/* Review sentiment */}
      <section className="mt-12">
        <ReviewSentimentMap items={product.reviewSentiment} confidence={product.reviewConfidence} />
      </section>

      {/* Micro survey */}
      <section className="mt-12">
        <MicroSurvey />
      </section>

      {/* Spec table */}
      <section className="mt-16">
        <h2 className="font-serif text-3xl">Teknik özellikler</h2>
        <div className="mt-6">
          <DynamicSpecTable groups={product.specs} />
        </div>
      </section>

      {/* Related articles */}
      {product.relatedArticleSlugs.length > 0 && (
        <section className="mt-16 border-t border-ink/5 pt-10">
          <h2 className="font-serif text-3xl">İlgili rehberler</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {product.relatedArticleSlugs.map((s) => {
              const a = findArticle(s);
              if (!a) return null;
              return (
                <li key={s}>
                  <Link
                    to="/rehber/$slug"
                    params={{ slug: a.slug }}
                    className="group block rounded-3xl bg-canvas p-6 ring-hairline transition-all hover:-translate-y-0.5"
                  >
                    <p className="eyebrow">{a.category}</p>
                    <p className="mt-2 font-serif text-xl group-hover:text-sage">{a.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </Container>
  );
}
