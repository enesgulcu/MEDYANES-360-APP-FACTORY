/**
 * Fabrikanın tamamında paylaşılan temel tipler.
 * Diğer tüm paketler bu tiplere yaslanır; burada yapılan değişiklik
 * "çekirdek değişiklik kapısı"ndan (pnpm verify) geçmek zorundadır.
 */

/** Desteklenen mobil platformlar. */
export type Platform = 'ios' | 'android';

/**
 * Uygulamanın çalıştığı ortam — SDK seçimi buna göre yapılır.
 * web / expo-go: mağaza SDK'sı yok → mock veya yedek UI.
 * native: EAS build veya dev client → gerçek IAP SDK'sı.
 */
export type CalismaOrtami = 'web' | 'expo-go' | 'native';

/**
 * Her uygulamanın kimlik bilgisi. Loglama ve analitik olayları
 * hangi uygulamadan geldiğini bu bilgiyle ayırt eder.
 */
export interface AppInfo {
  /** Uygulamanın benzersiz kimliği, ör. "com.medyanes360.ornekapp" */
  appId: string;
  /** Semantik sürüm, ör. "1.2.0" */
  appVersion: string;
  platform: Platform;
}

/**
 * Hata fırlatmak yerine başarı/başarısızlığı TİP olarak taşıyan sonuç yapısı.
 * Neden: hata fırlatma TypeScript'te tip güvenliği sağlamaz; Result ile
 * çağıran taraf hatayı ele almayı UNUTAMAZ (derleyici zorlar).
 */
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

/** Başarılı sonuç üretir. */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

/** Başarısız sonuç üretir. */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}
