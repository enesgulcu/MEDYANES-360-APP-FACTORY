import type { CalismaOrtami } from '@medyanes360/cekirdek';

/** Birim testlerinde ortamı sabitlemek için (yalnızca test dosyaları kullanır). */
let testOrtami: CalismaOrtami | undefined;

export function __testOrtamAyarla(ortam: CalismaOrtami | undefined): void {
  testOrtami = ortam;
}

function platformOs(): string | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Platform } = require('react-native') as { Platform: { OS: string } };
    return Platform.OS;
  } catch {
    return null;
  }
}

function expoConstantsOku(): {
  appOwnership?: string | null;
  executionEnvironment?: string;
  expoVersion?: string | null;
} | null {
  try {
    // expo-constants uygulama katmanında gelir; paket yoksa null döner.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('expo-constants').default as {
      appOwnership?: string | null;
      executionEnvironment?: string;
      expoVersion?: string | null;
    };
  } catch {
    return null;
  }
}

/**
 * Uygulamanın hangi kabukta çalıştığını döner.
 * Expo Go ile dev client ayrımı expoVersion ile yapılır (StoreClient tek başına yetmez).
 */
export function calismaOrtamiAl(): CalismaOrtami {
  if (testOrtami !== undefined) return testOrtami;

  const os = platformOs();
  if (os === 'web') return 'web';

  const sabitler = expoConstantsOku();
  if (sabitler === null) return 'native';

  if (sabitler.appOwnership === 'expo') return 'expo-go';
  if (sabitler.executionEnvironment === 'storeClient' && sabitler.expoVersion != null) {
    return 'expo-go';
  }

  return 'native';
}

/** App Store / Play mağaza SDK'sı (RevenueCat native) kullanılabilir mi? */
export function nativeMagazaSdkKullanilabilirMi(): boolean {
  return calismaOrtamiAl() === 'native';
}

/** RC API anahtarı tanımlı VE ortam native ise gerçek SDK devreye girer. */
export function revenueCatSdkKullanilabilirMi(apiAnahtariTanimli: boolean): boolean {
  return apiAnahtariTanimli && nativeMagazaSdkKullanilabilirMi();
}
