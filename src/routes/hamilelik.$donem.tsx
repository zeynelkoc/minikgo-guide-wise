import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { Badge } from "@/components/mk/Badge";
import { findPeriod, pregnancyPeriods } from "@/data/pregnancy";
import { findProduct } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/hamilelik/$donem")({
  head: ({ params }) => {
    const period = findPeriod(params.donem);
    return {
      meta: [
        { title: `${period?.name ?? "Dönem"} — Hamilelik rehberi | minikgo` },
        { name: "description", content: period?.summary ?? "Hamilelik dönem rehberi" },
        { property: "og:title", content: `${period?.name ?? "Dönem"} — minikgo` },
        { property: "og:description", content: period?.summary ?? "" },
      ],
    };
  },
  component: DonemDetail,
});

function DonemDetail() {
  const { donem } = Route.useParams();
  const period = findPeriod(donem);
  if (!period) throw notFound();

  return (
    <Container className="py-12 sm:py-16" size="narrow">
      <Breadcrumb
        items={[
          { label: "Ana sayfa", to: "/" },
          { label: "Hamilelik", to: "/hamilelik" },
          { label: period.name },
        ]}
      />

      <header className="mt-8">
        <Badge tone="sage">{period.weeks}</Badge>
        <h1 className="mt-4 font-serif text-5xl leading-tight">{period.name}</h1>
        <p className="mt-4 text-lg text-ink-soft">{period.summary}</p>
      </header>

      <div className="mt-12 space-y-10">
        {period.body.map((b) => (
          <section key={b.heading}>
            <h2 className="font-serif text-2xl">{b.heading}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{b.text}</p>
          </section>
        ))}
      </div>

      {period.productSlugs.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl">Bu döneme uygun ürünler</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {period.productSlugs.map((s) => {
              const p = findProduct(s);
              if (!p) return null;
              return <ProductCard key={p.slug} product={p} />;
            })}
          </div>
        </section>
      )}

      <nav className="mt-16 flex items-center justify-between border-t border-ink/5 pt-8 text-sm">
        {pregnancyPeriods.map((p) => (
          <Link
            key={p.slug}
            to="/hamilelik/$donem"
            params={{ donem: p.slug }}
            className={p.slug === period.slug ? "text-ink" : "text-ink-muted hover:text-sage"}
          >
            {p.name}
          </Link>
        ))}
      </nav>
    </Container>
  );
}
