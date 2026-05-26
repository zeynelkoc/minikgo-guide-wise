import type { PregnancyPeriod } from "./types";

export const pregnancyPeriods: PregnancyPeriod[] = [
  {
    slug: "1-trimester",
    name: "1. Trimester",
    weeks: "1-13. hafta",
    summary:
      "Heyecan ve belirsizliğin bir arada olduğu dönem. Henüz büyük alışveriş yapmak yerine takvim ve ihtiyaç listesi oluşturma zamanı.",
    body: [
      {
        heading: "Şimdi yapılacaklar",
        text: "Bir not defteri / dijital liste açın, ileride lazım olacak şeyleri yavaş yavaş ekleyin. Acele etmeyin; çoğu ürün son 12 haftada alınır.",
      },
      {
        heading: "Şu anda almanıza gerek olmayan şeyler",
        text: "Bebek arabası, mama sandalyesi, oyuncak setleri. Bu dönemde fiyat takibi yeterli.",
      },
      {
        heading: "Düşünmeye başlayabileceğiniz şeyler",
        text: "Pediatrist seçimi, hastane tercihi, anne kıyafetleri için bütçe.",
      },
    ],
    productSlugs: [],
  },
  {
    slug: "2-trimester",
    name: "2. Trimester",
    weeks: "14-27. hafta",
    summary:
      "Enerjinin yerine geldiği, planlama için en uygun dönem. Büyük alışverişlerin araştırması burada yapılır.",
    body: [
      {
        heading: "Araştırma odaklı",
        text: "Bebek arabası, oto koltuğu ve karyola gibi büyük kararları bu dönemde değerlendirin. Hemen satın almak gerekmiyor, ama liste ve karşılaştırma bu dönemde olgunlaşır.",
      },
      {
        heading: "Doğum hazırlığı",
        text: "Doğum sınıflarına yazılma, doğum yöntemi tercihi, hastane çantası araştırması.",
      },
    ],
    productSlugs: ["luna-explorer-x", "yıldız-city-pro"],
  },
  {
    slug: "3-trimester",
    name: "3. Trimester",
    weeks: "28-40. hafta",
    summary:
      "Somut hazırlık dönemi. Hastane çantası, bebek odası, ilk haftalar için temel ekipman.",
    body: [
      {
        heading: "Hastane çantası",
        text: "32. haftadan itibaren çantanın kapıda hazır olması güzel bir alışkanlık. Listemizi sade tuttuk; gerçekten gerekli olanları yazdık.",
      },
      {
        heading: "Eve dönüş için",
        text: "Bebek arabası ve oto koltuğu — taburcu günü için ikisi de hazır olmalı.",
      },
      {
        heading: "Yenidoğan ilk hafta",
        text: "Zıbın, alt değiştirme alanı, beslenme malzemeleri.",
      },
    ],
    productSlugs: ["yıldız-city-pro", "papatya-soft-ride"],
  },
];

export function findPeriod(slug: string) {
  return pregnancyPeriods.find((p) => p.slug === slug);
}
