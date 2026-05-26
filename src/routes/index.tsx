import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/mk/Button";
import { SectionHeading } from "@/components/mk/SectionHeading";
import { Badge } from "@/components/mk/Badge";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ProductCard } from "@/components/product/ProductCard";
import { articles } from "@/data/articles";
import { products } from "@/data/products";
import { journeyStages, categories } from "@/data/categories";
import { priceDropPercent } from "@/data/products";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "minikgo — Yeni ebeveynler için karar rehberi" },
      {
        name: "description",
        content:
          "Bebek arabasından oto koltuğuna, sizin durumunuza özel öneriler. Tarafsız karşılaştırma, sakin rehberler.",
      },
      { property: "og:title", content: "minikgo — Yeni ebeveynler için karar rehberi" },
      { property: "og:description", content: "Akakçe değil, karar asistanı." },
    ],
  }),
  component: Home,
});

function Home() {
  const featuredArticles = articles.slice(0, 3);
  const priceDrops = [...products].sort((a, b) => priceDropPercent(b) - priceDropPercent(a)).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="px-5 pb-16 pt-16 sm:pt-24">
        <Container className="flex flex-col items-center text-center" size="narrow">
          <span className="eyebrow text-sage">Karar destekli ebeveynlik rehberi</span>
          <h1 className="mt-6 max-w-[18ch] font-serif text-5xl leading-[1.05] text-balance sm:text-6xl">
            Bebeğiniz için doğru karar, telaşsız.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft sm:text-lg">
            Onlarca özellik, yüzlerce model — biz sizin yerinize eledik. Yaşam tarzınızı ve
            bütçenizi söyleyin, sadece anlamlı olanları gösterelim.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/sihirbaz" size="lg">
              <Sparkles className="size-4" /> Ürün için yardım al
            </LinkButton>
            <LinkButton to="/hamilelik" variant="secondary" size="lg">
              <Heart className="size-4" /> Hamileyim, yol göster
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* Journey selector */}
      <section className="bg-sage-tint/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Sen hangi aşamadasın?"
            title="Aşamana uygun rehberi seç"
            description="Her dönem farklı kararlar. Doğru sırayla, doğru bilgiyi gösteriyoruz."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journeyStages.map((s) => (
              <Link
                key={s.slug}
                to="/hamilelik"
                className="group rounded-3xl bg-canvas p-8 ring-hairline transition-all hover:-translate-y-1"
              >
                <Badge tone="sage">{s.range}</Badge>
                <h3 className="mt-4 font-serif text-2xl">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-sage">
                  Keşfet <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured guides */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Karar rehberleri"
            title="Önce bunları oku"
            description="Tarafsız test, gerçek kullanıcı verisi, anlaşılır dil."
            action={
              <Link to="/rehber" className="text-sm text-sage underline-offset-4 hover:underline">
                Tümünü gör →
              </Link>
            }
          />
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {featuredArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Popular comparison teasers */}
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading
            eyebrow="Popüler karşılaştırmalar"
            title="Bu hafta en çok karşılaştırılanlar"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { left: "yıldız-city-pro", right: "luna-explorer-x", title: "Hafif şehir mi, premium konfor mu?" },
              { left: "yıldız-city-pro", right: "kestane-travel-mini", title: "Şehir hafifi vs seyahat hafifi" },
            ].map((d, i) => {
              const a = products.find((p) => p.slug === d.left);
              const b = products.find((p) => p.slug === d.right);
              if (!a || !b) return null;
              return (
                <Link
                  key={i}
                  to="/karsilastir"
                  search={{ ids: `${a.slug},${b.slug}` }}
                  className="group rounded-3xl bg-sage-tint/40 p-6 ring-hairline transition-all hover:-translate-y-0.5"
                >
                  <p className="eyebrow">Düello</p>
                  <h3 className="mt-3 font-serif text-2xl">{d.title}</h3>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-ink-muted">{a.brand}</p>
                      <p className="font-medium">{a.name}</p>
                    </div>
                    <span className="font-serif text-3xl italic text-ink-muted">vs</span>
                    <div className="flex-1 text-right">
                      <p className="text-xs text-ink-muted">{b.brand}</p>
                      <p className="font-medium">{b.name}</p>
                    </div>
                  </div>
                  <span className="mt-6 inline-flex text-sm text-sage">Karşılaştırmaya bak →</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Price drops */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Bu ay fiyatı düşenler"
            title="Beklemeye değer mi? Verisini gösteriyoruz."
            description="Sahte indirim değil; 90 günlük gerçek fiyat geçmişine göre."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {priceDrops.map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
          </div>
        </Container>
      </section>

      {/* Quiet social proof + trust */}
      <section className="bg-sage-tint/40 py-20">
        <Container className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Sakin sosyal kanıt</p>
            <p className="mt-4 font-serif text-3xl leading-tight">
              "Bu hafta 148 aile fiyat alarmı kurdu."
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              Kullanıcı sayılarını şişirmiyoruz. Sayıları gerçek kullanıma göre, sakin bir tonda paylaşıyoruz.
            </p>
          </div>
          <div className="rounded-3xl bg-canvas p-8 ring-hairline">
            <p className="eyebrow">Nasıl çalışıyoruz?</p>
            <h3 className="mt-3 font-serif text-2xl">Tarafsızlık tesadüf değil</h3>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              <li>· Ücretli inceleme yok — markalardan reklam almıyoruz.</li>
              <li>· Affiliate gelirimizi şeffaf bildiriyoruz.</li>
              <li>· Yorumları manuel değil, doğal dil işlemeyle analiz ediyoruz.</li>
              <li>· Fiyatları saatte bir, birden çok satıcıdan çekiyoruz.</li>
            </ul>
            <Link to="/hakkimizda" className="mt-6 inline-flex text-sm text-sage underline-offset-4 hover:underline">
              Metodolojiyi oku →
            </Link>
          </div>
        </Container>
      </section>

      {/* Category teaser */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Kategoriler"
            title="Her ihtiyaç için ayrı bir rehber"
            description="Şimdilik bebek arabası kategorisi tam dolu. Diğerleri sırada."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/urunler/$kategori"
                params={{ kategori: c.slug }}
                className="group flex items-center justify-between rounded-2xl bg-canvas p-5 ring-hairline transition-all hover:border-sage"
              >
                <div>
                  <p className="font-serif text-lg">{c.name}</p>
                  <p className="text-xs text-ink-muted">
                    {c.available ? `${c.productCount} ürün` : "Yakında"}
                  </p>
                </div>
                <ArrowRight className="size-4 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-sage" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
