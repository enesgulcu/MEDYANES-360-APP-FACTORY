/**
 * Fabrika servis modu: mock (geliştirme) veya canli (Firebase/RevenueCat bağlı).
 * EXPO_PUBLIC_SERVIS_MODU ortam değişkeni ile kontrol edilir; varsayılan mock.
 */
export type ServisModu = 'mock' | 'canli';

const GECERLI_MODLAR: readonly ServisModu[] = ['mock', 'canli'];

/** Ortam değişkeninden servis modunu okur; geçersiz değerde güvenli şekilde mock döner. */
export function servisModuOku(kaynak?: string): ServisModu {
  const ham = kaynak ?? process.env['EXPO_PUBLIC_SERVIS_MODU'] ?? 'mock';
  return GECERLI_MODLAR.includes(ham as ServisModu) ? (ham as ServisModu) : 'mock';
}

/** Canlı mod seçilmiş ama gerekli yapılandırma yoksa fırlatılır. */
export class ServisYapilandirmaHatasi extends Error {
  constructor(
    public readonly servis: string,
    talimat: string,
  ) {
    super(`[${servis}] Canlı mod için yapılandırma eksik: ${talimat}`);
    this.name = 'ServisYapilandirmaHatasi';
  }
}
