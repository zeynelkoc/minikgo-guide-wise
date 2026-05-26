# minikgo.com — Arayüz Tasarım Planı

Sadece arayüz: backend, auth, gerçek veri yok. Bütün sayfalar mock veriyle çalışan, görsel olarak bitmiş bir iskelet.

## Tasarım dili

- **Palet:** kırık beyaz/krem zemin (`#FBF8F3`), sıcak nötr griler, koyu mürekkep metin, tek canlı vurgu (toprak terracotta veya sakin salvia yeşili — onay anında final). AI moru gradyan, neon, dashboard mavisi yok.
- **Tipografi:** editoryal serif başlık (ör. Instrument Serif / Fraunces) + temiz humanist sans gövde (ör. Inter / Work Sans). Tek H1/sayfa.
- **Düzen:** dergi grid, bol beyaz alan, yumuşak köşeler (12–20px), çok hafif gölge. Mobil öncelikli.
- **His:** IKEA sadeliği + Apple Health temizliği + dergi sıcaklığı. Yargılamayan, sakin ton.

Build adımına geçmeden önce `design--create_directions` ile 3 yön üretilip kullanıcıya seçtirilecek (sıcak editoryal varyantları — terracotta vurgulu klasik dergi, salvia vurgulu sakin minimal, sıcak kahve vurgulu IKEA-kataloğu hissi).

## Teknik temel

- TanStack Start (mevcut iskelet), React 19, Tailwind v4, semantik HTML.
- Tüm tasarım tokenları `src/styles.css` içinde oklch ile; bileşenlerde hardcoded renk yok.
- Sayfa state'i lokal `useState` ile mock veri üzerinden; harici state kütüphanesi yok.
- Mock veri `src/data/` altında tipli TS dosyaları olarak (kategoriler, ürünler, makaleler, isimler, filtre tanımları).

## Rota haritası (`src/routes/`)

```
index.tsx
hamilelik.index.tsx
hamilelik.$donem.tsx
isimler.index.tsx
isimler.$isim.tsx
rehber.index.tsx
rehber.$slug.tsx
sihirbaz.tsx
urunler.index.tsx
urunler.$kategori.index.tsx
urunler.$kategori.$slug.tsx
karsilastir.tsx
hesabim.tsx
hakkimizda.tsx
iletisim.tsx
gizlilik.tsx
kosullar.tsx
```

Her route kendi `head()` metadata'sını taşır (başlık + açıklama + og:title/og:description; leaf'lerde og:image).

## Global bileşenler (`src/components/layout/`, `src/components/ui/`)

- `SiteHeader` — iki eksenli nav (Yolculuk / Ürünler), arama, opsiyonel Google giriş butonu (görsel placeholder).
- `SiteFooter` — kategoriler, destek, yasal, affiliate şeffaflık notu.
- `Container`, `SectionHeading`, `Badge`, `Chip`, `Stat`, `Card`, `Button` (variant: primary/ghost/quiet), `Breadcrumb`.

## Dinamik (izole) bileşenler — kritik

İleride başka kategoriler eklenince çalışsın diye veri-odaklı kurulacak:

- **`DynamicFilterPanel`** — `FilterDefinition[]` alır (range / multi-select / toggle / chips). Bebek arabası: ağırlık, katlanma tipi; ileride oto koltuğunda isofix/yatış otomatik render.
- **`DynamicSpecTable`** — `SpecGroup[]` alır, grup başlıklarıyla render eder.
- **`ProductCard`** — görsel, ad, anlık en düşük fiyat, fiyat/performans rozeti, "fiyatı düştü" sinyali, puan + yorum sayısı.
- **`PriceHistoryChart`** — 90 günlük SVG/Recharts çizgi grafiği (mock seri).
- **`BuyOrWaitSignal`** — aktif/pasif/"veri toplanıyor" durumlarını taşıyan kutu.
- **`ReviewSentimentMap`** — yüzdelik çubuk listesi + `ReviewConfidenceScore` (yeşil/sarı/kırmızı + örneklem).
- **`MicroSurvey`** — 4 adımlı inline anket; sayfa içinde, animasyonlu geçiş, pop-up değil.
- **`ComparisonTable`** — 2-3 sütun, satır satır özellik, sütun başlıklarında fiyat + CTA.
- **`WizardStep`, `WizardProgress`, `WizardResultCard`** — sihirbaz için.
- **`ArticleBody`** + gömülebilir bloklar: `InlineProductCard`, `ChecklistItem`, `RankedProductList`, `WizardCtaBlock`, `RelatedArticles`.

