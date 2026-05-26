import { createFileRoute, notFound } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { Badge } from "@/components/mk/Badge";
import { ArticleBody } from "@/components/article/ArticleBody";
import { findArticle } from "@/data/articles";
import { ImagePlaceholder } from "@/components/mk/ImagePlaceholder";

const typeLabel: Record<string, string> = {
  guide: "Karar rehberi",
  checklist: "Checklist",
  ranking: "En iyiler",
  info: "Bilgi",
};

export const Route = createFileRoute("/rehber/$slug")({
  head: ({ params }) => {
    const a = findArticle(params.slug);
    return {
      meta: [
        { title: `${a?.title ?? "Rehber"} | minikgo` },
        { name: "description", content: a?.excerpt ?? "" },
        { property: "og:title", content: a?.title ?? "Rehber" },
        { property: "og:description", content: a?.excerpt ?? "" },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: RehberDetail,
});

function RehberDetail() {
  const { slug } = Route.useParams();
  const article = findArticle(slug);
  if (!article) throw notFound();
  return (
    <article>
      <Container className="py-12" size="narrow">
        <Breadcrumb
          items={[
            { label: "Ana sayfa", to: "/" },
            { label: "Rehber", to: "/rehber" },
            { label: article.title },
          ]}
        />
        <header className="mt-8">
          <Badge tone="sage">{typeLabel[article.type]}</Badge>
          <h1 className="mt-4 font-serif text-5xl leading-[1.1]">{article.title}</h1>
          <p className="mt-4 text-lg text-ink-soft">{article.excerpt}</p>
          <p className="mt-3 text-xs text-ink-muted">{article.readingMinutes} dakika okuma</p>
        </header>
        <ImagePlaceholder prompt={article.title} ratio="wide" className="my-10" label={article.category} />
        <ArticleBody article={article} />
      </Container>
    </article>
  );
}
