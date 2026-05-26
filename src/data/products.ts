import type { Product, PriceHistoryPoint } from "./types";

function makeHistory(end: number, days = 90): PriceHistoryPoint[] {
  const points: PriceHistoryPoint[] = [];
  let p = end * 1.15;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const wobble = Math.sin(i / 6) * 250 + (Math.random() - 0.5) * 180;
    p = Math.max(end * 0.95, Math.min(end * 1.2, p - 8 + wobble * 0.05));
    if (i < 10) p = end + (Math.random() - 0.5) * 120;
    points.push({ date: date.toISOString().slice(0, 10), price: Math.round(p / 10) * 10 });
  }
  points[points.length - 1].price = end;
  return points;
}

export const products: Product[] = [
  {
    slug: "yıldız-city-pro",
    categorySlug: "bebek-arabasi",
    brand: "Yıldız",
    name: "City Pro Hafif",
    blurb:
      "Şehir içi kullanım için hafif, tek elle katlanır kabin boy araba. Yumuşak süspansiyon ve geniş tente.",
    rating: 4.5,
    reviewCount: 312,
    badges: [
      { kind: "lightest", label: "En hafif" },
      { kind: "drop", label: "Fiyatı düştü" },
    ],
    attributes: {
      price: 8990,
      weight: 5.8,
      foldType: "tek-el",
      usage: "sehir",
      reversibleSeat: false,
      travelSystem: true,
    },
    specs: [
      {
        title: "Boyut ve ağırlık",
        rows: [
          { label: "Ağırlık", value: "5,8 kg" },
          { label: "Katlanmış boyut", value: "55 × 45 × 22 cm", hint: "Kabin bagaja uyar" },
          { label: "Açık boyut", value: "98 × 50 × 105 cm" },
        ],
      },
      {
        title: "Kullanım",
        rows: [
          { label: "Yaş aralığı", value: "0-36 ay" },
          { label: "Max. taşıma kapasitesi", value: "22 kg" },
          { label: "Katlanma", value: "Tek elle, dikey duruş" },
        ],
      },
      {
        title: "Konfor ve güvenlik",
        rows: [
          { label: "Süspansiyon", value: "Ön + arka yumuşak" },
          { label: "Tente UV koruması", value: "UPF 50+" },
          { label: "5 nokta emniyet kemeri", value: "Var" },
        ],
      },
    ],
    offers: [
      { seller: "minikgo Market", price: 8990, url: "#", inStock: true },
      { seller: "ParentShop", price: 9250, url: "#", inStock: true },
      { seller: "BabyTR", price: 9490, url: "#", inStock: false },
      { seller: "Trendyol", price: 9550, url: "#", inStock: true },
    ],
    priceHistory: makeHistory(8990),
    buyOrWait: {
      state: "buy",
      headline: "Şu an iyi bir an",
      body: "Son 90 günün en düşük 3 fiyatından biri. Önümüzdeki haftalarda büyük indirim beklenmiyor.",
    },
    reviewSentiment: [
      { label: "Hafifliği şehir kullanımında çok iyi", percent: 42, tone: "positive" },
      { label: "Tente UV koruması beğeniliyor", percent: 28, tone: "positive" },
      { label: "Yumuşak süspansiyon övgü alıyor", percent: 18, tone: "positive" },
      { label: "Sepet kapasitesi küçük geliyor", percent: 22, tone: "negative" },
      { label: "Tek elle katlanması bazen zor", percent: 18, tone: "negative" },
    ],
    reviewConfidence: {
      sampleSize: 312,
      level: "high",
      note: "312 yorum analiz edildi; güven yüksek.",
    },
    relatedArticleSlugs: ["ilk-bebek-arabasi-rehberi", "sehir-icin-en-iyi-arabalar"],
  },

  {
    slug: "luna-explorer-x",
    categorySlug: "bebek-arabasi",
    brand: "Luna",
    name: "Explorer X Çift Yön",
    blurb:
      "Çevrilebilir oturak, premium süspansiyon. Hem şehirde hem hafif arazide rahat.",
    rating: 4.7,
    reviewCount: 184,
    badges: [
      { kind: "editor", label: "minikgo Editör Seçimi" },
    ],
    attributes: {
      price: 18450,
      weight: 11.2,
      foldType: "klasik",
      usage: "sehir",
      reversibleSeat: true,
      travelSystem: true,
    },
    specs: [
      {
        title: "Boyut ve ağırlık",
        rows: [
          { label: "Ağırlık", value: "11,2 kg" },
          { label: "Katlanmış boyut", value: "82 × 58 × 32 cm" },
          { label: "Açık boyut", value: "108 × 60 × 110 cm" },
        ],
      },
      {
        title: "Kullanım",
        rows: [
          { label: "Yaş aralığı", value: "0-48 ay" },
          { label: "Max. taşıma kapasitesi", value: "25 kg" },
          { label: "Oturak yönü", value: "Anneye / yola dönük" },
        ],
      },
      {
        title: "Konfor ve güvenlik",
        rows: [
          { label: "Süspansiyon", value: "4 noktalı premium" },
          { label: "Tekerlek", value: "Köpük dolgulu, patlamaz" },
          { label: "Park freni", value: "Tek pedal" },
        ],
      },
    ],
    offers: [
      { seller: "ParentShop", price: 18450, url: "#", inStock: true },
      { seller: "minikgo Market", price: 18790, url: "#", inStock: true },
      { seller: "Hepsiburada", price: 19200, url: "#", inStock: true },
    ],
    priceHistory: makeHistory(18450),
    buyOrWait: {
      state: "wait",
      headline: "Biraz beklemek daha iyi olabilir",
      body: "Son 30 günde fiyat yukarı eğilimde. Geçmiş yıllarda Mayıs ortasında %8-12 düşüş gözlemledik.",
    },
    reviewSentiment: [
      { label: "Çift yön özelliği çok kullanışlı", percent: 38, tone: "positive" },
      { label: "Süspansiyon konforlu", percent: 33, tone: "positive" },
      { label: "Asansörde geniş kalabiliyor", percent: 21, tone: "negative" },
      { label: "Ağırlığı taşımakta zorluyor", percent: 16, tone: "negative" },
    ],
    reviewConfidence: { sampleSize: 184, level: "high" },
    relatedArticleSlugs: ["ilk-bebek-arabasi-rehberi", "cift-yon-mu-tek-yon-mu"],
  },

  {
    slug: "kestane-travel-mini",
    categorySlug: "bebek-arabasi",
    brand: "Kestane",
    name: "Travel Mini Katlanır",
    blurb:
      "Uçak kabinine uyan minik gövde, çantaya benzer taşıma kayışı. Seyahat odaklı.",
    rating: 4.3,
    reviewCount: 96,
    badges: [{ kind: "value", label: "Fiyat/Performans" }],
    attributes: {
      price: 5990,
      weight: 4.9,
      foldType: "kompakt",
      usage: "seyahat",
      reversibleSeat: false,
      travelSystem: false,
    },
    specs: [
      {
        title: "Boyut ve ağırlık",
        rows: [
          { label: "Ağırlık", value: "4,9 kg" },
          { label: "Katlanmış boyut", value: "52 × 40 × 20 cm", hint: "Tüm havayollarına uygun" },
        ],
      },
      {
        title: "Kullanım",
        rows: [
          { label: "Yaş aralığı", value: "6-36 ay" },
          { label: "Max. taşıma kapasitesi", value: "20 kg" },
          { label: "Katlanma", value: "Tek elle, omuz askılı" },
        ],
      },
    ],
    offers: [
      { seller: "minikgo Market", price: 5990, url: "#", inStock: true },
      { seller: "BabyTR", price: 6190, url: "#", inStock: true },
      { seller: "Trendyol", price: 6290, url: "#", inStock: true },
    ],
    priceHistory: makeHistory(5990),
    buyOrWait: {
      state: "insufficient",
      headline: "Yeterli veri toplanıyor",
      body: "Bu ürün için sadece 38 günlük fiyat geçmişi var. Sinyal güvenilir hale gelene kadar nötr gösteriyoruz.",
    },
    reviewSentiment: [
      { label: "Uçakta kabine kolayca uyuyor", percent: 47, tone: "positive" },
      { label: "Yumuşak yatış konforlu", percent: 19, tone: "positive" },
      { label: "Engebeli yolda sarsıyor", percent: 26, tone: "negative" },
    ],
    reviewConfidence: {
      sampleSize: 96,
      level: "medium",
      note: "96 yorum — analiz orta güvenilirlikte.",
    },
    relatedArticleSlugs: ["sehir-icin-en-iyi-arabalar"],
  },

  {
    slug: "papatya-soft-ride",
    categorySlug: "bebek-arabasi",
    brand: "Papatya",
    name: "Soft Ride Pamuk Yatak",
    blurb:
      "Yenidoğan için yumuşak, yatay yatak pozisyonu. Sade ve klasik.",
    rating: 4.4,
    reviewCount: 211,
    badges: [],
    attributes: {
      price: 7250,
      weight: 9.4,
      foldType: "klasik",
      usage: "sehir",
      reversibleSeat: false,
      travelSystem: false,
    },
    specs: [
      {
        title: "Boyut ve ağırlık",
        rows: [
          { label: "Ağırlık", value: "9,4 kg" },
          { label: "Katlanmış boyut", value: "78 × 55 × 30 cm" },
        ],
      },
      {
        title: "Kullanım",
        rows: [
          { label: "Yaş aralığı", value: "0-24 ay" },
          { label: "Yatay pozisyon", value: "Var (180°)" },
        ],
      },
    ],
    offers: [
      { seller: "minikgo Market", price: 7250, url: "#", inStock: true },
      { seller: "ParentShop", price: 7480, url: "#", inStock: true },
    ],
    priceHistory: makeHistory(7250),
    buyOrWait: {
      state: "watch",
      headline: "Takip etmeye değer",
      body: "Fiyat şu an ortalama seviyede. Alarm kurarak %5 üzeri düşüşte haberdar olabilirsiniz.",
    },
    reviewSentiment: [
      { label: "Yatay yatak yenidoğan için ideal", percent: 41, tone: "positive" },
      { label: "Kumaş kalitesi iyi", percent: 24, tone: "positive" },
      { label: "Manevra dar koridorda zor", percent: 19, tone: "negative" },
    ],
    reviewConfidence: { sampleSize: 211, level: "high" },
    relatedArticleSlugs: ["ilk-bebek-arabasi-rehberi"],
  },
];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function lowestPrice(p: Product) {
  return Math.min(...p.offers.filter((o) => o.inStock).map((o) => o.price));
}

export function priceDropPercent(p: Product) {
  const max = Math.max(...p.priceHistory.map((x) => x.price));
  const now = lowestPrice(p);
  return Math.round(((max - now) / max) * 100);
}
