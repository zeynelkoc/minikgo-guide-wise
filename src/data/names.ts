import type { BabyName } from "./types";

const raw: Omit<BabyName, "slug" | "letter">[] = [
  { name: "Defne", gender: "kız", origin: "Türkçe", meaning: "Defne yaprağı, zafer simgesi.", popularity: 86 },
  { name: "Mira", gender: "kız", origin: "Latince", meaning: "Hayranlık uyandıran.", popularity: 78 },
  { name: "Elif", gender: "kız", origin: "Arapça", meaning: "İlk harf, başlangıç.", popularity: 92 },
  { name: "Asya", gender: "kız", origin: "Türkçe", meaning: "Doğudan gelen.", popularity: 74 },
  { name: "Lina", gender: "kız", origin: "Arapça", meaning: "Narin, yumuşak.", popularity: 65 },
  { name: "Zeynep", gender: "kız", origin: "Arapça", meaning: "Değerli taş.", popularity: 88 },
  { name: "Ada", gender: "uniseks", origin: "Türkçe", meaning: "Karaların arasında kalan toprak.", popularity: 70 },
  { name: "Deniz", gender: "uniseks", origin: "Türkçe", meaning: "Büyük su, sonsuzluk.", popularity: 80 },
  { name: "Ege", gender: "uniseks", origin: "Türkçe", meaning: "Ege Denizi'nden.", popularity: 67 },
  { name: "Aras", gender: "erkek", origin: "Türkçe", meaning: "Akarsu adı.", popularity: 58 },
  { name: "Demir", gender: "erkek", origin: "Türkçe", meaning: "Sağlam, dayanıklı.", popularity: 72 },
  { name: "Kerem", gender: "erkek", origin: "Türkçe", meaning: "Cömert, soylu.", popularity: 76 },
  { name: "Yusuf", gender: "erkek", origin: "İbranice", meaning: "Tanrı arttırsın.", popularity: 90 },
  { name: "Mert", gender: "erkek", origin: "Farsça", meaning: "Dürüst, sözünün eri.", popularity: 81 },
  { name: "Alp", gender: "erkek", origin: "Türkçe", meaning: "Yiğit, kahraman.", popularity: 64 },
  { name: "Can", gender: "uniseks", origin: "Farsça", meaning: "Ruh, hayat.", popularity: 79 },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replaceAll("ç", "c").replaceAll("ğ", "g").replaceAll("ı", "i")
    .replaceAll("ö", "o").replaceAll("ş", "s").replaceAll("ü", "u")
    .replace(/[^a-z0-9]+/g, "-");
}

export const babyNames: BabyName[] = raw.map((n) => ({
  ...n,
  slug: slugify(n.name),
  letter: n.name[0].toUpperCase(),
}));

export function findName(slug: string) {
  return babyNames.find((n) => n.slug === slug);
}
