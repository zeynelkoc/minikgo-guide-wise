import type { Article } from "@/data/types";
import { Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "@/components/mk/ImagePlaceholder";

const typeLabels: Record<Article["type"], string> = {
  guide: "Karar rehberi",
  checklist: "Checklist",
  ranking: "En iyiler",
  info: "Bilgi",
};

export function ArticleCard({ article, layout = "stack" }: { article: Article; layout?: "stack" | "row" }) {
  if (layout === "row") {
    return (
      <Link
        to="/rehber/$slug"
        params={{ slug: article.slug }}
        className="group flex flex-col gap-6 md:flex-row md:items-center"
      >
        <ImagePlaceholder
          prompt={article.title}
          ratio="landscape"
          className="md:w-72"
          label={typeLabels[article.type]}
        />
        <div className="flex-1">
          <p className="eyebrow">{typeLabels[article.type]} · {article.readingMinutes} dk</p>
          <h3 className="mt-2 font-serif text-2xl leading-tight group-hover:text-sage">{article.title}</h3>
          <p className="mt-3 max-w-[56ch] text-sm text-ink-soft">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/rehber/$slug" params={{ slug: article.slug }} className="group block">
      <ImagePlaceholder prompt={article.title} ratio="portrait" label={typeLabels[article.type]} />
      <p className="eyebrow mt-4">{typeLabels[article.type]} · {article.readingMinutes} dk</p>
      <h3 className="mt-2 font-serif text-xl leading-tight group-hover:text-sage">{article.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{article.excerpt}</p>
    </Link>
  );
}