## Sayfa içerikleri (özet)

1. **Anasayfa** — editoryal hero, iki CTA, yolculuk seçici (3 kart), öne çıkan rehber, popüler karşılaştırmalar, "bu ay fiyatı düşenler" şeridi, sakin sosyal kanıt ("Bu hafta 148 aile fiyat alarmı kurdu"), güven bandı.
2. **Hamilelik** — 3 trimester görsel seçici. Dönem detayı: alışveriş/hazırlık odaklı içerik blokları, ilgili ürün bağlantıları. Tıbbi UI öğesi yok.
3. **İsimler** — filtreli grid (cinsiyet/köken/anlam/harf), detay sayfasında anlam/köken/popülerlik mini grafiği.
4. **Rehber** — kart liste + tür filtreleri. Detay şablonu: gömülü ürün kartı, checklist, ranked list, makale sonu sihirbaz CTA, ilgili içerik.
5. **Sihirbaz** — tek soru/ekran, üst ilerleme barı, 4-5 adım. Sonuç ekranı anlık 3 gerekçeli kart, altında gönüllü "e-postama gönder" / "fiyat alarmı" butonları. Auth/email duvarı yok.
6. **Kategori liste** — `DynamicFilterPanel` solda (mobilde alt sheet), üstte kategori intro + sihirbaz bandı, ürün kart grid'i, rozetler.
7. **Ürün detay** — galeri, anlık fiyat listesi (en ucuz vurgulu, "kupon dahil değil" notu), 90 günlük fiyat grafiği, Şimdi al/Bekle sinyali, yorum sentiment haritası + güven skoru, dinamik spec tablo, inline mikro-anket, ilgili rehber makaleler.
8. **Karşılaştır** — 2-3 ürün yan yana ComparisonTable.
9. **Hesabım** — sade panel: fiyat alarmları, kayıtlı sihirbaz sonuçları, listeler (mock).
10. **Hakkımızda** — metodoloji: fiyat/öneri/rozet/yorum skoru nasıl oluşur, affiliate şeffaflığı.
11. **İletişim / Gizlilik / Kullanım Koşulları** — sade şablonlar.

## Mock veri (`src/data/`)

`categories.ts`, `products.ts` (bebek arabası örneklem), `articles.ts`, `names.ts`, `filters.ts` (kategori→filtre tanımı eşlemesi), `priceHistory.ts`, `reviews.ts`.

## Akış

1. `design--create_directions` → 3 sıcak editoryal yön → `ask_questions` (prototype seçimi).
2. Seçim sonrası tokenları `src/styles.css`'e birebir aktarımı + global bileşenleri kurma.
3. Rotaları sırayla doldurma: anasayfa → ürün akışı (kategori/detay/karşılaştır/sihirbaz) → içerik akışı (hamilelik/isimler/rehber) → hesap/kurumsal.
4. Mobil pas, slop-sweep (tek H1, jenerik CTA temizliği, gereksiz "trusted by" yok).

## Açık sorular (planı onaylarken cevaplayabilirsin, yoksa varsayılanlarla giderim)

- **Vurgu rengi:** terracotta (sıcak), salvia yeşil (sakin) veya kahve/karamel (toprak)? Varsayılan: directions adımında 3 varyant olarak sunarım.
- **Başlık fontu:** Instrument Serif (modern editoryal) vs Fraunces (sıcak yumuşak serif). Varsayılan: Fraunces.
- **İlk yüklenecek mock kategori sadece "bebek arabası" mı, yoksa diğer kategorileri de görsel placeholder ile (oto koltuğu, mama sandalyesi, biberon) kart olarak göstereyim mi? Varsayılan: hepsi kart olarak görünür, sadece bebek arabası tıklanınca dolu sayfa.
