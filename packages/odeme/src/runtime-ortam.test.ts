import {
  __testOrtamAyarla,
  calismaOrtamiAl,
  nativeMagazaSdkKullanilabilirMi,
  revenueCatSdkKullanilabilirMi,
} from './runtime-ortam';

describe('runtime-ortam', () => {
  afterEach(() => {
    __testOrtamAyarla(undefined);
  });

  it('web ortamında native SDK kullanılamaz', () => {
    __testOrtamAyarla('web');
    expect(calismaOrtamiAl()).toBe('web');
    expect(nativeMagazaSdkKullanilabilirMi()).toBe(false);
    expect(revenueCatSdkKullanilabilirMi(true)).toBe(false);
  });

  it('Expo Go ortamında native SDK kullanılamaz', () => {
    __testOrtamAyarla('expo-go');
    expect(calismaOrtamiAl()).toBe('expo-go');
    expect(nativeMagazaSdkKullanilabilirMi()).toBe(false);
    expect(revenueCatSdkKullanilabilirMi(true)).toBe(false);
  });

  it('native ortamda RC anahtarı varsa SDK kullanılabilir', () => {
    __testOrtamAyarla('native');
    expect(nativeMagazaSdkKullanilabilirMi()).toBe(true);
    expect(revenueCatSdkKullanilabilirMi(true)).toBe(true);
    expect(revenueCatSdkKullanilabilirMi(false)).toBe(false);
  });
});
