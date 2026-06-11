import { Platform } from 'react-native';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import Purchases, { type CustomerInfo } from 'react-native-purchases';
import { err, ok, type Result } from '@medyanes360/cekirdek';
import type { AbonelikDurumu } from '../client';
import { abonelikDurumuFromCustomerInfo, revenueCatHataMesaji } from './yardimci';
import { revenueCatYapilandirildiMi } from './yapilandir';

export { PAYWALL_RESULT };

/**
 * Entitlement aktif değilse RC dashboard paywall'unu gösterir.
 * Aktifse PAYWALL_RESULT.NOT_PRESENTED döner.
 */
export async function gosterPaywallGerekirse(
  entitlementId: string,
): Promise<Result<PAYWALL_RESULT>> {
  if (Platform.OS === 'web') {
    return err(new Error('RevenueCat paywall web platformunda desteklenmiyor'));
  }
  if (!revenueCatYapilandirildiMi()) {
    return err(new Error('RevenueCat henüz yapılandırılmadı'));
  }

  try {
    const sonuc = await RevenueCatUI.presentPaywallIfNeeded({
      requiredEntitlementIdentifier: entitlementId,
    });
    return ok(sonuc);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}

/** RC dashboard'da tasarlanan paywall'u doğrudan gösterir. */
export async function gosterRevenueCatPaywall(): Promise<Result<PAYWALL_RESULT>> {
  if (Platform.OS === 'web') {
    return err(new Error('RevenueCat paywall web platformunda desteklenmiyor'));
  }
  if (!revenueCatYapilandirildiMi()) {
    return err(new Error('RevenueCat henüz yapılandırılmadı'));
  }

  try {
    const sonuc = await RevenueCatUI.presentPaywall();
    return ok(sonuc);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}

/**
 * Abonelik yönetimi (iptal, geri yükle, plan değiştir) — ayarlar ekranından açılır.
 * Premium olmayan kullanıcılar da geri yükleme yapabilir.
 */
export async function gosterMusteriMerkezi(): Promise<Result<void>> {
  if (Platform.OS === 'web') {
    return err(new Error('Customer Center web platformunda desteklenmiyor'));
  }
  if (!revenueCatYapilandirildiMi()) {
    return err(new Error('RevenueCat henüz yapılandırılmadı'));
  }

  try {
    await RevenueCatUI.presentCustomerCenter();
    return ok(undefined);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}

/** Satın alma / restore sonrası paywall sonucunu fabrika durumuna çevirir. */
export function paywallSonucuPremiumMu(
  sonuc: PAYWALL_RESULT,
  entitlementId: string,
  customerInfo?: Awaited<ReturnType<typeof Purchases.getCustomerInfo>>,
): boolean {
  if (sonuc === PAYWALL_RESULT.PURCHASED || sonuc === PAYWALL_RESULT.RESTORED) {
    return true;
  }
  if (customerInfo !== undefined) {
    return abonelikDurumuFromCustomerInfo(customerInfo, entitlementId).premium;
  }
  return false;
}

/** CustomerInfo güncellemelerini dinler; abonelik durumu değişince callback çağrılır. */
export function revenueCatDurumDinleyici(
  entitlementId: string,
  dinleyici: (durum: AbonelikDurumu) => void,
): () => void {
  if (Platform.OS === 'web' || !revenueCatYapilandirildiMi()) {
    return () => undefined;
  }

  const guncelle = (customerInfo: CustomerInfo) => {
    dinleyici(abonelikDurumuFromCustomerInfo(customerInfo, entitlementId));
  };

  Purchases.addCustomerInfoUpdateListener(guncelle);
  return () => {
    Purchases.removeCustomerInfoUpdateListener(guncelle);
  };
}
