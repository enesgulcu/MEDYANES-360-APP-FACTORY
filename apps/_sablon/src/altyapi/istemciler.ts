/**
 * ALTYAPI İSTEMCİLERİ — tek giriş kapısı.
 * Servis modu: EXPO_PUBLIC_SERVIS_MODU (mock | canli). Varsayılan mock.
 * Canlı mod: Firebase/RevenueCat bağlandıktan sonra; ekran kodu değişmez.
 */
import { createAnalitikIstemcisi } from '@medyanes360/analitik';
import { createBildirimIstemcisi } from '@medyanes360/bildirim';
import { createKimlikIstemcisi } from '@medyanes360/kimlik';
import { createLogger, createMockFirestoreHedefi } from '@medyanes360/loglama';
import { createOdemeIstemcisi, PaywallYoneticisi } from '@medyanes360/odeme';
import { createUzakAyarIstemcisi } from '@medyanes360/uzak-ayar';
import { APP_INFO } from './appInfo';

const MOCK_URUNLER = [
  { id: 'aylik_premium', fiyatMetni: '₺49,99', periyot: 'aylik' as const },
  { id: 'yillik_premium', fiyatMetni: '₺399,99', periyot: 'yillik' as const },
];

export const kimlik = createKimlikIstemcisi();

export const analitik = createAnalitikIstemcisi(APP_INFO);

export const logger = createLogger(APP_INFO, analitik, createMockFirestoreHedefi());

export const odeme = createOdemeIstemcisi({
  apiAnahtariTanimli: false,
  mockUrunler: MOCK_URUNLER,
  revenueCat: { entitlementId: 'premium' },
  mod: 'mock',
});

export const paywall = new PaywallYoneticisi(odeme);

export const uzakAyar = createUzakAyarIstemcisi({
  paywall: { aktif: true, baslikAnahtari: 'paywall.baslik', oneCikanUrun: 'yillik_premium' },
});

export const bildirim = createBildirimIstemcisi();
