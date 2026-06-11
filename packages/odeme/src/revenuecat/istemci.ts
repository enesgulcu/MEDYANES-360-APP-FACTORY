import { err, ok, type Result } from '@medyanes360/cekirdek';
import type { AbonelikDurumu, OdemeIstemcisi, Urun } from '../client';
import { UrunSemasi } from '../client';
import {
  abonelikDurumuFromCustomerInfo,
  periyotFromUrunKimligi,
  revenueCatHataMesaji,
} from './yardimci';
import { revenueCatYapilandirildiMi } from './yapilandir';

export interface RevenueCatOdemeSecenekleri {
  /** Dashboard'daki entitlement identifier — örn. "Alışkanlık Pro" */
  entitlementId: string;
}

async function purchasesSdk() {
  const modul = await import('react-native-purchases');
  return modul;
}

function kullaniciIptalMi(hata: unknown, iptalKodu: string): boolean {
  if (typeof hata !== 'object' || hata === null || !('code' in hata)) {
    return false;
  }
  return (hata as { code: string }).code === iptalKodu;
}

function sdkHazirMi(): Result<void> {
  if (!revenueCatYapilandirildiMi()) {
    return err(new Error('RevenueCat henüz yapılandırılmadı'));
  }
  return ok(undefined);
}

/**
 * Gerçek RevenueCat istemcisi — uygulamalar SDK tiplerini doğrudan görmez.
 * Ürün kimlikleri mağaza / RC dashboard ile birebir eşleşmeli (monthly, yearly).
 */
export function createRevenueCatOdeme(secenekler: RevenueCatOdemeSecenekleri): OdemeIstemcisi {
  const { entitlementId } = secenekler;

  return {
    async getProducts(): Promise<Result<Urun[]>> {
      const hazir = sdkHazirMi();
      if (!hazir.ok) return hazir;

      try {
        const { default: Purchases } = await purchasesSdk();
        const offerings = await Purchases.getOfferings();
        const mevcut = offerings.current;
        if (mevcut === null || mevcut.availablePackages.length === 0) {
          return err(new Error('Satışa açık offering bulunamadı'));
        }

        const urunler = mevcut.availablePackages.map((pkg) =>
          UrunSemasi.parse({
            id: pkg.product.identifier,
            fiyatMetni: pkg.product.priceString,
            periyot: periyotFromUrunKimligi(pkg.product.identifier),
          }),
        );

        return ok(urunler);
      } catch (hata) {
        return err(revenueCatHataMesaji(hata));
      }
    },

    async purchase(urunId: string): Promise<Result<AbonelikDurumu>> {
      const hazir = sdkHazirMi();
      if (!hazir.ok) return hazir;

      try {
        const { default: Purchases } = await purchasesSdk();
        const offerings = await Purchases.getOfferings();
        const paket =
          offerings.current?.availablePackages.find(
            (p) => p.product.identifier === urunId || p.identifier === urunId,
          ) ??
          Object.values(offerings.all)
            .flatMap((o) => o.availablePackages)
            .find((p) => p.product.identifier === urunId || p.identifier === urunId);

        if (paket === undefined) {
          return err(new Error(`Ürün bulunamadı: ${urunId}`));
        }

        const { customerInfo } = await Purchases.purchasePackage(paket);
        return ok(abonelikDurumuFromCustomerInfo(customerInfo, entitlementId));
      } catch (hata) {
        const { PURCHASES_ERROR_CODE } = await purchasesSdk();
        if (kullaniciIptalMi(hata, PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR)) {
          return err(new Error('PURCHASE_CANCELLED'));
        }
        return err(revenueCatHataMesaji(hata));
      }
    },

    async restorePurchases(): Promise<Result<AbonelikDurumu>> {
      const hazir = sdkHazirMi();
      if (!hazir.ok) return hazir;

      try {
        const { default: Purchases } = await purchasesSdk();
        const customerInfo = await Purchases.restorePurchases();
        return ok(abonelikDurumuFromCustomerInfo(customerInfo, entitlementId));
      } catch (hata) {
        return err(revenueCatHataMesaji(hata));
      }
    },

    async getStatus(): Promise<Result<AbonelikDurumu>> {
      const hazir = sdkHazirMi();
      if (!hazir.ok) return hazir;

      try {
        const { default: Purchases } = await purchasesSdk();
        const customerInfo = await Purchases.getCustomerInfo();
        return ok(abonelikDurumuFromCustomerInfo(customerInfo, entitlementId));
      } catch (hata) {
        return err(revenueCatHataMesaji(hata));
      }
    },
  };
}
