import { revenueCatSdkKullanilabilirMi } from '@medyanes360/odeme';

/**
 * RevenueCat ortam yapılandırması — anahtarlar .env / EAS secrets'tan gelir.
 * Entitlement identifier dashboard ile birebir aynı olmalıdır.
 */
export const REVENUECAT_IOS_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? '';

export const REVENUECAT_ANDROID_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ?? '';

/** Dashboard → Product catalog → Entitlements → Identifier */
export const REVENUECAT_ENTITLEMENT_ID =
  process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID ?? 'Alışkanlık Pro';

/** En az bir platform anahtarı tanımlı (.env mevcut). */
export const REVENUECAT_AKTIF =
  REVENUECAT_IOS_API_KEY.length > 0 || REVENUECAT_ANDROID_API_KEY.length > 0;

/**
 * Native RC SDK çalıştırılabilir (web + Expo Go hariç — mock ödeme).
 */
export const REVENUECAT_SDK_AKTIF = revenueCatSdkKullanilabilirMi(REVENUECAT_AKTIF);

/** RC dashboard ürün kimlikleri (monthly / yearly). */
export const REVENUECAT_URUNLER = [
  { id: 'monthly', fiyatMetni: '₺49,99', periyot: 'aylik' as const },
  { id: 'yearly', fiyatMetni: '₺399,99', periyot: 'yillik' as const },
];
