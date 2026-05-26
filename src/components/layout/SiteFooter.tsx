import { Link } from "@tanstack/react-router";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/5 bg-canvas py-16">
      <Container className="grid gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <Link to="/" className="font-serif text-2xl text-sage">
            minikgo
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Yeni anne-baba adayları için karar destekli bir rehber. Sade,
            tarafsız ve sizin durumunuza özel öneriler.
          </p>
          <p className="eyebrow">© {new Date().getFullYear()} minikgo</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="eyebrow">Kategoriler</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>
                <Link to="/urunler/$kategori" params={{ kategori: "bebek-arabasi" }} className="hover:text-sage">
                  Bebek arabası
                </Link>
              </li>
              <li>
                <Link to="/urunler/$kategori" params={{ kategori: "oto-koltugu" }} className="hover:text-sage">
                  Oto koltuğu
                </Link>
              </li>
              <li>
                <Link to="/urunler/$kategori" params={{ kategori: "mama-sandalyesi" }} className="hover:text-sage">
                  Mama sandalyesi
                </Link>
              </li>
              <li>
                <Link to="/urunler/$kategori" params={{ kategori: "biberon" }} className="hover:text-sage">
                  Biberon
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow">Destek</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li><Link to="/hakkimizda" className="hover:text-sage">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="hover:text-sage">İletişim</Link></li>
              <li><Link to="/gizlilik" className="hover:text-sage">Gizlilik</Link></li>
              <li><Link to="/kosullar" className="hover:text-sage">Kullanım koşulları</Link></li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-sage-tint/60 p-6">
          <h4 className="font-serif text-lg">Şeffaflık notu</h4>
          <p className="mt-3 text-xs leading-relaxed text-ink-soft">
            Site içindeki bazı bağlantılar affiliate linklerdir. Bu, ürünleri
            tarafsız karşılaştırmamızı etkilemez; gelir, içeriğin ve veri
            toplamanın masraflarını karşılar. Hiçbir markadan ücretli inceleme
            kabul etmiyoruz.
          </p>
        </div>
      </Container>
    </footer>
  );
}
