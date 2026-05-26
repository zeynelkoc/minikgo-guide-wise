import type { Category, JourneyStage } from "./types";

export const journeyStages: JourneyStage[] = [
  {
    slug: "hamilelik",
    name: "Hamilelik",
    range: "0-9 ay",
    blurb: "Hazırlık, hastane çantası, ilk alışveriş listesi.",
  },
  {
    slug: "yenidogan",
    name: "Yenidoğan",
    range: "0-3 ay",
    blurb: "İlk haftalar, uyku, beslenme, temel ekipman.",
  },
  {
    slug: "bebek",
    name: "Bebek",
    range: "3-24 ay",
    blurb: "Hareket, ek gıda, oyun ve gelişim.",
  },
];

export const categories: Category[] = [
  {
    slug: "bebek-arabasi",
    name: "Bebek arabası",
    blurb: "Şehir, yolculuk ve günlük kullanım için modeller.",
    available: true,
    productCount: 124,
  },
  {
    slug: "oto-koltugu",
    name: "Oto koltuğu",
    blurb: "Yaş grubuna göre güvenli oto koltuğu seçimi.",
    available: false,
    productCount: 86,
  },
  {
    slug: "mama-sandalyesi",
    name: "Mama sandalyesi",
    blurb: "Ek gıda dönemine geçişte rahat ve temizlenebilir.",
    available: false,
    productCount: 54,
  },
  {
    slug: "biberon",
    name: "Biberon",
    blurb: "Beslenme tarzına göre biberon ve emzik karşılaştırması.",
    available: false,
    productCount: 38,
  },
  {
    slug: "bebek-bezi",
    name: "Bebek bezi",
    blurb: "Beden, hassasiyet ve fiyat/performansa göre.",
    available: false,
    productCount: 22,
  },
  {
    slug: "uyku",
    name: "Uyku ve karyola",
    blurb: "Beşik, karyola, uyku tulumu ve eşlikçileri.",
    available: false,
    productCount: 41,
  },
];
