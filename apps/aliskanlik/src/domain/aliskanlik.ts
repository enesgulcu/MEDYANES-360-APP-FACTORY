import { z } from 'zod';

/** Alışkanlık rengi — hex formatında (#RRGGBB). */
export const AliskanlikRenkSemasi = z.string().regex(/^#[0-9A-Fa-f]{6}$/);

export const AliskanlikSemasi = z.object({
  id: z.string().min(1),
  ad: z.string().min(1).max(80),
  renk: AliskanlikRenkSemasi,
  /** ISO tarih dizisi: YYYY-MM-DD — tamamlanan günler. */
  tamamlananGunler: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  olusturulmaMs: z.number().int().positive(),
});

export type Aliskanlik = z.infer<typeof AliskanlikSemasi>;

export const AliskanlikFormSemasi = z.object({
  ad: z.string().trim().min(1, 'aliskanlik.form.adZorunlu').max(80),
  renk: AliskanlikRenkSemasi,
});

export type AliskanlikForm = z.infer<typeof AliskanlikFormSemasi>;

/** MVP'de seçilebilir renk paleti (tema A ile uyumlu). */
export const ALISKANLIK_RENKLERI = [
  '#059669',
  '#2563EB',
  '#DC2626',
  '#D97706',
  '#7C3AED',
  '#DB2777',
] as const;

/** Yerel saat diliminde bugünün tarihi (YYYY-MM-DD). */
export function bugununTarihi(): string {
  const simdi = new Date();
  const yil = simdi.getFullYear();
  const ay = String(simdi.getMonth() + 1).padStart(2, '0');
  const gun = String(simdi.getDate()).padStart(2, '0');
  return `${yil}-${ay}-${gun}`;
}

/** Ardışık tamamlama günü sayısı (basit streak). */
export function seriHesapla(tamamlananGunler: readonly string[], bugun: string): number {
  const set = new Set(tamamlananGunler);
  let seri = 0;
  let tarih = bugun;

  while (set.has(tarih)) {
    seri += 1;
    const parca = tarih.split('-').map(Number);
    const d = new Date(parca[0], parca[1] - 1, parca[2]);
    d.setDate(d.getDate() - 1);
    tarih = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  return seri;
}

export function bugunTamamlandiMi(aliskanlik: Aliskanlik, bugun: string): boolean {
  return aliskanlik.tamamlananGunler.includes(bugun);
}
