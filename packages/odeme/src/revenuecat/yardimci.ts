import type { CustomerInfo } from 'react-native-purchases';
import type { AbonelikDurumu, Urun } from '../client';

/** RevenueCat ürün kimliğinden fabrika periyot alanını çıkarır. */
export function periyotFromUrunKimligi(urunKimligi: string): Urun['periyot'] {
  const kucuk = urunKimligi.toLowerCase();
  if (kucuk.includes('year') || kucuk === 'yearly' || kucuk.includes('yillik')) {
    return 'yillik';
  }
  if (kucuk.includes('month') || kucuk === 'monthly' || kucuk.includes('aylik')) {
    return 'aylik';
  }
  if (kucuk.includes('week') || kucuk.includes('haftalik')) {
    return 'haftalik';
  }
  return null;
}

/** CustomerInfo → fabrika abonelik durumu (entitlement tek kaynak). */
export function abonelikDurumuFromCustomerInfo(
  customerInfo: CustomerInfo,
  entitlementId: string,
): AbonelikDurumu {
  const entitlement = customerInfo.entitlements.active[entitlementId];
  if (entitlement === undefined) {
    return { premium: false, bitisTarihi: null };
  }

  // RC SDK sürümleri expirationDate (ISO) veya expirationDateMillis dönebilir.
  const entitlementKayit = entitlement as {
    expirationDateMillis?: number | null;
    expirationDate?: string | null;
  };

  let bitisTarihi: number | null = null;
  if (
    typeof entitlementKayit.expirationDateMillis === 'number' &&
    entitlementKayit.expirationDateMillis > 0
  ) {
    bitisTarihi = entitlementKayit.expirationDateMillis;
  } else if (
    typeof entitlementKayit.expirationDate === 'string' &&
    entitlementKayit.expirationDate.length > 0
  ) {
    const parsed = Date.parse(entitlementKayit.expirationDate);
    bitisTarihi = Number.isNaN(parsed) ? null : parsed;
  }

  return {
    premium: true,
    bitisTarihi,
  };
}

/** Bilinmeyen hatayı Error'a çevirir; loglama katmanına uygun mesaj üretir. */
export function revenueCatHataMesaji(hata: unknown): Error {
  if (hata instanceof Error) return hata;
  return new Error(String(hata));
}
