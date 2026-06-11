import type { AppInfo } from '@medyanes360/cekirdek';
import { parseWith } from '@medyanes360/cekirdek';
import { OlayAdiSemasi, OlayParametreleriSemasi, type OlayParametreleri } from './olaylar';

/**
 * Analitik istemcisinin sözleşmesi. Uygulamalar yalnızca bu arayüzü görür;
 * arkada Firebase mi mock mu çalıştığını bilmez. Böylece Firebase hesabı
 * hazır olmadan da tüm uygulama kodu yazılabilir ve test edilebilir.
 */
export interface AnalitikIstemcisi {
  /** Olay kaydeder. Geçersiz olay adı/parametre sessizce ATILMAZ; hata loglanır. */
  logEvent(olay: string, parametreler?: OlayParametreleri): void;
  /** Kullanıcı kimliğini (anonim ID dahil) analitik tarafına bağlar. */
  setUserId(userId: string): void;
}

/** Mock istemcinin kaydettiği olay yapısı (testlerde incelenir). */
export interface KaydedilenOlay {
  olay: string;
  parametreler: OlayParametreleri;
  userId: string | null;
  timestamp: number;
}

/**
 * Bellek-içi mock istemci. Firebase hesabı açılana kadar varsayılan budur;
 * ayrıca birim testlerinde gerçek istemci yerine kullanılır.
 */
export function createMockAnalitik(appInfo: AppInfo): AnalitikIstemcisi & {
  kayitlar: KaydedilenOlay[];
} {
  const kayitlar: KaydedilenOlay[] = [];
  let mevcutUserId: string | null = null;

  return {
    kayitlar,
    setUserId(userId: string) {
      mevcutUserId = userId;
    },
    logEvent(olay: string, parametreler: OlayParametreleri = {}) {
      // Dış girdi doğrulama: olay adı ve parametreler şemadan geçer (KODLAMA.md §3).
      const adSonucu = parseWith(OlayAdiSemasi, olay);
      const paramSonucu = parseWith(OlayParametreleriSemasi, parametreler);
      if (!adSonucu.ok || !paramSonucu.ok) {
        // Sessiz yutma yasak: geliştirme aşamasında konsola düşür.
        // Gerçek istemcide bu, loglama paketine "error" olayı olarak gider.
        console.warn(`[analitik] Geçersiz olay atıldı: ${olay} (app: ${appInfo.appId})`);
        return;
      }
      kayitlar.push({
        olay: adSonucu.value,
        parametreler: paramSonucu.value,
        userId: mevcutUserId,
        timestamp: Date.now(),
      });
    },
  };
}
