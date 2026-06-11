import { createMockOdeme, type OdemeIstemcisi, type Urun } from './client';
import { nativeMagazaSdkKullanilabilirMi } from './runtime-ortam';
import { createRevenueCatOdeme, type RevenueCatOdemeSecenekleri } from './revenuecat/istemci';

export interface OdemeFabrikaSecenekleri {
  /** .env'de en az bir RC anahtarı var mı? */
  apiAnahtariTanimli: boolean;
  /** Mock / yedek UI ürün listesi (web, Expo Go, geliştirme). */
  mockUrunler: Urun[];
  /** Native build'de kullanılacak RC yapılandırması. */
  revenueCat: RevenueCatOdemeSecenekleri;
  /**
   * 'auto': ortama göre mock veya RC seçer (varsayılan).
   * 'mock' / 'revenuecat': test veya zorla mod.
   */
  mod?: 'auto' | 'mock' | 'revenuecat';
}

/**
 * Ortama uygun ödeme istemcisini seçer.
 * Web ve Expo Go'da mock; yalnızca native build'de RevenueCat.
 */
export function createOdemeIstemcisi(secenekler: OdemeFabrikaSecenekleri): OdemeIstemcisi {
  const mod = secenekler.mod ?? 'auto';

  const rcKullan =
    mod === 'revenuecat' ||
    (mod === 'auto' && secenekler.apiAnahtariTanimli && nativeMagazaSdkKullanilabilirMi());

  if (rcKullan) {
    return createRevenueCatOdeme(secenekler.revenueCat);
  }

  return createMockOdeme(secenekler.mockUrunler);
}
