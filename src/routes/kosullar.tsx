import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";

export const Route = createFileRoute("/kosullar")({
  head: () => ({
    meta: [
      { title: "Kullanım koşulları — minikgo" },
      { name: "description", content: "minikgo'yu kullanırken geçerli olan sade koşullar." },
    ],
  }),
  component: Kosullar,
});

function Kosullar() {
  return (
    <Container className="py-12 sm:py-16" size="narrow">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Kullanım koşulları" }]} />
      <h1 className="mt-8 font-serif text-5xl">Kullanım koşulları</h1>
      <p className="mt-3 text-sm text-ink-muted">Son güncelleme: Mart 2026</p>

      <div className="mt-10 space-y-8 text-ink-soft">
        <section>
          <h2 className="font-serif text-2xl text-ink">İçerik kullanımı</h2>
          <p className="mt-3 leading-relaxed">
            minikgo'daki rehber, karşılaştırma ve değerlendirmeler kişisel kullanım içindir.
            İzinsiz çoğaltılamaz, ticari amaçla yeniden yayınlanamaz.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">Sorumluluk reddi</h2>
          <p className="mt-3 leading-relaxed">
            Fiyat ve özellikleri elimizden geldiğince doğru tutmaya çalışıyoruz; ancak satıcı
            sitelerindeki anlık değişikliklerden minikgo sorumlu değildir. Tıbbi konularda
            doktorunuza danışın — minikgo tıbbi tavsiye vermez.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-ink">Affiliate ilişkisi</h2>
          <p className="mt-3 leading-relaxed">
            Bazı satıcı linkleri affiliate'tir. Bu durum site içeriğinin sırasını veya
            önerilerini etkilemez. Detay için <a href="/hakkimizda" className="text-sage underline">Hakkımızda</a> sayfasını okuyabilirsiniz.
          </p>
        </section>
      </div>
    </Container>
  );
}
