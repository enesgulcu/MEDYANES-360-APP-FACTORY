import { z } from 'zod';
import { err, ok, type Result } from '@medyanes360/cekirdek';

/**
 * Fabrika standardı kullanıcı modeli. Firebase Auth'un dev kullanıcı nesnesi
 * yerine bu sade model kullanılır; uygulamalar Firebase tipine bağımlı olmaz.
 */
export const KullaniciSemasi = z.object({
  /** Firebase UID (anonim girişte de üretilir). */
  uid: z.string().min(1),
  /** Anonim kullanıcı mı? Fabrika varsayılanı: önce anonim, gerekirse yükselt. */
  anonim: z.boolean(),
  /** E-posta, yalnızca kayıtlı kullanıcılarda. */
  email: z.string().email().nullable(),
});

export type Kullanici = z.infer<typeof KullaniciSemasi>;

/**
 * Kimlik istemcisi sözleşmesi. VARSAYILAN AKIŞ ANONİM GİRİŞTİR:
 * kullanıcı uygulamayı açar açmaz arka planda anonim hesap oluşur,
 * loglama/analitik bu kimliğe bağlanır. Kayıt zorunlu tutulmaz.
 */
export interface KimlikIstemcisi {
  /** Anonim oturum açar (yoksa oluşturur, varsa mevcut oturumu döner). */
  signInAnonymously(): Promise<Result<Kullanici>>;
  /** Mevcut kullanıcıyı döner; oturum yoksa null. */
  getCurrentUser(): Kullanici | null;
  /** Oturumu kapatır. */
  signOut(): Promise<Result<void>>;
  /**
   * Hesabı ve kullanıcı verilerini siler.
   * Apple zorunluluğu: bu akış uygulama içinden erişilebilir OLMAK ZORUNDA
   * (STORE-CHECKLIST.md §4). Veri silme loglama tarafıyla koordine edilir.
   */
  deleteAccount(): Promise<Result<void>>;
  /** Oturum değişikliklerini dinler; aboneliği iptal fonksiyonu döner. */
  onAuthStateChanged(dinleyici: (kullanici: Kullanici | null) => void): () => void;
}

/**
 * Bellek-içi mock istemci. Firebase Auth bağlanana kadar varsayılan budur;
 * gerçek istemci geldiğinde arayüz aynı kalacağı için uygulamalar değişmez.
 */
export function createMockKimlik(): KimlikIstemcisi {
  let mevcut: Kullanici | null = null;
  const dinleyiciler = new Set<(kullanici: Kullanici | null) => void>();

  function bildir() {
    for (const dinleyici of dinleyiciler) dinleyici(mevcut);
  }

  return {
    async signInAnonymously() {
      if (!mevcut) {
        // Gerçek Firebase UID formatını taklit eden rastgele kimlik.
        mevcut = {
          uid: `mock-anon-${Math.random().toString(36).slice(2, 10)}`,
          anonim: true,
          email: null,
        };
        bildir();
      }
      return ok(mevcut);
    },
    getCurrentUser() {
      return mevcut;
    },
    async signOut() {
      mevcut = null;
      bildir();
      return ok(undefined);
    },
    async deleteAccount() {
      if (!mevcut) return err(new Error('Silinecek oturum yok'));
      mevcut = null;
      bildir();
      return ok(undefined);
    },
    onAuthStateChanged(dinleyici) {
      dinleyiciler.add(dinleyici);
      // Firebase davranışıyla uyum: abone olunca mevcut durum hemen bildirilir.
      dinleyici(mevcut);
      return () => dinleyiciler.delete(dinleyici);
    },
  };
}
