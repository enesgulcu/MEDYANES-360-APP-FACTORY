import type { AppInfo } from '@medyanes360/cekirdek';
import { parseWith } from '@medyanes360/cekirdek';
import type { AnalitikIstemcisi, OlayParametreleri } from '@medyanes360/analitik';
import { LogOlayiSemasi, type LogOlayi } from './sema';

/**
 * Log hedefi sözleşmesi. İki standart hedef vardır (ANAYASA §8):
 * 1. Firebase Analytics (toplu analiz) — analitik paketi üzerinden,
 * 2. Firestore kullanıcı bazlı log koleksiyonu (tekil sorun takibi).
 * Firestore hedefi şimdilik mock'tur; hesap açılınca gerçeği eklenecek.
 */
export interface LogHedefi {
  kaydet(olay: LogOlayi): void;
}

/** Bellek-içi Firestore taklidi: kayıtları kullanıcıya göre gruplar. */
export function createMockFirestoreHedefi(): LogHedefi & {
  kullaniciKayitlari: Map<string, LogOlayi[]>;
} {
  const kullaniciKayitlari = new Map<string, LogOlayi[]>();
  return {
    kullaniciKayitlari,
    kaydet(olay: LogOlayi) {
      const mevcut = kullaniciKayitlari.get(olay.userId) ?? [];
      mevcut.push(olay);
      kullaniciKayitlari.set(olay.userId, mevcut);
    },
  };
}

export interface Logger {
  /** Standart olay loglar; şemadan geçmeyen kayıt reddedilir ve konsola düşer. */
  log(event: string, params?: OlayParametreleri): void;
  /** Hata loglar: "error" olayı + hata mesajı parametresi. Sessiz yutma yasak! */
  logError(hata: unknown, baglam?: string): void;
  /** Oturumdaki kullanıcı kimliğini bağlar (anonim ID dahil). */
  setUserId(userId: string): void;
}

/**
 * Fabrika standardı logger: tek çağrıyla HEM analitik HEM kullanıcı bazlı
 * log hedefine yazar. Uygulamalar console.log yerine bunu kullanır.
 */
export function createLogger(
  appInfo: AppInfo,
  analitik: AnalitikIstemcisi,
  kullaniciLogHedefi: LogHedefi,
): Logger {
  // Kullanıcı henüz kimliklenmeden atılan loglar kaybolmasın diye
  // geçici "bilinmeyen" kimliği kullanılır; kimlik gelince güncellenir.
  let userId = 'henuz-kimliksiz';

  return {
    setUserId(yeniUserId: string) {
      userId = yeniUserId;
      analitik.setUserId(yeniUserId);
    },
    log(event: string, params: OlayParametreleri = {}) {
      const aday = {
        userId,
        appId: appInfo.appId,
        event,
        params,
        timestamp: Date.now(),
        appVersion: appInfo.appVersion,
        platform: appInfo.platform,
      };
      const sonuc = parseWith(LogOlayiSemasi, aday);
      if (!sonuc.ok) {
        // Sessiz yutma yasak: bozuk log kaydı görünür olmalı.
        console.warn(`[loglama] Şemadan geçmeyen log: ${event}`, sonuc.error.message);
        return;
      }
      analitik.logEvent(sonuc.value.event, sonuc.value.params);
      kullaniciLogHedefi.kaydet(sonuc.value);
    },
    logError(hata: unknown, baglam = 'bilinmiyor') {
      const mesaj = hata instanceof Error ? hata.message : String(hata);
      // Kişisel veri sızmasın diye yalnızca mesaj ve bağlam loglanır (KVKK).
      this.log('error', { mesaj, baglam });
    },
  };
}
