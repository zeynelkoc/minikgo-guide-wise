import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/mk/Breadcrumb";
import { Button } from "@/components/mk/Button";
import { Mail, MessageCircle, Send } from "lucide-react";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim — minikgo" },
      { name: "description", content: "Soru, geri bildirim veya iş birliği için bize ulaşın." },
      { property: "og:title", content: "İletişim — minikgo" },
      { property: "og:description", content: "Bize ulaşın." },
    ],
  }),
  component: Iletisim,
});

function Iletisim() {
  return (
    <Container className="py-12 sm:py-16" size="narrow">
      <Breadcrumb items={[{ label: "Ana sayfa", to: "/" }, { label: "İletişim" }]} />
      <header className="mt-8">
        <p className="eyebrow">İletişim</p>
        <h1 className="mt-3 font-serif text-5xl">Bize yazın</h1>
        <p className="mt-4 text-ink-soft">
          Geri bildirim, hata bildirimi ya da bir ürün önerisi — hepsi okuyoruz.
        </p>
      </header>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <a href="mailto:hello@minikgo.com" className="flex items-center gap-3 rounded-2xl bg-canvas p-5 ring-hairline hover:border-sage">
          <Mail className="size-4 text-sage" />
          <div>
            <p className="text-sm font-medium">E-posta</p>
            <p className="text-xs text-ink-muted">hello@minikgo.com</p>
          </div>
        </a>
        <div className="flex items-center gap-3 rounded-2xl bg-canvas p-5 ring-hairline">
          <MessageCircle className="size-4 text-sage" />
          <div>
            <p className="text-sm font-medium">Sosyal</p>
            <p className="text-xs text-ink-muted">@minikgo (Instagram)</p>
          </div>
        </div>
      </div>

      <form className="mt-10 space-y-4 rounded-3xl bg-canvas p-6 ring-hairline">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Adınız" type="text" />
          <Field label="E-posta" type="email" />
        </div>
        <Field label="Konu" type="text" />
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Mesajınız</span>
          <textarea rows={5} className="w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3 text-sm focus:border-sage focus:outline-none" />
        </label>
        <Button>
          <Send className="size-4" /> Gönder
        </Button>
      </form>
    </Container>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input type={type} className="w-full rounded-full border border-ink/10 bg-canvas px-4 py-3 text-sm focus:border-sage focus:outline-none" />
    </label>
  );
}
