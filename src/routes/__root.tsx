import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl">Aradığınız sayfayı bulamadık</h1>
      <p className="mt-3 max-w-md text-sm text-ink-soft">
        Sayfa taşınmış ya da silinmiş olabilir. Aşağıdan ana sayfaya dönebilir,
        ürün rehberlerine veya sihirbaza geçebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-white"
        >
          Ana sayfa
        </Link>
        <Link
          to="/sihirbaz"
          className="rounded-full border border-ink/10 px-5 py-2.5 text-sm font-medium"
        >
          Ürün sihirbazı
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow">Bir şeyler ters gitti</p>
      <h1 className="mt-4 font-serif text-4xl">Bu sayfa şu an yüklenemedi</h1>
      <p className="mt-3 max-w-md text-sm text-ink-soft">
        Tekrar deneyebilir ya da ana sayfaya dönebilirsiniz.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-white"
        >
          Tekrar dene
        </button>
        <a
          href="/"
          className="rounded-full border border-ink/10 px-5 py-2.5 text-sm font-medium"
        >
          Ana sayfa
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "minikgo — Yeni ebeveynler için karar rehberi" },
      {
        name: "description",
        content:
          "Hamilelikten bebekliğe — sizin durumunuza uygun ürün önerileri, tarafsız karşılaştırmalar ve sakin rehberler.",
      },
      { name: "author", content: "minikgo" },
      { property: "og:title", content: "minikgo — Yeni ebeveynler için karar rehberi" },
      {
        property: "og:description",
        content:
          "Akakçe değil, karar asistanı. Bebek arabasından oto koltuğuna, sizin için doğru olanı bulmanıza yardım ediyoruz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
