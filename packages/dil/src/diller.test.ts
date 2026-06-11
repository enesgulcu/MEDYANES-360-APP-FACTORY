import { cihazDilindenSec, ORTAK_CEVIRILER, rtlMi } from './diller';
import { paraBicimle, sayiBicimle } from './bicimleme';

describe('cihazDilindenSec', () => {
  it('Türkçe cihaz dili tr seçer', () => {
    expect(cihazDilindenSec('tr-TR')).toBe('tr');
  });

  it("desteklenmeyen dilde İngilizce'ye düşer", () => {
    expect(cihazDilindenSec('de-DE')).toBe('en');
  });
});

describe('rtlMi', () => {
  it('Arapça RTL olarak tanınır (yapısal hazırlık)', () => {
    expect(rtlMi('ar-SA')).toBe(true);
    expect(rtlMi('tr-TR')).toBe(false);
  });
});

describe('ORTAK_CEVIRILER', () => {
  it('tr ve en aynı anahtar yapısına sahip (eksik çeviri yok)', () => {
    // Anahtar listeleri düzleştirilip karşılaştırılır; bir dilde olup
    // diğerinde olmayan anahtar varsa bu test kırılır.
    const anahtarlar = (obj: object, onEk = ''): string[] =>
      Object.entries(obj).flatMap(([anahtar, deger]) =>
        typeof deger === 'object' && deger !== null
          ? anahtarlar(deger, `${onEk}${anahtar}.`)
          : [`${onEk}${anahtar}`],
      );

    expect(anahtarlar(ORTAK_CEVIRILER.tr).sort()).toEqual(anahtarlar(ORTAK_CEVIRILER.en).sort());
  });
});

describe('biçimleme', () => {
  it('sayı yerele göre biçimlenir', () => {
    expect(sayiBicimle(1234.5, 'en')).toBe('1,234.5');
  });

  it('para birimi yerele göre biçimlenir', () => {
    // Tam biçim ortama göre değişebilir; sembol ve tutarın varlığını sınarız.
    const sonuc = paraBicimle(49.99, 'USD', 'en');
    expect(sonuc).toContain('49.99');
    expect(sonuc).toContain('$');
  });
});
