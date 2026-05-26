import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";

export const Route = createFileRoute("/gizlilik")({
  head: () => ({
    meta: [
      { title: "Gizlilik politikası — minikgo" },
      { name: "description", content: "Verilerinizi nasıl ve neden işlediğimize dair sade bir açıklama." },
    ],
  }),
  component: Gizlilik,
});

function Gizlilik() {
  return (
    <Container className="py-12 sm:py-16" size="narrow">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Gizlilik" }]} />
      <h1 className="mt-8 font-serif text-5xl">Gizlilik politikası</h1>
      <p className="mt-3 text-sm text-ink-muted">Son güncelleme: Mart 2026</p>

      <div className="mt-10 space-y-8 text-ink-soft">
        <section>
          <h2 className="font-serif text-2xl text-ink">Ne topluyoruz?</h2>
          <p className="mt-3 leading-relaxed">
            Sadece hizmetin çalışması için gerekli minimum veriyi topluyoruz: temel kullanım
            istatistikleri (anonim), tercih ettiyseniz e-posta adresiniz ve fiyat alarmı tercihleriniz.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">Çerezler</h2>
          <p className="mt-3 leading-relaxed">
            Yalnızca temel oturum ve tercih çerezleri kullanıyoruz. Üçüncü taraf reklam çerezi yok.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">Haklarınız</h2>
          <p className="mt-3 leading-relaxed">
            KVKK kapsamında verilerinize erişme, düzeltme ve silme talebinde bulunma hakkınız vardır.
            Talepleriniz için <a href="mailto:gizlilik@minikgo.com" className="text-sage underline">gizlilik@minikgo.com</a>.
          </p>
        </section>
      </div>
    </Container>
  );
}
