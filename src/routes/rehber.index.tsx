import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/mk/SectionHeading";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { ArticleCard } from "@/components/article/ArticleCard";
import { articles } from "@/data/articles";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ArticleType } from "@/data/types";

export const Route = createFileRoute("/rehber/")({
  head: () => ({
    meta: [
      { title: "Karar rehberleri — minikgo" },
      { name: "description", content: "Bebek ürünleri için tarafsız karar rehberleri, checklistler ve sıralı listeler." },
      { property: "og:title", content: "Karar rehberleri — minikgo" },
      { property: "og:description", content: "Karar rehberleri ve checklistler." },
    ],
  }),
  component: RehberIndex,
});

const typeFilters: { id: ArticleType | "all"; label: string }[] = [
  { id: "all", label: "Hepsi" },
  { id: "guide", label: "Karar rehberi" },
  { id: "checklist", label: "Checklist" },
  { id: "ranking", label: "En iyiler" },
  { id: "info", label: "Bilgi" },
];

function RehberIndex() {
  const [type, setType] = useState<(typeof typeFilters)[number]["id"]>("all");
  const filtered = type === "all" ? articles : articles.filter((a) => a.type === type);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Rehber" }]} />
      <SectionHeading
        className="mt-6"
        eyebrow="Rehber"
        title="Önce karar, sonra alışveriş"
        description="Konuya göre süzülmüş, sakin ve gerekçeli içerikler."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {typeFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setType(f.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs transition-all",
              type === f.id
                ? "border-sage bg-sage text-white"
                : "border-ink/10 text-ink-soft hover:border-sage",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </Container>
  );
}
