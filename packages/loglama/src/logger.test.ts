import type { AppInfo } from '@medyanes360/cekirdek';
import { createMockAnalitik } from '@medyanes360/analitik';
import { createLogger, createMockFirestoreHedefi } from './logger';

const testApp: AppInfo = {
  appId: 'com.medyanes360.testapp',
  appVersion: '1.0.0',
  platform: 'android',
};

function kur() {
  const analitik = createMockAnalitik(testApp);
  const firestore = createMockFirestoreHedefi();
  const logger = createLogger(testApp, analitik, firestore);
  return { analitik, firestore, logger };
}

describe('createLogger', () => {
  it('tek çağrı iki hedefe birden yazar', () => {
    const { analitik, firestore, logger } = kur();
    logger.setUserId('anon-42');
    logger.log('app_open');

    expect(analitik.kayitlar).toHaveLength(1);
    expect(firestore.kullaniciKayitlari.get('anon-42')).toHaveLength(1);
  });

  it('log kaydı standart şemayı taşır', () => {
    const { firestore, logger } = kur();
    logger.setUserId('anon-42');
    logger.log('screen_view', { ekran: 'ayarlar' });

    const kayit = firestore.kullaniciKayitlari.get('anon-42')?.[0];
    expect(kayit).toMatchObject({
      userId: 'anon-42',
      appId: testApp.appId,
      event: 'screen_view',
      params: { ekran: 'ayarlar' },
      appVersion: '1.0.0',
      platform: 'android',
    });
    expect(typeof kayit?.timestamp).toBe('number');
  });

  it('logError hatayı "error" olayına çevirir (sessiz yutma yok)', () => {
    const { analitik, logger } = kur();
    logger.setUserId('anon-42');
    logger.logError(new Error('ağ koptu'), 'profil-yukleme');

    expect(analitik.kayitlar[0]?.olay).toBe('error');
    expect(analitik.kayitlar[0]?.parametreler['mesaj']).toBe('ağ koptu');
  });

  it('şemadan geçmeyen olay adı hiçbir hedefe yazılmaz', () => {
    const { analitik, firestore, logger } = kur();
    logger.setUserId('anon-42');
    logger.log('Bozuk Olay Adı');

    expect(analitik.kayitlar).toHaveLength(0);
    expect(firestore.kullaniciKayitlari.size).toBe(0);
  });
});
