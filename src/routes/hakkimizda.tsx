import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";

export const Route = createFileRoute("/hakkimizda")({
  head: () => ({
    meta: [
      { title: "Hakkımızda — minikgo" },
      { name: "description", content: "Nasıl çalışıyoruz, fiyat ve öneri skorları nasıl oluşuyor, tarafsızlığımızı nasıl koruyoruz." },
      { property: "og:title", content: "Hakkımızda — minikgo" },
      { property: "og:description", content: "Metodoloji ve tarafsızlık." },
    ],
  }),
  component: Hakkimizda,
});

function Hakkimizda() {
  return (
    <Container className="py-12 sm:py-20" size="narrow">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "Hakkımızda" }]} />
      <header className="mt-8">
        <p className="eyebrow">Hakkımızda</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
          Yeni ebeveynler için sakin, tarafsız bir rehber.
        </h1>
        <p className="mt-6 text-lg text-ink-soft">
          minikgo'yu kuranlar olarak biz de bu yolculuktan geçtik. Spec listeleri arasında
          kaybolmak, sahte indirimlere kanmak ve "Pinterest çantası" listeleriyle gereksiz
          alışveriş yapmak istemedik. Bu site, kendimize ve arkadaşlarımıza söyleyeceklerimizin
          dijital hâli.
        </p>
      </header>

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="font-serif text-3xl">Fiyat verisi nasıl oluşuyor?</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Her ürünün fiyatını saat başı, birden çok satıcıdan otomatik olarak topluyoruz.
            Sepet/kupon indirimlerini dahil etmiyoruz — sayfada gördüğünüz, satıcının
            listelediği gerçek fiyat. 90 günlük geçmişi grafikte gösteriyor, "şimdi al / bekle"
            sinyalini de bu seriye dayandırıyoruz.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Öneri skoru nasıl çalışıyor?</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Sihirbaz sonuçları ve "Editör Seçimi" gibi rozetler, ürünün teknik özelliklerini,
            fiyat/performansını ve gerçek kullanıcı yorum analizini birlikte değerlendiren bir
            puanlama ile belirleniyor. Hiçbir marka bu skorun yerini satın alamaz.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Yorum analizi nasıl?</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Birden çok satıcıdan topladığımız yorumları doğal dil işleme ile sınıflandırıyor,
            tekrarlayan övgü ve şikayetleri çubuk haritada gösteriyoruz. Örneklem küçükse
            "Düşük güven" etiketiyle açıkça uyarıyoruz.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl">Para nasıl kazanıyoruz?</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Site içindeki bazı satıcı bağlantıları affiliate linklerdir; üzerinden alışveriş
            yapıldığında küçük bir komisyon alırız. Bu, "satıcıda gör" listesinin sırasını veya
            önerileri etkilemez. Ücretli inceleme yapmıyoruz; markalardan reklam kabul etmiyoruz.
          </p>
        </section>
      </div>
    </Container>
  );
}
