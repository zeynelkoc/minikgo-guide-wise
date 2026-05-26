import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { SectionHeading } from "@/components/mk/SectionHeading";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { products } from "@/data/products";
import { z } from "zod";

const search = z.object({ ids: z.string().optional() });

export const Route = createFileRoute("/karsilastir")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Ürün karşılaştırma — minikgo" },
      { name: "description", content: "2-3 ürünü yan yana karşılaştırın." },
      { property: "og:title", content: "Karşılaştırma — minikgo" },
      { property: "og:description", content: "Ürün karşılaştırma aracı." },
    ],
  }),
  component: Karsilastir,
});

function Karsilastir() {
  const { ids } = Route.useSearch();
  const slugs = (ids ?? "yıldız-city-pro,luna-explorer-x,kestane-travel-mini").split(",").slice(0, 3);
  const selected = slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Karşılaştır" }]} />
      <SectionHeading
        className="mt-6"
        eyebrow="Karşılaştırma"
        title="Yan yana, satır satır"
        description="Spec savaşı değil — gerçekten önemli olan farklar."
      />

      <div className="mt-10">
        <ComparisonTable products={selected} />
      </div>

      <aside className="mt-10 rounded-3xl bg-sage-tint/40 p-6 text-sm text-ink-soft">
        Karşılaştırma için ürün eklemek/kaldırmak ister misin?{" "}
        <Link to="/urunler" className="text-sage underline underline-offset-4">Kategoriden ürün seç</Link>.
      </aside>
    </Container>
  );
}
