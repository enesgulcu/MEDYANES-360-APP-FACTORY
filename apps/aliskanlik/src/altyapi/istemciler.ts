import { z } from 'zod';
import { createMockAnalitik } from '@medyanes360/analitik';
import { createMockBildirim } from '@medyanes360/bildirim';
import {
  createFirebaseKimlik,
  createMockKimlik,
  firebaseBaslat,
  type FirebaseOturum,
} from '@medyanes360/kimlik';
import { createLogger, createMockFirestoreHedefi } from '@medyanes360/loglama';
import { createOdemeIstemcisi, PaywallYoneticisi } from '@medyanes360/odeme';
import {
  createFirebaseUzakAyar,
  createMockUzakAyar,
  VARSAYILAN_PAYWALL_AYARI,
} from '@medyanes360/uzak-ayar';
import { APP_INFO } from './appInfo';
import { FIREBASE_AKTIF, FIREBASE_WEB_YAPILANDIRMA } from './firebase-yapilandirma';
import {
  REVENUECAT_AKTIF,
  REVENUECAT_ENTITLEMENT_ID,
  REVENUECAT_URUNLER,
} from './revenuecat-yapilandirma';
import { createAliskanlikDeposu, type AliskanlikDeposu } from '../veri/aliskanlik-depo';

/** Ücretsiz planda izin verilen maksimum alışkanlık sayısı (Remote Config). */
export const UcretsizAliskanlikLimitiSemasi = z.number().int().positive();

let firebaseOturum: FirebaseOturum | null = null;

if (FIREBASE_AKTIF) {
  firebaseOturum = firebaseBaslat(FIREBASE_WEB_YAPILANDIRMA);
}

export const kimlik =
  FIREBASE_AKTIF && firebaseOturum !== null
    ? createFirebaseKimlik(firebaseOturum.auth)
    : createMockKimlik();

export const analitik = createMockAnalitik(APP_INFO);

export const logger = createLogger(APP_INFO, analitik, createMockFirestoreHedefi());

export const odeme = createOdemeIstemcisi({
  apiAnahtariTanimli: REVENUECAT_AKTIF,
  mockUrunler: REVENUECAT_URUNLER,
  revenueCat: { entitlementId: REVENUECAT_ENTITLEMENT_ID },
});

export const paywall = new PaywallYoneticisi(odeme);

const uzakAyarVarsayilanlari = {
  ucretsiz_aliskanlik_limiti: 3,
  paywall: {
    aktif: true,
    baslikAnahtari: 'paywall.baslik',
    oneCikanUrun: 'yearly',
  },
};

export const uzakAyar =
  FIREBASE_AKTIF && firebaseOturum !== null
    ? createFirebaseUzakAyar(firebaseOturum.app, { degerler: uzakAyarVarsayilanlari })
    : createMockUzakAyar(uzakAyarVarsayilanlari);

export const bildirim = createMockBildirim();

export const aliskanlikDeposu: AliskanlikDeposu | null =
  FIREBASE_AKTIF && firebaseOturum !== null ? createAliskanlikDeposu(firebaseOturum.db) : null;

export { firebaseOturum };
export {
  REVENUECAT_AKTIF,
  REVENUECAT_ENTITLEMENT_ID,
  REVENUECAT_SDK_AKTIF,
} from './revenuecat-yapilandirma';
export { VARSAYILAN_PAYWALL_AYARI };
