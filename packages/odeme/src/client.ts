import { z } from 'zod';
import { err, ok, type Result } from '@medyanes360/cekirdek';

/**
 * RevenueCat kavramlarının fabrika standardı sadeleştirilmiş karşılıkları.
 * Uygulamalar RevenueCat SDK tiplerini DOĞRUDAN görmez; bu sayede SDK
 * sürüm değişimleri yalnızca bu paketi etkiler.
 */
export const UrunSemasi = z.object({
  /** RevenueCat ürün kimliği, ör. "aylik_premium" */
  id: z.string().min(1),
  /** Mağazadan gelen, yerelleştirilmiş fiyat metni, ör. "₺49,99" */
  fiyatMetni: z.string().min(1),
  /** Abonelik periyodu; tek seferlik üründe null. */
  periyot: z.enum(['aylik', 'yillik', 'haftalik']).nullable(),
});

export type Urun = z.infer<typeof UrunSemasi>;

export const AbonelikDurumuSemasi = z.object({
  /** Kullanıcının aktif premium erişimi var mı? (RevenueCat entitlement) */
  premium: z.boolean(),
  /** Aktif aboneliğin bitiş tarihi (epoch ms); yoksa null. */
  bitisTarihi: z.number().int().positive().nullable(),
});

export type AbonelikDurumu = z.infer<typeof AbonelikDurumuSemasi>;

/** Ödeme istemcisi sözleşmesi — arkada RevenueCat ya da mock çalışır. */
export interface OdemeIstemcisi {
  /** Satışa açık ürünleri getirir (RevenueCat offerings). */
  getProducts(): Promise<Result<Urun[]>>;
  /** Satın alma akışını başlatır; mağaza diyaloğu açılır. */
  purchase(urunId: string): Promise<Result<AbonelikDurumu>>;
  /** Önceki satın alımları geri yükler (mağaza zorunluluğu). */
  restorePurchases(): Promise<Result<AbonelikDurumu>>;
  /** Mevcut abonelik durumunu getirir. */
  getStatus(): Promise<Result<AbonelikDurumu>>;
}

/**
 * Mock ödeme istemcisi: RevenueCat hesabı açılana kadar geliştirme ve test
 * bununla yapılır. Satın alma "hep başarılı" davranır; ürün listesi sabittir.
 */
export function createMockOdeme(
  urunler: Urun[] = [
    { id: 'aylik_premium', fiyatMetni: '₺49,99', periyot: 'aylik' },
    { id: 'yillik_premium', fiyatMetni: '₺399,99', periyot: 'yillik' },
  ],
): OdemeIstemcisi {
  let durum: AbonelikDurumu = { premium: false, bitisTarihi: null };

  return {
    async getProducts() {
      return ok(urunler);
    },
    async purchase(urunId: string) {
      const urun = urunler.find((u) => u.id === urunId);
      if (!urun) return err(new Error(`Ürün bulunamadı: ${urunId}`));
      // Mock: 30 gün geçerli premium ver.
      durum = { premium: true, bitisTarihi: Date.now() + 30 * 24 * 60 * 60 * 1000 };
      return ok(durum);
    },
    async restorePurchases() {
      return ok(durum);
    },
    async getStatus() {
      return ok(durum);
    },
  };
}
