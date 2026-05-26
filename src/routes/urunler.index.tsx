import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/mk/SectionHeading";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { categories } from "@/data/categories";
import { Badge } from "@/components/mk/Badge";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/urunler/")({
  head: () => ({
    meta: [
      { title: "Tüm kategoriler — minikgo" },
      { name: "description", content: "Bebek arabasından oto koltuğuna, tüm kategoriler tek listede." },
      { property: "og:title", content: "Kategoriler — minikgo" },
      { property: "og:description", content: "Tüm ürün kategorileri." },
    ],
  }),
  component: UrunlerIndex,
});

function UrunlerIndex() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Ürünler" }]} />
      <SectionHeading
        className="mt-6"
        eyebrow="Kategoriler"
        title="Hangi karara yardım edelim?"
        description="Her kategori için filtre, dinamik karşılaştırma ve karar destekli rehberler."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/urunler/$kategori"
            params={{ kategori: c.slug }}
            className="group flex flex-col rounded-3xl bg-canvas p-6 ring-hairline transition-all hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              {c.available ? <Badge tone="sage">Hazır</Badge> : <Badge>Yakında</Badge>}
              <ArrowRight className="size-4 text-ink-muted transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="mt-6 font-serif text-2xl">{c.name}</h3>
            <p className="mt-2 text-sm text-ink-soft">{c.blurb}</p>
            <p className="mt-4 text-xs text-ink-muted">
              {c.available ? `${c.productCount} ürün karşılaştırılıyor` : "İçerik hazırlanıyor"}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
