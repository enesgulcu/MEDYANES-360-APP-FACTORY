import { z } from 'zod';
import { parseWith } from '@medyanes360/cekirdek';

/**
 * Remote Config sarmalayıcısı. Temel fikir: uygulama davranışı (paywall
 * gösterimi, kampanya metni, özellik aç/kapa) YENİDEN YAYIN YAPMADAN
 * uzaktan değiştirilebilir.
 *
 * Remote Config'ten gelen her değer DIŞ VERİDİR: Zod şemasından geçmeden
 * kullanılamaz. Şemadan geçmezse uygulama çökmez; güvenli varsayılana döner.
 */
export interface UzakAyarIstemcisi {
  /**
   * Anahtarın değerini şemayla doğrulayıp döner.
   * Değer yoksa veya şemadan geçmezse `varsayilan` döner — uygulama uzak
   * ayar yüzünden asla kırılmaz.
   */
  getValue<T>(anahtar: string, schema: z.ZodType<T>, varsayilan: T): T;
  /** Sunucudan güncel değerleri çeker (gerçek istemcide fetchAndActivate). */
  refresh(): Promise<void>;
}

/** Bellek-içi mock istemci; testlerde `degerAyarla` ile senaryo kurulur. */
export function createMockUzakAyar(
  baslangicDegerleri: Record<string, unknown> = {},
): UzakAyarIstemcisi & { degerAyarla(anahtar: string, deger: unknown): void } {
  const degerler = new Map<string, unknown>(Object.entries(baslangicDegerleri));

  return {
    degerAyarla(anahtar: string, deger: unknown) {
      degerler.set(anahtar, deger);
    },
    getValue<T>(anahtar: string, schema: z.ZodType<T>, varsayilan: T): T {
      if (!degerler.has(anahtar)) return varsayilan;
      const sonuc = parseWith(schema, degerler.get(anahtar));
      if (!sonuc.ok) {
        // Sessiz yutma yasak: bozuk uzak ayar görünür olmalı ama uygulamayı kırmamalı.
        console.warn(`[uzak-ayar] '${anahtar}' şemadan geçmedi, varsayılan kullanılıyor.`);
        return varsayilan;
      }
      return sonuc.value;
    },
    async refresh() {
      // Mock'ta çekilecek sunucu yok; gerçek istemcide fetchAndActivate çağrılır.
    },
  };
}

/**
 * ÖRNEK: uzaktan yönetilebilir paywall ayarı. Şablon uygulamadaki örnek
 * paywall bu şemayı kullanır; böylece "paywall'ı uzaktan aç/kapat, başlığını
 * değiştir" senaryosu ilk günden çalışır halde görülür.
 */
export const PaywallAyariSemasi = z.object({
  /** Paywall onboarding sonunda gösterilsin mi? */
  aktif: z.boolean(),
  /** Paywall başlık çeviri anahtarı (metnin kendisi değil — i18n kuralı). */
  baslikAnahtari: z.string().min(1),
  /** Öne çıkarılacak ürün kimliği. */
  oneCikanUrun: z.string().min(1),
});

export type PaywallAyari = z.infer<typeof PaywallAyariSemasi>;

export const VARSAYILAN_PAYWALL_AYARI: PaywallAyari = {
  aktif: true,
  baslikAnahtari: 'paywall.baslik',
  oneCikanUrun: 'yillik_premium',
};
