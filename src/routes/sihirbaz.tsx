import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/mk/Button";
import { products, lowestPrice } from "@/data/products";
import { ImagePlaceholder } from "@/components/mk/ImagePlaceholder";
import { Badge } from "@/components/mk/Badge";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Mail, Bell, Sparkles } from "lucide-react";

export const Route = createFileRoute("/sihirbaz")({
  head: () => ({
    meta: [
      { title: "Ürün öneri sihirbazı — minikgo" },
      { name: "description", content: "4 soruda size uygun ürün önerisi. E-posta yok, giriş yok." },
      { property: "og:title", content: "Ürün öneri sihirbazı — minikgo" },
      { property: "og:description", content: "Senin durumuna göre öneri." },
    ],
  }),
  component: Sihirbaz,
});

interface Step {
  id: string;
  question: string;
  options: { value: string; label: string; hint?: string }[];
}

const steps: Step[] = [
  {
    id: "stage",
    question: "Bebek hangi aşamada?",
    options: [
      { value: "hamilelik", label: "Hamilelik dönemindeyim" },
      { value: "0-6", label: "0-6 ay" },
      { value: "6-18", label: "6-18 ay" },
      { value: "18+", label: "18 ay üzeri" },
    ],
  },
  {
    id: "use",
    question: "Ağırlıklı nerede kullanacaksın?",
    options: [
      { value: "sehir", label: "Şehir içi, asansör ve dar kaldırım", hint: "Hafiflik öne çıkar" },
      { value: "araba", label: "Sık sık arabanın bagajına" },
      { value: "seyahat", label: "Uçak / seyahat ağırlıklı" },
      { value: "arazi", label: "Park, doğa, engebeli yüzey" },
    ],
  },
  {
    id: "budget",
    question: "Bütçe aralığın?",
    options: [
      { value: "low", label: "5.000 TL altı" },
      { value: "mid", label: "5.000 - 12.000 TL" },
      { value: "high", label: "12.000 - 25.000 TL" },
      { value: "premium", label: "25.000 TL üzeri" },
    ],
  },
  {
    id: "priority",
    question: "En önemli öncelik?",
    options: [
      { value: "light", label: "Hafiflik" },
      { value: "fold", label: "Katlanma kolaylığı" },
      { value: "comfort", label: "Konfor ve süspansiyon" },
      { value: "durability", label: "Dayanıklılık" },
    ],
  },
];

