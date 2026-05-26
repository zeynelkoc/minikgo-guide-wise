import type { Article } from "@/data/types";
import { findProduct } from "@/data/products";
import { findArticle } from "@/data/articles";
import { lowestPrice } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "@/components/mk/ImagePlaceholder";
import { LinkButton } from "@/components/mk/Button";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="space-y-8">
      {article.blocks.map((block, i) => {
        switch (block.kind) {
          case "paragraph":
            return (
              <p key={i} className="text-lg leading-relaxed text-ink-soft">{block.text}</p>
            );
          case "heading":
            return (
              <h2 key={i} className="mt-6 font-serif text-3xl">{block.text}</h2>
            );
          case "callout":
            return (
              <aside key={i} className="rounded-3xl border-l-4 border-sage bg-sage-tint/40 px-6 py-5 text-sm text-ink-soft">
                {block.text}
              </aside>
            );
          case "inlineProduct": {
            const p = findProduct(block.productSlug);
            if (!p) return null;
            return (
              <div key={i} className="not-prose flex flex-col gap-5 rounded-3xl bg-canvas p-5 ring-hairline sm:flex-row sm:items-center">
                <ImagePlaceholder prompt={p.name} ratio="square" className="sm:w-40" label={p.brand} />
                <div className="flex-1">
                  <p className="eyebrow !text-[10px]">{p.brand}</p>
                  <h3 className="mt-1 font-serif text-xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{block.angle}</p>
                  <p className="mt-3 font-serif text-2xl">{lowestPrice(p).toLocaleString("tr-TR")} TL</p>
                </div>
                <LinkButton
                  to="/urunler/$kategori/$slug"
                  params={{ kategori: p.categorySlug, slug: p.slug }}
                  variant="secondary"
                  size="sm"
                >
                  İncele <ArrowRight className="size-3" />
                </LinkButton>
              </div>
            );
          }
          case "checklistItem": {
            const p = block.productSlug ? findProduct(block.productSlug) : null;
            return (
              <div key={i} className="flex items-start gap-3 border-t border-ink/5 pt-4">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sage-tint text-sage">
                  <Check className="size-3" />
                </span>
                <div className="flex-1">
                  <p className="text-base">{block.text}</p>
                  {p && (
                    <Link
                      to="/urunler/$kategori/$slug"
                      params={{ kategori: p.categorySlug, slug: p.slug }}
                      className="mt-1 inline-flex text-xs text-sage underline-offset-4 hover:underline"
                    >
                      {p.brand} {p.name} — fiyat & yorum →
                    </Link>
                  )}
                </div>
              </div>
            );
          }
          case "rankedItem": {
            const p = findProduct(block.productSlug);
            if (!p) return null;
            return (
              <div key={i} className="flex gap-5 rounded-3xl bg-canvas p-5 ring-hairline">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sage text-2xl font-serif text-white">
                  {block.rank}
                </div>
                <div className="flex-1">
                  <p className="eyebrow !text-[10px]">{p.brand}</p>
                  <h3 className="mt-1 font-serif text-xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{block.reason}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <span className="font-serif text-lg">{lowestPrice(p).toLocaleString("tr-TR")} TL</span>
                    <Link
                      to="/urunler/$kategori/$slug"
                      params={{ kategori: p.categorySlug, slug: p.slug }}
                      className="text-xs text-sage underline-offset-4 hover:underline"
                    >
                      Ürünü incele →
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
          case "wizardCta":
            return (
              <div key={i} className="rounded-3xl bg-sage p-8 text-white sm:p-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs">
                  <Sparkles className="size-3" /> Senin durumuna göre
                </div>
                <h3 className="font-serif text-3xl leading-tight">
                  Hangi model sana uygun? 4 soruda öneri alın.
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/80">
                  E-posta yok, giriş yok. Yanıtlar anlık.
                </p>
                <LinkButton to="/sihirbaz" variant="secondary" size="md" className="mt-6 text-ink">
                  Sihirbazı aç
                </LinkButton>
              </div>
            );
        }
      })}

      {/* İlgili makale önerileri */}
      {article.relatedArticleSlugs.length > 0 && (
        <section className="mt-16 border-t border-ink/5 pt-10">
          <h3 className="eyebrow">İlgili rehberler</h3>
          <ul className="mt-4 space-y-3">
            {article.relatedArticleSlugs.map((s) => {
              const a = findArticle(s);
              if (!a) return null;
              return (
                <li key={s}>
                  <Link to="/rehber/$slug" params={{ slug: a.slug }} className="group block">
                    <p className="font-serif text-lg group-hover:text-sage">{a.title}</p>
                    <p className="text-xs text-ink-muted">{a.readingMinutes} dk okuma</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
