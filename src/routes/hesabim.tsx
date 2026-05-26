import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { Badge } from "@/components/mk/Badge";
import { Button } from "@/components/mk/Button";
import { products, lowestPrice } from "@/data/products";
import { Bell, BookmarkCheck, User } from "lucide-react";

export const Route = createFileRoute("/hesabim")({
  head: () => ({
    meta: [
      { title: "Hesabım — minikgo" },
      { name: "description", content: "Fiyat alarmlarınızı ve kayıtlı önerilerinizi yönetin." },
      { property: "og:title", content: "Hesabım — minikgo" },
      { property: "og:description", content: "Hesap paneli." },
    ],
  }),
  component: Hesabim,
});

function Hesabim() {
  const alarms = products.slice(0, 2);
  const lists = products.slice(0, 3);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Hesabım" }]} />

      <header className="mt-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-full bg-sage text-white">
            <User className="size-5" />
          </span>
          <div>
            <h1 className="font-serif text-3xl">Merhaba</h1>
            <p className="text-sm text-ink-muted">Google hesabınızla giriş yaptınız — demo görünümü</p>
          </div>
        </div>
        <Button variant="secondary" size="sm">Çıkış yap</Button>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Fiyat alarmları */}
        <section className="rounded-3xl bg-canvas p-6 ring-hairline">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-sage" />
              <h2 className="font-serif text-2xl">Fiyat alarmları</h2>
            </div>
            <Badge tone="sage">{alarms.length}</Badge>
          </div>
          <ul className="space-y-4">
            {alarms.map((p) => (
              <li key={p.slug} className="flex items-center justify-between border-t border-ink/5 pt-4 first:border-0 first:pt-0">
                <div>
                  <Link
                    to="/urunler/$kategori/$slug"
                    params={{ kategori: p.categorySlug, slug: p.slug }}
                    className="font-medium hover:text-sage"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-ink-muted">Eşik: {Math.round(lowestPrice(p) * 0.9).toLocaleString("tr-TR")} TL</p>
                </div>
                <span className="font-serif text-lg">{lowestPrice(p).toLocaleString("tr-TR")} TL</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Kaydedilen listeler */}
        <section className="rounded-3xl bg-canvas p-6 ring-hairline">
          <div className="mb-5 flex items-center gap-2">
            <BookmarkCheck className="size-4 text-sage" />
            <h2 className="font-serif text-2xl">Kayıtlı sihirbaz sonucu</h2>
          </div>
          <p className="text-sm text-ink-muted">12 Mart 2026 — "Şehir içi kullanım, orta bütçe, hafiflik öncelikli"</p>
          <ul className="mt-5 space-y-3">
            {lists.map((p) => (
              <li key={p.slug} className="flex items-center justify-between">
                <Link
                  to="/urunler/$kategori/$slug"
                  params={{ kategori: p.categorySlug, slug: p.slug }}
                  className="text-sm hover:text-sage"
                >
                  · {p.brand} {p.name}
                </Link>
                <span className="text-xs text-ink-muted">{lowestPrice(p).toLocaleString("tr-TR")} TL</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
