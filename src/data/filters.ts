import type { FilterDefinition } from "./types";

/**
 * Kategori → filtre tanımları haritası.
 * Yeni kategori eklendiğinde sadece bu haritaya yeni alanlar eklenir,
 * UI bileşenleri (DynamicFilterPanel, DynamicSpecTable) otomatik uyum sağlar.
 */
export const categoryFilters: Record<string, FilterDefinition[]> = {
  "bebek-arabasi": [
    {
      id: "price",
      label: "Fiyat aralığı",
      type: "range",
      unit: "TL",
      min: 2500,
      max: 50000,
      step: 500,
    },
    {
      id: "weight",
      label: "Ağırlık",
      type: "range",
      unit: "kg",
      min: 4,
      max: 16,
      step: 0.5,
    },
    {
      id: "foldType",
      label: "Katlanma tipi",
      type: "multi",
      options: [
        { value: "tek-el", label: "Tek elle katlanır" },
        { value: "kompakt", label: "Kompakt (kabin boy)" },
        { value: "klasik", label: "Klasik" },
      ],
    },
    {
      id: "usage",
      label: "Kullanım tarzı",
      type: "chips",
      options: [
        { value: "sehir", label: "Şehir içi" },
        { value: "seyahat", label: "Seyahat" },
        { value: "arazi", label: "Engebeli yüzey" },
        { value: "ikiz", label: "İkiz" },
      ],
    },
    {
      id: "reversibleSeat",
      label: "Çevrilebilir oturak",
      type: "toggle",
      description: "Bebek anneye veya yola dönük oturabilir.",
    },
    {
      id: "travelSystem",
      label: "Travel system uyumlu",
      type: "toggle",
      description: "Oto koltuğu ile birleştirilebilir.",
    },
  ],

  // İleride eklenecek — şu an arayüz hazır, dinamik render edilir.
  "oto-koltugu": [
    {
      id: "price",
      label: "Fiyat aralığı",
      type: "range",
      unit: "TL",
      min: 1500,
      max: 25000,
      step: 250,
    },
    {
      id: "ageGroup",
      label: "Yaş grubu",
      type: "multi",
      options: [
        { value: "0-13", label: "0-13 kg (Grup 0+)" },
        { value: "9-18", label: "9-18 kg (Grup 1)" },
        { value: "15-36", label: "15-36 kg (Grup 2/3)" },
      ],
    },
    {
      id: "isofix",
      label: "Isofix bağlantı",
      type: "toggle",
    },
    {
      id: "reclineAngle",
      label: "Yatış açısı",
      type: "range",
      unit: "°",
      min: 90,
      max: 180,
      step: 5,
    },
  ],
};
