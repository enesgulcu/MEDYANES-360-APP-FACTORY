import { z } from 'zod';
import { ok, parseWith, type Result } from '@medyanes360/cekirdek';

/**
 * Push bildirim içeriği şeması. FCM'den gelen payload dış veridir;
 * KODLAMA.md §3 gereği işlenmeden önce bu şemadan geçmek ZORUNDADIR
 * (kötü niyetli/bozuk payload uygulamayı çökertmemeli).
 */
export const BildirimSemasi = z.object({
  baslik: z.string().min(1),
  govde: z.string().min(1),
  /** Bildirime tıklanınca açılacak ekran (expo-router yolu), opsiyonel. */
  hedefEkran: z.string().nullable().default(null),
  /** Uygulamaya özel ek veri. */
  veri: z.record(z.string(), z.string()).default({}),
});

export type Bildirim = z.infer<typeof BildirimSemasi>;

export type IzinDurumu = 'verilmedi' | 'verildi' | 'reddedildi';

/** Push bildirim istemcisi sözleşmesi — arkada FCM ya da mock çalışır. */
export interface BildirimIstemcisi {
  /** Bildirim izni ister (iOS'ta sistem diyaloğu açar). */
  requestPermission(): Promise<Result<IzinDurumu>>;
  /** Cihazın push token'ını döner (sunucu tarafına kayıt için). */
  getToken(): Promise<Result<string>>;
  /** Uygulama AÇIKKEN gelen bildirimleri dinler; iptal fonksiyonu döner. */
  onMessage(dinleyici: (bildirim: Bildirim) => void): () => void;
}

/**
 * Ham (dış) payload'ı güvenli şekilde Bildirim'e çevirir.
 * Gerçek FCM istemcisi de mock da bu ortak doğrulamayı kullanır.
 */
export function parseBildirim(raw: unknown): Result<Bildirim, Error> {
  const sonuc = parseWith(BildirimSemasi, raw);
  return sonuc.ok ? sonuc : { ok: false, error: new Error(sonuc.error.message) };
}

/** Bellek-içi mock istemci; `bildirimSimuleEt` ile test bildirimi gönderilir. */
export function createMockBildirim(): BildirimIstemcisi & {
  bildirimSimuleEt(raw: unknown): Result<Bildirim, Error>;
} {
  const dinleyiciler = new Set<(bildirim: Bildirim) => void>();
  let izin: IzinDurumu = 'verilmedi';

  return {
    async requestPermission() {
      izin = 'verildi'; // mock her zaman izin verir
      return ok(izin);
    },
    async getToken() {
      return ok(`mock-fcm-token-${Math.random().toString(36).slice(2, 10)}`);
    },
    onMessage(dinleyici) {
      dinleyiciler.add(dinleyici);
      return () => dinleyiciler.delete(dinleyici);
    },
    bildirimSimuleEt(raw: unknown) {
      const sonuc = parseBildirim(raw);
      if (sonuc.ok) {
        for (const dinleyici of dinleyiciler) dinleyici(sonuc.value);
      }
      return sonuc;
    },
  };
}
