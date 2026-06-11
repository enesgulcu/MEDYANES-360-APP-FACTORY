/**
 * RevenueCat ortam yapılandırması — anahtarlar .env / EAS secrets'tan gelir.
 * Entitlement identifier dashboard ile birebir aynı olmalıdır.
 */
export const REVENUECAT_IOS_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? '';

export const REVENUECAT_ANDROID_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ?? '';

/** Dashboard → Product catalog → Entitlements → Identifier */
export const REVENUECAT_ENTITLEMENT_ID =
  process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID ?? 'Alışkanlık Pro';

/** En az bir platform anahtarı varsa gerçek RC istemcisi kullanılır. */
export const REVENUECAT_AKTIF =
  REVENUECAT_IOS_API_KEY.length > 0 || REVENUECAT_ANDROID_API_KEY.length > 0;

/** RC dashboard ürün kimlikleri (monthly / yearly). */
export const REVENUECAT_URUNLER = [
  { id: 'monthly', fiyatMetni: '₺49,99', periyot: 'aylik' as const },
  { id: 'yearly', fiyatMetni: '₺399,99', periyot: 'yillik' as const },
];
