/**
 * RevenueCat PAYWALL_RESULT sabitleri — SDK import etmeden ekranlarda kullanılır.
 * Değerler @revenuecat/purchases-typescript-internal ile birebir eşleşmeli.
 */
export const PAYWALL_SONUC = {
  NOT_PRESENTED: 'NOT_PRESENTED',
  ERROR: 'ERROR',
  CANCELLED: 'CANCELLED',
  PURCHASED: 'PURCHASED',
  RESTORED: 'RESTORED',
} as const;

export type PaywallSonucDegeri = (typeof PAYWALL_SONUC)[keyof typeof PAYWALL_SONUC];

/** @deprecated PAYWALL_SONUC kullanın — geriye dönük uyumluluk. */
export const PAYWALL_RESULT = PAYWALL_SONUC;
