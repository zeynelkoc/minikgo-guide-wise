import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { Badge } from "@/components/mk/Badge";
import { findName, babyNames } from "@/data/names";

export const Route = createFileRoute("/isimler/$isim")({
  head: ({ params }) => {
    const n = findName(params.isim);
    return {
      meta: [
        { title: `${n?.name ?? "İsim"} — anlamı ve kökeni | minikgo` },
        { name: "description", content: n?.meaning ?? "Bebek ismi detayı" },
        { property: "og:title", content: `${n?.name ?? "İsim"} — minikgo` },
        { property: "og:description", content: n?.meaning ?? "" },
      ],
    };
  },
  component: IsimDetail,
});

function IsimDetail() {
  const { isim } = Route.useParams();
  const name = findName(isim);
  if (!name) throw notFound();
  const related = babyNames.filter((n) => n.gender === name.gender && n.slug !== name.slug).slice(0, 6);
  return (
    <Container className="py-12 sm:py-16" size="narrow">
      <Breadcrumb
        items={[
          { label: "Ana sayfa", to: "/" },
          { label: "İsimler", to: "/isimler" },
          { label: name.name },
        ]}
      />

      <header className="mt-8 text-center">
        <Badge tone="sage">{name.gender}</Badge>
        <h1 className="mt-4 font-serif text-7xl leading-none">{name.name}</h1>
        <p className="mt-4 text-ink-soft">{name.origin} kökenli</p>
      </header>

      <section className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-canvas p-6 ring-hairline">
          <p className="eyebrow">Anlam</p>
          <p className="mt-3 font-serif text-2xl leading-snug">{name.meaning}</p>
        </div>
        <div className="rounded-3xl bg-canvas p-6 ring-hairline">
          <p className="eyebrow">Popülerlik</p>
          <p className="mt-3 font-serif text-2xl">%{name.popularity}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/5">
            <div className="h-full bg-sage" style={{ width: `${name.popularity}%` }} />
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Son 12 ayda Türkiye genelinde nüfus müdürlüklerinde kayıt sıklığına göre.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl">Benzer isimler</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {related.map((n) => (
            <li key={n.slug}>
              <Link
                to="/isimler/$isim"
                params={{ isim: n.slug }}
                className="block rounded-2xl bg-canvas p-4 text-center ring-hairline hover:border-sage"
              >
                <p className="font-serif text-xl">{n.name}</p>
                <p className="mt-1 text-xs text-ink-muted">{n.origin}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
