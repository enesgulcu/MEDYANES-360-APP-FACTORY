/**
 * ALTYAPI İSTEMCİLERİ (tekil/singleton).
 *
 * Şu an HEPSİ MOCK MODDA: Firebase ve RevenueCat hesapları bağlandığında
 * yalnızca bu dosyadaki create* çağrıları gerçek istemcilerle değiştirilecek;
 * ekran kodları arayüzler aynı kaldığı için HİÇ değişmeyecek.
 */
import { createMockAnalitik } from '@medyanes360/analitik';
import { createMockBildirim } from '@medyanes360/bildirim';
import { createMockKimlik } from '@medyanes360/kimlik';
import { createLogger, createMockFirestoreHedefi } from '@medyanes360/loglama';
import { createMockOdeme, PaywallYoneticisi } from '@medyanes360/odeme';
import { createMockUzakAyar } from '@medyanes360/uzak-ayar';
import { APP_INFO } from './appInfo';

export const kimlik = createMockKimlik();

export const analitik = createMockAnalitik(APP_INFO);

export const logger = createLogger(APP_INFO, analitik, createMockFirestoreHedefi());

export const odeme = createMockOdeme();

export const paywall = new PaywallYoneticisi(odeme);

// Örnek: paywall'ın uzaktan yönetilebildiğini ilk günden göstermek için
// mock uzak ayara örnek bir paywall yapılandırması koyuyoruz.
export const uzakAyar = createMockUzakAyar({
  paywall: { aktif: true, baslikAnahtari: 'paywall.baslik', oneCikanUrun: 'yillik_premium' },
});

export const bildirim = createMockBildirim();
