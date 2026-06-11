import { createMockOdeme } from './client';
import { PaywallYoneticisi } from './paywall-durumu';

describe('PaywallYoneticisi', () => {
  it('başlangıçta kapalı ve premium değil', () => {
    const yonetici = new PaywallYoneticisi(createMockOdeme());
    expect(yonetici.getDurum()).toEqual({ evre: 'kapali', premium: false, hataMesaji: null });
  });

  it('başarılı satın alma premium yapar ve evreyi tamamlar', async () => {
    const yonetici = new PaywallYoneticisi(createMockOdeme());
    yonetici.paywallGoster();
    await yonetici.satinAl('aylik_premium');

    const durum = yonetici.getDurum();
    expect(durum.premium).toBe(true);
    expect(durum.evre).toBe('tamamlandi');
  });

  it('olmayan ürün satın alımı hata evresine geçer, mesaj taşır', async () => {
    const yonetici = new PaywallYoneticisi(createMockOdeme());
    await yonetici.satinAl('olmayan_urun');

    const durum = yonetici.getDurum();
    expect(durum.evre).toBe('hata');
    expect(durum.hataMesaji).toContain('olmayan_urun');
    expect(durum.premium).toBe(false);
  });

  it('geri yükleme, önceki satın almayı premium olarak tanır', async () => {
    const odeme = createMockOdeme();
    await odeme.purchase('aylik_premium'); // önceki cihazda satın alınmış gibi

    const yonetici = new PaywallYoneticisi(odeme);
    await yonetici.geriYukle();
    expect(yonetici.getDurum().premium).toBe(true);
  });

  it('durum değişiklikleri dinleyicilere bildirilir', async () => {
    const yonetici = new PaywallYoneticisi(createMockOdeme());
    const evreler: string[] = [];
    yonetici.subscribe((durum) => evreler.push(durum.evre));

    yonetici.paywallGoster();
    await yonetici.satinAl('aylik_premium');

    expect(evreler).toEqual(['gosteriliyor', 'satin-aliniyor', 'tamamlandi']);
  });
});