function Sihirbaz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = index >= steps.length;
  const progress = (index / steps.length) * 100;

  function pick(value: string) {
    const id = steps[index].id;
    setAnswers((a) => ({ ...a, [id]: value }));
    setIndex((i) => i + 1);
  }

  function back() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function restart() {
    setAnswers({});
    setIndex(0);
  }

  // Basit puanlama
  const recommendations = !done
    ? []
    : [...products]
        .map((p) => {
          let score = 0;
          if (answers.priority === "light" && (p.attributes.weight as number) < 7) score += 3;
          if (answers.priority === "fold" && p.attributes.foldType === "tek-el") score += 2;
          if (answers.priority === "comfort" && (p.attributes.weight as number) > 8) score += 2;
          if (answers.use === "seyahat" && p.attributes.usage === "seyahat") score += 3;
          if (answers.use === "sehir" && p.attributes.usage === "sehir") score += 2;
          const price = lowestPrice(p);
          if (answers.budget === "low" && price < 5000) score += 2;
          if (answers.budget === "mid" && price >= 5000 && price <= 12000) score += 3;
          if (answers.budget === "high" && price > 12000 && price <= 25000) score += 3;
          if (answers.budget === "premium" && price > 25000) score += 2;
          return { p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

  return (
    <Container className="py-12 sm:py-20" size="narrow">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between text-xs text-ink-muted">
          <span className="eyebrow">Sihirbaz</span>
          <span>{Math.min(index + 1, steps.length)} / {steps.length}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-ink/5">
          <div className="h-full bg-sage transition-all duration-500" style={{ width: `${done ? 100 : progress}%` }} />
        </div>
      </div>

      {!done ? (
        <div key={index} className="animate-in fade-in slide-in-from-bottom-3 duration-300">
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{steps[index].question}</h1>
          <div className="mt-8 grid gap-3">
            {steps[index].options.map((o) => (
              <button
                key={o.value}
                onClick={() => pick(o.value)}
                className={cn(
                  "group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-canvas px-6 py-5 text-left transition-all",
                  "hover:border-sage hover:bg-sage hover:text-white",
                )}
              >
                <div>
                  <p className="font-medium">{o.label}</p>
                  {o.hint && <p className="mt-1 text-xs text-ink-muted group-hover:text-white/70">{o.hint}</p>}
                </div>
                <ArrowRight className="size-4 opacity-50 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
              </button>
            ))}
          </div>
          {index > 0 && (
            <button onClick={back} className="mt-8 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-sage">
              <ArrowLeft className="size-3" /> Geri
            </button>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <Badge tone="sage">
            <Sparkles className="size-3" /> Sonuç hazır
          </Badge>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Senin durumun için 3 öneri
          </h1>
          <p className="mt-3 text-ink-soft">
            Yanıtlarına göre puanlanmış. İstediğin zaman tekrar yanıtlayabilirsin.
          </p>

          <div className="mt-10 space-y-5">
            {recommendations.map(({ p }, i) => (
              <div key={p.slug} className="flex flex-col gap-5 rounded-3xl bg-canvas p-5 ring-hairline sm:flex-row">
                <ImagePlaceholder prompt={p.name} ratio="square" className="sm:w-44" label={p.brand} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl text-sage">{i + 1}</span>
                    <div>
                      <p className="eyebrow !text-[10px]">{p.brand}</p>
                      <h3 className="font-serif text-xl">{p.name}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ink-soft">{p.blurb}</p>
                  <p className="mt-3 rounded-2xl bg-sage-tint/60 p-3 text-xs text-ink">
                    Senin için: {reasonFor(answers, p)}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-xl">{lowestPrice(p).toLocaleString("tr-TR")} TL</span>
                    <Link
                      to="/urunler/$kategori/$slug"
                      params={{ kategori: p.categorySlug, slug: p.slug }}
                      className="rounded-full bg-sage px-5 py-2.5 text-xs font-medium text-white"
                    >
                      Satıcıda gör
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gönüllü seçenekler */}
          <section className="mt-12 rounded-3xl bg-sage-tint/40 p-6 sm:p-8">
            <p className="eyebrow">İsteğe bağlı</p>
            <h3 className="mt-3 font-serif text-2xl">Sonucu yanında taşı</h3>
            <p className="mt-2 text-sm text-ink-soft">
              E-posta veya giriş zorunlu değil. Bu adımlar tamamen sana kalmış.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button variant="secondary" size="md">
                <Mail className="size-4" /> Bu listeyi e-postama gönder
              </Button>
              <Button variant="secondary" size="md">
                <Bell className="size-4" /> Fiyat düşünce haber ver
              </Button>
            </div>
          </section>

          <button onClick={restart} className="mt-8 text-sm text-ink-muted underline-offset-4 hover:text-sage hover:underline">
            Tekrar yanıtla
          </button>
        </div>
      )}
    </Container>
  );
}

function reasonFor(answers: Record<string, string>, p: any) {
  const parts: string[] = [];
  if (answers.priority === "light" && (p.attributes.weight as number) < 7) parts.push("hafif gövde");
  if (answers.priority === "fold" && p.attributes.foldType === "tek-el") parts.push("tek elle katlanır");
  if (answers.priority === "comfort" && (p.attributes.weight as number) > 8) parts.push("güçlü süspansiyon");
  if (answers.use === "seyahat" && p.attributes.usage === "seyahat") parts.push("seyahat odaklı");
  if (answers.use === "sehir" && p.attributes.usage === "sehir") parts.push("şehir kullanımı");
  return parts.length ? parts.join(", ") + " — yanıtlarınla örtüşüyor." : "Genel skoruna göre üst sıralarda.";
}
