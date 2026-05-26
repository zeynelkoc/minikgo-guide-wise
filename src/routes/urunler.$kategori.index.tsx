import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { SectionHeading } from "@/components/mk/SectionHeading";
import { LinkButton } from "@/components/mk/Button";
import { categories } from "@/data/categories";
import { categoryFilters } from "@/data/filters";
import { productsByCategory } from "@/data/products";
import { DynamicFilterPanel, applyFilters } from "@/components/product/DynamicFilterPanel";
import { ProductCard } from "@/components/product/ProductCard";
import { useState } from "react";
import type { FilterState } from "@/data/types";
import { Sparkles, SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/urunler/$kategori/")({
  head: ({ params }) => {
    const c = categories.find((c) => c.slug === params.kategori);
    return {
      meta: [
        { title: `${c?.name ?? "Kategori"} — minikgo` },
        { name: "description", content: c?.blurb ?? "Ürün kategorisi" },
        { property: "og:title", content: `${c?.name ?? "Kategori"} — minikgo` },
        { property: "og:description", content: c?.blurb ?? "" },
      ],
    };
  },
  component: KategoriList,
});

function KategoriList() {
  const { kategori } = Route.useParams();
  const category = categories.find((c) => c.slug === kategori);
  if (!category) throw notFound();

  const definitions = categoryFilters[kategori] ?? [];
  const allProducts = productsByCategory(kategori);
  const [state, setState] = useState<FilterState>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = applyFilters(allProducts, state);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb
        items={[
          { label: "Ana sayfa", to: "/" },
          { label: "Ürünler", to: "/urunler" },
          { label: category.name },
        ]}
      />

      <SectionHeading
        className="mt-6"
        eyebrow={category.available ? `${allProducts.length} ürün` : "Hazırlanıyor"}
        title={category.name}
        description={category.blurb}
      />

      {!category.available && (
        <div className="mt-10 rounded-3xl bg-sage-tint/40 p-8 text-center">
          <p className="eyebrow">Çok yakında</p>
          <h3 className="mt-3 font-serif text-2xl">Bu kategori için içerik hazırlığı sürüyor.</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Şimdilik <Link to="/urunler/$kategori" params={{ kategori: "bebek-arabasi" }} className="text-sage underline underline-offset-4">bebek arabası</Link> kategorisini deneyebilirsin.
          </p>
        </div>
      )}

      {/* Wizard banner */}
      {category.available && (
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-sage p-6 text-white sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15">
              <Sparkles className="size-4" />
            </span>
            <div>
              <h3 className="font-serif text-xl">Hangi model sana uygun, biz bulalım</h3>
              <p className="mt-1 text-sm text-white/80">4 soruda, e-posta istemeden.</p>
            </div>
          </div>
          <LinkButton to="/sihirbaz" variant="secondary" size="md" className="text-ink">
            Sihirbazı aç
          </LinkButton>
        </div>
      )}

      {category.available && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Filters — desktop */}
          <div className="hidden lg:block">
            <DynamicFilterPanel definitions={definitions} value={state} onChange={setState} />
          </div>

          {/* Filters — mobile trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center gap-2 rounded-full border border-ink/10 px-4 py-3 text-sm font-medium lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filtreler
          </button>

          {/* Product grid */}
          <div>
            <div className="mb-4 flex items-center justify-between text-sm text-ink-muted">
              <span>{filtered.length} ürün gösteriliyor</span>
              <select className="rounded-full border border-ink/10 bg-canvas px-3 py-1.5 text-xs">
                <option>Öne çıkanlar</option>
                <option>En düşük fiyat</option>
                <option>En yüksek puan</option>
                <option>En çok yorumlanan</option>
              </select>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full rounded-2xl bg-canvas p-8 text-center text-sm text-ink-muted ring-hairline">
                  Bu filtrelerle eşleşen ürün yok. Filtreleri sıfırlamayı deneyin.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="max-h-[80vh] w-full overflow-y-auto rounded-t-3xl bg-canvas p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-2xl">Filtreler</h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <DynamicFilterPanel definitions={definitions} value={state} onChange={setState} />
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full rounded-full bg-sage py-3 text-sm font-medium text-white"
            >
              {filtered.length} ürünü göster
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
