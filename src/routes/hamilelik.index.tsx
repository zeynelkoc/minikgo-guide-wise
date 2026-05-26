import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/mk/SectionHeading";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { pregnancyPeriods } from "@/data/pregnancy";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/hamilelik/")({
  head: () => ({
    meta: [
      { title: "Hamilelik rehberi — minikgo" },
      { name: "description", content: "Trimester bazlı hazırlık ve alışveriş rehberi. Tıbbi tavsiye değil, pratik karar desteği." },
      { property: "og:title", content: "Hamilelik rehberi — minikgo" },
      { property: "og:description", content: "Trimester bazlı hazırlık." },
    ],
  }),
  component: HamilelikIndex,
});

function HamilelikIndex() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Hamilelik" }]} />
      <SectionHeading
        className="mt-6"
        eyebrow="Yolculuk"
        title="Hamilelik — adım adım, telaşsız"
        description="9 aylık süreyi 3 trimester'a ayırdık. Her dönem için pratik bir hazırlık ve alışveriş rehberi."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pregnancyPeriods.map((p) => (
          <Link
            key={p.slug}
            to="/hamilelik/$donem"
            params={{ donem: p.slug }}
            className="group rounded-3xl bg-canvas p-8 ring-hairline transition-all hover:-translate-y-1"
          >
            <p className="eyebrow">{p.weeks}</p>
            <h2 className="mt-3 font-serif text-2xl">{p.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm text-sage">
              Aç <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <aside className="mt-16 rounded-3xl bg-sage-tint/40 p-8 sm:p-10">
        <p className="eyebrow">Not</p>
        <p className="mt-3 max-w-2xl font-serif text-2xl leading-snug">
          minikgo tıbbi tavsiye vermez. İçeriklerimiz alışveriş, planlama ve karar desteğine odaklanır.
        </p>
      </aside>
    </Container>
  );
}
