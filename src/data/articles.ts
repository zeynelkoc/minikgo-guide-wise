import type { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "ilk-bebek-arabasi-rehberi",
    type: "guide",
    title: "İlk bebek arabası alırken kafanızı karıştırmayacak rehber",
    excerpt:
      "Ağırlık, katlanma tipi, süspansiyon, tente — gerçekten neyin önemli olduğuna sakin bir bakış.",
    category: "Karar rehberi",
    readingMinutes: 7,
    blocks: [
      {
        kind: "paragraph",
        text: "İlk bebek arabası seçimi çoğu zaman özelliklerden değil, kullanım senaryosundan başlamalı. Apartmanın asansörü dar mı? Sıklıkla araç bagajına koyacak mısınız? Cevaplar farklı modellere işaret eder.",
      },
      { kind: "heading", text: "Asıl belirleyici: kullanım senaryosu" },
      {
        kind: "paragraph",
        text: "Şehir içinde tek yetişkinin kullanacağı bir araba ile haftada birkaç kez arabanın bagajına giren bir araba çok farklı tasarımlar gerektirir. Önce yaşam alanınızı düşünün, sonra ürünleri eleyin.",
      },
      {
        kind: "inlineProduct",
        productSlug: "yıldız-city-pro",
        angle: "Dar koridor ve asansörlerde rahat ederseniz buradan başlayın.",
      },
      { kind: "heading", text: "Ağırlık mı, konfor mu?" },
      {
        kind: "paragraph",
        text: "5 kg altı modeller tek elle taşımayı kolaylaştırırken, süspansiyon ve oturak konforundan ödün verir. 9 kg üzeri modeller daha rahattır ama merdiven inerken zorlanırsınız.",
      },
      { kind: "wizardCta" },
      {
        kind: "paragraph",
        text: "Tüm bu özellikleri tek tek karşılaştırmak yerine, kendi senaryonuzu anlatabileceğiniz kısa bir akış hazırladık.",
      },
    ],
    relatedArticleSlugs: ["sehir-icin-en-iyi-arabalar", "cift-yon-mu-tek-yon-mu"],
  },

  {
    slug: "sehir-icin-en-iyi-arabalar",
    type: "ranking",
    title: "Şehir içi kullanım için en iyi 3 bebek arabası",
    excerpt:
      "Asansör, dar kaldırım, ani yağmur — şehrin koşullarına göre eledik.",
    category: "En iyiler",
    readingMinutes: 5,
    blocks: [
      {
        kind: "paragraph",
        text: "Bu sıralamada üreticilerden hiçbir ödeme almıyoruz. Test ettiğimiz 14 modelin sadece üçü gerçekten şehir koşullarında öne çıktı.",
      },
      {
        kind: "rankedItem",
        rank: 1,
        productSlug: "yıldız-city-pro",
        reason: "Tek elle katlanma + 5,8 kg ağırlık. Asansör ve metroda kolaylık.",
      },
      {
        kind: "rankedItem",
        rank: 2,
        productSlug: "luna-explorer-x",
        reason: "Premium süspansiyon, çift yön. Daha ağır ama uzun süre kullanışlı.",
      },
      {
        kind: "rankedItem",
        rank: 3,
        productSlug: "papatya-soft-ride",
        reason: "Sade ve dayanıklı klasik. Yenidoğan dönemi için pratik.",
      },
      { kind: "wizardCta" },
    ],
    relatedArticleSlugs: ["ilk-bebek-arabasi-rehberi"],
  },

  {
    slug: "hastane-cantasi-checklist",
    type: "checklist",
    title: "Hastane çantası: gerçekten ihtiyacınız olan 18 madde",
    excerpt:
      "Pinterest listelerindeki abartıyı temizledik. Bu liste bizim 3 yıllık verilerimizle.",
    category: "Checklist",
    readingMinutes: 4,
    blocks: [
      {
        kind: "paragraph",
        text: "Hastanede ortalama kalış 36 saat. Çoğu ihtiyaç oradan veya yakındaki eczaneden karşılanabilir; çantayı çok şişirmek strese sebep oluyor.",
      },
      { kind: "checklistItem", text: "Anne için pamuklu sabahlık (2 adet)" },
      { kind: "checklistItem", text: "Yenidoğan zıbın seti (3 adet, en küçük beden)" },
      { kind: "checklistItem", text: "Anne pedi" },
      { kind: "checklistItem", text: "Yumuşak havlu (1 anne, 1 bebek)" },
      { kind: "checklistItem", text: "Yenidoğan bebek bezi (10 adet, beden 1)" },
      {
        kind: "checklistItem",
        text: "Taburcu sonrası bebek arabası — kapıda hazır olsun",
        productSlug: "yıldız-city-pro",
      },
      { kind: "callout", text: "İpucu: doğum tarihinizden 3 hafta önce çantayı hazır bekletin." },
    ],
    relatedArticleSlugs: ["ilk-bebek-arabasi-rehberi"],
  },

  {
    slug: "cift-yon-mu-tek-yon-mu",
    type: "guide",
    title: "Çift yön mü, tek yön mü? Hangi senaryoda hangisi?",
    excerpt:
      "Yenidoğanda anneye dönük oturak gerçekten gerekli mi? Verilerimiz ne söylüyor?",
    category: "Karar rehberi",
    readingMinutes: 6,
    blocks: [
      {
        kind: "paragraph",
        text: "Çift yön araba, ilk 18 ay göz teması için sevilir. Sonrasında çoğu aile yola dönük kullanıma geçer. Eğer bütçeniz kısıtlıysa tek yön bir araba + dengeli bir yatış açısı çoğu kez yeterli.",
      },
      {
        kind: "inlineProduct",
        productSlug: "luna-explorer-x",
        angle: "Çift yönü gerçekten kullanacaksanız bu sınıfın temsilcisi.",
      },
      { kind: "wizardCta" },
    ],
    relatedArticleSlugs: ["ilk-bebek-arabasi-rehberi", "sehir-icin-en-iyi-arabalar"],
  },
];

export function findArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
