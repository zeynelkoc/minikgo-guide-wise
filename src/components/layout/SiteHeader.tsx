import { Link } from "@tanstack/react-router";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

const journeyLinks = [
  { to: "/hamilelik", label: "Hamilelik" },
  { to: "/isimler", label: "İsimler" },
  { to: "/rehber", label: "Rehber" },
] as const;

const productLinks = [
  { to: "/urunler", label: "Kategoriler" },
  { to: "/sihirbaz", label: "Sihirbaz" },
  { to: "/karsilastir", label: "Karşılaştır" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link to="/" className="font-serif text-2xl tracking-tight text-sage">
          minikgo
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-ink-soft lg:flex">
          <div className="flex items-center gap-4 border-r border-ink/10 pr-6">
            <span className="eyebrow !text-[10px]">Yolculuk</span>
            {journeyLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition-colors hover:text-sage"
                activeProps={{ className: "text-sage" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="eyebrow !text-[10px]">Ürünler</span>
            {productLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition-colors hover:text-sage"
                activeProps={{ className: "text-sage" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Ara"
            className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sage-tint hover:text-sage"
          >
            <Search className="size-4" />
          </button>
          <Link
            to="/hesabim"
            className="hidden rounded-full border border-ink/10 px-4 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-sage hover:text-sage sm:inline-flex"
          >
            Google ile giriş
          </Link>
          <button
            type="button"
            aria-label="Menü"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink-soft lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300",
          open ? "max-h-[60vh] border-t border-ink/5" : "max-h-0",
        )}
      >
        <Container className="py-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <span className="eyebrow">Yolculuk</span>
              <ul className="mt-3 space-y-2">
                {journeyLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-base font-serif"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">Ürünler</span>
              <ul className="mt-3 space-y-2">
                {productLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-base font-serif"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
