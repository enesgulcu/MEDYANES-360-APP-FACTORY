import { err, ok, type Result } from '@medyanes360/cekirdek';
import { nativeMagazaSdkKullanilabilirMi } from '../runtime-ortam';
import { revenueCatHataMesaji } from './yardimci';

function platformOs(): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Platform } = require('react-native') as { Platform: { OS: string } };
    return Platform.OS;
  } catch {
    return 'ios';
  }
}

export interface RevenueCatYapilandirma {
  iosApiKey: string;
  androidApiKey: string;
  /** Firebase Auth uid ile RC müşterisini eşleştirmek için (opsiyonel ilk configure). */
  appUserId?: string;
  /** Geliştirme ortamında ayrıntılı RC logları. */
  debug?: boolean;
}

let yapilandirildi = false;

/** SDK'nın bir kez yapılandırılıp yapılandırılmadığını döner (test / koruma). */
export function revenueCatYapilandirildiMi(): boolean {
  return yapilandirildi;
}

async function purchasesSdk() {
  const modul = await import('react-native-purchases');
  return modul.default;
}

/**
 * RevenueCat SDK'sını platforma uygun public API anahtarıyla başlatır.
 * Web ve Expo Go'da no-op: mock ödeme kullanılır.
 */
export async function yapilandirRevenueCat(config: RevenueCatYapilandirma): Promise<Result<void>> {
  if (!nativeMagazaSdkKullanilabilirMi()) {
    return ok(undefined);
  }

  if (yapilandirildi) {
    return ok(undefined);
  }

  const apiKey =
    platformOs() === 'ios'
      ? config.iosApiKey
      : platformOs() === 'android'
        ? config.androidApiKey
        : '';

  if (apiKey.length === 0) {
    return err(new Error('RevenueCat API anahtarı tanımlı değil'));
  }

  try {
    const Purchases = await purchasesSdk();
    const { LOG_LEVEL } = await import('react-native-purchases');
    Purchases.setLogLevel(config.debug === true ? LOG_LEVEL.VERBOSE : LOG_LEVEL.INFO);
    Purchases.configure({
      apiKey,
      appUserID: config.appUserId,
    });
    yapilandirildi = true;
    return ok(undefined);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}

/** Anonim / giriş yapmış kullanıcıyı RC appUserID ile eşleştirir. */
export async function revenueCatKullaniciEslestir(appUserId: string): Promise<Result<void>> {
  if (!nativeMagazaSdkKullanilabilirMi() || !yapilandirildi) {
    return ok(undefined);
  }

  try {
    const Purchases = await purchasesSdk();
    await Purchases.logIn(appUserId);
    return ok(undefined);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}
