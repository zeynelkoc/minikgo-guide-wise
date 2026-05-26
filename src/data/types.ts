// Tüm uygulamada paylaşılan tipler. Bileşen izolasyonu için: filtreler
// ve özellik tabloları her ürün kategorisinde aynı şekli kullanır.

export type Slug = string;

export interface Category {
  slug: Slug;
  name: string;
  blurb: string;
  available: boolean; // şu an sadece bebek-arabasi tam dolu
  productCount: number;
}

/* ---------- Dinamik filtre ---------- */

export type FilterDefinition =
  | {
      id: string;
      label: string;
      type: "range";
      unit?: string;
      min: number;
      max: number;
      step?: number;
    }
  | {
      id: string;
      label: string;
      type: "multi";
      options: { value: string; label: string }[];
    }
  | {
      id: string;
      label: string;
      type: "toggle";
      description?: string;
    }
  | {
      id: string;
      label: string;
      type: "chips";
      options: { value: string; label: string }[];
    };

export type FilterValue =
  | { type: "range"; min: number; max: number }
  | { type: "multi"; values: string[] }
  | { type: "toggle"; value: boolean }
  | { type: "chips"; values: string[] };

export type FilterState = Record<string, FilterValue>;

/* ---------- Spec table ---------- */

export interface SpecRow {
  label: string;
  value: string;
  hint?: string;
}

export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

/* ---------- Ürün ---------- */

export type BadgeKind = "editor" | "value" | "lightest" | "drop";

export interface ProductBadge {
  kind: BadgeKind;
  label: string;
}

export interface SellerOffer {
  seller: string;
  price: number;
  url: string;
  inStock: boolean;
}

export interface PriceHistoryPoint {
  date: string; // ISO
  price: number;
}

export interface ReviewSentimentItem {
  label: string;
  percent: number;
  tone: "positive" | "negative";
}

export interface ReviewConfidence {
  sampleSize: number;
  level: "low" | "medium" | "high";
  note?: string;
}

export interface Product {
  slug: Slug;
  categorySlug: Slug;
  brand: string;
  name: string;
  blurb: string;
  rating: number;
  reviewCount: number;
  badges: ProductBadge[];
  // dinamik özellikler: filtre id'leriyle eşleşir
  attributes: Record<string, number | string | boolean>;
  specs: SpecGroup[];
  offers: SellerOffer[];
  priceHistory: PriceHistoryPoint[];
  buyOrWait: {
    state: "buy" | "wait" | "watch" | "insufficient";
    headline: string;
    body: string;
  };
  reviewSentiment: ReviewSentimentItem[];
  reviewConfidence: ReviewConfidence;
  relatedArticleSlugs: Slug[];
}

/* ---------- Makale ---------- */

export type ArticleType = "guide" | "checklist" | "ranking" | "info";

export interface ArticleBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "inlineProduct"; productSlug: Slug; angle: string }
  | { kind: "checklistItem"; text: string; productSlug?: Slug }
  | { kind: "rankedItem"; rank: number; productSlug: Slug; reason: string }
  | { kind: "wizardCta" }
  | { kind: "callout"; text: string };

export interface Article {
  slug: Slug;
  type: ArticleType;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  blocks: ArticleBlock[];
  relatedArticleSlugs: Slug[];
}

/* ---------- İsim ---------- */

export interface BabyName {
  slug: Slug;
  name: string;
  gender: "kız" | "erkek" | "uniseks";
  origin: string;
  meaning: string;
  popularity: number; // 0-100
  letter: string;
}

/* ---------- Yolculuk dönemi ---------- */

export interface JourneyStage {
  slug: Slug;
  name: string;
  range: string;
  blurb: string;
}

export interface PregnancyPeriod {
  slug: Slug;
  name: string;
  weeks: string;
  summary: string;
  body: { heading: string; text: string }[];
  productSlugs: Slug[];
}
