import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/mk/SectionHeading";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { babyNames } from "@/data/names";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { BabyName } from "@/data/types";

export const Route = createFileRoute("/isimler/")({
  head: () => ({
    meta: [
      { title: "Bebek isimleri — minikgo" },
      { name: "description", content: "Türkçe, Arapça, Farsça, Latince köken — kız, erkek, uniseks isimler keşfedin." },
      { property: "og:title", content: "Bebek isimleri — minikgo" },
      { property: "og:description", content: "Köken ve anlamlarıyla isim keşif aracı." },
    ],
  }),
  component: IsimlerIndex,
});

type GenderFilter = "all" | BabyName["gender"];

function IsimlerIndex() {
  const [gender, setGender] = useState<GenderFilter>("all");
  const [letter, setLetter] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return babyNames.filter((n) => {
      if (gender !== "all" && n.gender !== gender) return false;
      if (letter && n.letter !== letter) return false;
      if (query && !n.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [gender, letter, query]);

  const letters = Array.from(new Set(babyNames.map((n) => n.letter))).sort();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "İsimler" }]} />
      <SectionHeading
        className="mt-6"
        eyebrow="Keşif aracı"
        title="Anlamlı bir isim bulun"
        description="Köken, anlam ve popülerlik bilgisiyle birlikte. Hiçbir veri toplamıyoruz, sadece keşfedin."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-7 rounded-3xl bg-canvas p-6 ring-hairline">
          <div>
            <h3 className="mb-3 text-sm font-medium">Ara</h3>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="İsim ara..."
              className="w-full rounded-full border border-ink/10 bg-canvas px-4 py-2 text-sm focus:border-sage focus:outline-none"
            />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Cinsiyet</h3>
            <div className="flex flex-wrap gap-2">
              {(["all", "kız", "erkek", "uniseks"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs capitalize transition-all",
                    gender === g
                      ? "border-sage bg-sage text-white"
                      : "border-ink/10 text-ink-soft hover:border-sage",
                  )}
                >
                  {g === "all" ? "Hepsi" : g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Harf</h3>
            <div className="grid grid-cols-7 gap-1.5">
              {letters.map((l) => (
                <button
                  key={l}
                  onClick={() => setLetter(letter === l ? null : l)}
                  className={cn(
                    "grid aspect-square place-items-center rounded-lg text-xs font-medium transition-colors",
                    letter === l ? "bg-sage text-white" : "bg-ink/5 text-ink-soft hover:bg-sage-tint",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-ink-muted">{filtered.length} isim bulundu</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n) => (
              <li key={n.slug}>
                <Link
                  to="/isimler/$isim"
                  params={{ isim: n.slug }}
                  className="group block rounded-2xl bg-canvas p-5 ring-hairline transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-2xl group-hover:text-sage">{n.name}</span>
                    <span className="eyebrow !text-[10px]">{n.gender}</span>
                  </div>
                  <p className="mt-2 text-xs text-ink-muted">{n.origin} · popülerlik %{n.popularity}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
