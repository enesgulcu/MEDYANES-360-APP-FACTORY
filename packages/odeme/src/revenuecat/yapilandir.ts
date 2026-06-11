import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { err, ok, type Result } from '@medyanes360/cekirdek';
import { revenueCatHataMesaji } from './yardimci';

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

/**
 * RevenueCat SDK'sını platforma uygun public API anahtarıyla başlatır.
 * Web'de no-op: web satın alma ayrı RC Web Billing akışı gerektirir.
 */
export async function yapilandirRevenueCat(config: RevenueCatYapilandirma): Promise<Result<void>> {
  if (Platform.OS === 'web') {
    return ok(undefined);
  }

  if (yapilandirildi) {
    return ok(undefined);
  }

  const apiKey =
    Platform.OS === 'ios'
      ? config.iosApiKey
      : Platform.OS === 'android'
        ? config.androidApiKey
        : '';

  if (apiKey.length === 0) {
    return err(new Error('RevenueCat API anahtarı tanımlı değil'));
  }

  try {
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
  if (Platform.OS === 'web' || !yapilandirildi) {
    return ok(undefined);
  }

  try {
    await Purchases.logIn(appUserId);
    return ok(undefined);
  } catch (hata) {
    return err(revenueCatHataMesaji(hata));
  }
}
