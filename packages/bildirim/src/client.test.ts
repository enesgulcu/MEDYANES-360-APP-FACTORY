import { createMockBildirim, parseBildirim } from './client';

describe('parseBildirim', () => {
  it('geçerli payload bildirime çevrilir', () => {
    const sonuc = parseBildirim({ baslik: 'Merhaba', govde: 'Yeni özellik!' });
    expect(sonuc.ok).toBe(true);
    if (sonuc.ok) {
      expect(sonuc.value.hedefEkran).toBeNull(); // varsayılan dolduruldu
      expect(sonuc.value.veri).toEqual({});
    }
  });

  it('bozuk payload reddedilir, uygulama çökmez', () => {
    const sonuc = parseBildirim({ baslik: '' });
    expect(sonuc.ok).toBe(false);
  });
});

describe('createMockBildirim', () => {
  it('izin akışı çalışır', async () => {
    const bildirim = createMockBildirim();
    const sonuc = await bildirim.requestPermission();
    expect(sonuc.ok && sonuc.value === 'verildi').toBe(true);
  });

  it('geçerli bildirim dinleyicilere ulaşır', () => {
    const istemci = createMockBildirim();
    const gelenler: string[] = [];
    istemci.onMessage((b) => gelenler.push(b.baslik));

    istemci.bildirimSimuleEt({ baslik: 'Test', govde: 'İçerik' });
    expect(gelenler).toEqual(['Test']);
  });

  it('bozuk bildirim dinleyicilere ULAŞMAZ', () => {
    const istemci = createMockBildirim();
    const gelenler: string[] = [];
    istemci.onMessage((b) => gelenler.push(b.baslik));

    istemci.bildirimSimuleEt({ bozuk: true });
    expect(gelenler).toHaveLength(0);
  });

  it('dinleyici iptali çalışır', () => {
    const istemci = createMockBildirim();
    const gelenler: string[] = [];
    const iptal = istemci.onMessage((b) => gelenler.push(b.baslik));
    iptal();

    istemci.bildirimSimuleEt({ baslik: 'Test', govde: 'İçerik' });
    expect(gelenler).toHaveLength(0);
  });
});
