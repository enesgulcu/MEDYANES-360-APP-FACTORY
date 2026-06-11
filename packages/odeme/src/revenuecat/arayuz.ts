import { err, ok, type Result } from '@medyanes360/cekirdek';
import { nativeMagazaSdkKullanilabilirMi } from '../runtime-ortam';
import type { AbonelikDurumu } from '../client';
import { PAYWALL_SONUC, type PaywallSonucDegeri } from './paywall-sonuc';
import { abonelikDurumuFromCustomerInfo, revenueCatHataMesaji } from './yardimci';
import { revenueCatYapilandirildiMi } from './yapilandir';

export { PAYWALL_SONUC, PAYWALL_RESULT, type PaywallSonucDegeri } from './paywall-sonuc';

async function revenueCatUi() {
  const modul = await import('react-native-purchases-ui');
  return modul.default;
}

async function purchasesSdk() {
  const modul = await import('react-native-purchases');
  return modul.default;
}

function sdkKullanilabilirMi(): Result<void> {
  if (!nativeMagazaSdkKullanilabilirMi()) {
    return err(new Error('RevenueCat yalnızca native build ortamında kullanılabilir'));
  }
  if (!revenueCatYapilandirildiMi()) {
    return err(new Error('RevenueCat henüz yapılandırılmadı'));
  }
  return ok(undefined);
}

/**
 * Entitlement aktif değilse RC dashboard paywall'unu gösterir.
 * Aktifse PAYWALL_RESULT.NOT_PRESENTED döner.
 */
export async function gosterPaywallGerekirse(
  entitlementId: string,
): Promise<Result<PaywallSonucDegeri>> {
  const hazir = sdkKullanilabilirMi();
  if (!hazir.ok) return hazir;

  try {
    const RevenueCatUI = await revenueCatUi();
    const sonuc = await RevenueCatUI.presentPaywallIfNeeded({
      requiredEntitlementIdentifier: entitlementId,
    });
    return ok(sonuc);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}

/** RC dashboard'da tasarlanan paywall'u doğrudan gösterir. */
export async function gosterRevenueCatPaywall(): Promise<Result<PaywallSonucDegeri>> {
  const hazir = sdkKullanilabilirMi();
  if (!hazir.ok) return hazir;

  try {
    const RevenueCatUI = await revenueCatUi();
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
  const hazir = sdkKullanilabilirMi();
  if (!hazir.ok) return hazir;

  try {
    const RevenueCatUI = await revenueCatUi();
    await RevenueCatUI.presentCustomerCenter();
    return ok(undefined);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}

/** Satın alma / restore sonrası paywall sonucunu fabrika durumuna çevirir. */
export async function paywallSonucuPremiumMu(
  sonuc: PaywallSonucDegeri,
  entitlementId: string,
  customerInfo?: Awaited<ReturnType<Awaited<ReturnType<typeof purchasesSdk>>['getCustomerInfo']>>,
): Promise<boolean> {
  if (sonuc === PAYWALL_SONUC.PURCHASED || sonuc === PAYWALL_SONUC.RESTORED) {
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
  if (!nativeMagazaSdkKullanilabilirMi() || !revenueCatYapilandirildiMi()) {
    return () => undefined;
  }

  let iptal = false;
  let kaldir: (() => void) | null = null;

  void (async () => {
    try {
      const Purchases = await purchasesSdk();
      if (iptal) return;

      const guncelle = (customerInfo: Awaited<ReturnType<typeof Purchases.getCustomerInfo>>) => {
        dinleyici(abonelikDurumuFromCustomerInfo(customerInfo, entitlementId));
      };

      Purchases.addCustomerInfoUpdateListener(guncelle);
      kaldir = () => {
        Purchases.removeCustomerInfoUpdateListener(guncelle);
      };
    } catch {
      // SDK yüklenemedi — sessiz kal, mock akış devam eder.
    }
  })();

  return () => {
    iptal = true;
    kaldir?.();
  };
}
