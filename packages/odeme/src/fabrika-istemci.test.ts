import { __testOrtamAyarla } from './runtime-ortam';
import { createOdemeIstemcisi } from './fabrika-istemci';

const MOCK_URUNLER = [
  { id: 'monthly', fiyatMetni: '₺49,99', periyot: 'aylik' as const },
  { id: 'yearly', fiyatMetni: '₺399,99', periyot: 'yillik' as const },
];

describe('createOdemeIstemcisi', () => {
  afterEach(() => {
    __testOrtamAyarla(undefined);
  });

  it('web ortamında mock ürünleri döner', async () => {
    __testOrtamAyarla('web');
    const odeme = createOdemeIstemcisi({
      apiAnahtariTanimli: true,
      mockUrunler: MOCK_URUNLER,
      revenueCat: { entitlementId: 'Alışkanlık Pro' },
    });

    const sonuc = await odeme.getProducts();
    expect(sonuc.ok).toBe(true);
    if (sonuc.ok) {
      expect(sonuc.value).toEqual(MOCK_URUNLER);
    }
  });

  it('Expo Go ortamında mock ürünleri döner', async () => {
    __testOrtamAyarla('expo-go');
    const odeme = createOdemeIstemcisi({
      apiAnahtariTanimli: true,
      mockUrunler: MOCK_URUNLER,
      revenueCat: { entitlementId: 'Alışkanlık Pro' },
    });

    const sonuc = await odeme.getProducts();
    expect(sonuc.ok).toBe(true);
  });

  it('native ortamda yapılandırılmamış RC hata döner (mock değil)', async () => {
    __testOrtamAyarla('native');
    const odeme = createOdemeIstemcisi({
      apiAnahtariTanimli: true,
      mockUrunler: MOCK_URUNLER,
      revenueCat: { entitlementId: 'Alışkanlık Pro' },
    });

    const sonuc = await odeme.getProducts();
    expect(sonuc.ok).toBe(false);
    if (!sonuc.ok) {
      expect(sonuc.error.message).toContain('RevenueCat henüz yapılandırılmadı');
    }
  });
});
