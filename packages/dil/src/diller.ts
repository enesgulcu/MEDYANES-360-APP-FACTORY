import { z } from 'zod';
import ortakTr from './ceviriler/tr.json';
import ortakEn from './ceviriler/en.json';

/** Fabrika genelinde desteklenen diller. Yeni dil eklemek çekirdek değişikliğidir. */
export const DESTEKLENEN_DILLER = ['tr', 'en'] as const;
export type DilKodu = (typeof DESTEKLENEN_DILLER)[number];

export const DilKoduSemasi = z.enum(DESTEKLENEN_DILLER);

/**
 * Cihaz dilini desteklenen dile çevirir. Cihaz dili dış veridir
 * ("tr-TR", "en-US", "de-DE"...); desteklenmeyen dilde İngilizce'ye düşülür.
 */
export function cihazDilindenSec(cihazDili: string): DilKodu {
  const kisa = cihazDili.toLowerCase().slice(0, 2);
  const sonuc = DilKoduSemasi.safeParse(kisa);
  return sonuc.success ? sonuc.data : 'en';
}

/**
 * RTL (sağdan-sola) diller için yapısal hazırlık. Şu an desteklenen
 * dillerde RTL yok; Arapça vb. eklendiğinde bu liste güncellenir ve
 * layout'lar yön-bağımsız (start/end) yazıldığı için kendiliğinden uyar.
 */
const RTL_DILLER: readonly string[] = ['ar', 'he', 'fa', 'ur'];

export function rtlMi(dil: string): boolean {
  return RTL_DILLER.includes(dil.toLowerCase().slice(0, 2));
}

/**
 * Tüm uygulamaların paylaştığı ORTAK çeviri kaynakları (buton metinleri,
 * hata mesajları, ayarlar/paywall metinleri). Uygulamalar kendi çevirilerini
 * bunların ÜZERİNE ekler; ortak anahtarları yeniden tanımlamaz.
 */
export const ORTAK_CEVIRILER = {
  tr: ortakTr,
  en: ortakEn,
} as const;
