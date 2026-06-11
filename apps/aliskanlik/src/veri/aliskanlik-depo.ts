import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  type Firestore,
} from 'firebase/firestore';
import { err, ok, parseWith, type Result } from '@medyanes360/cekirdek';
import {
  AliskanlikSemasi,
  bugununTarihi,
  type Aliskanlik,
  type AliskanlikForm,
} from '../domain/aliskanlik';

function firebaseHataMesaji(hata: unknown): Error {
  if (hata instanceof Error) return hata;
  return new Error(String(hata));
}

function belgeyiModeleDonustur(id: string, veri: unknown): Aliskanlik | null {
  const sonuc = parseWith(AliskanlikSemasi, { ...(veri as object), id });
  return sonuc.ok ? sonuc.value : null;
}

/** Firestore alışkanlık deposu — kullanıcı alt koleksiyonu. */
export function createAliskanlikDeposu(db: Firestore) {
  function habitsRef(kullaniciId: string) {
    return collection(db, 'users', kullaniciId, 'habits');
  }

  return {
    async listele(kullaniciId: string): Promise<Result<Aliskanlik[]>> {
      try {
        const snapshot = await getDocs(habitsRef(kullaniciId));
        const liste: Aliskanlik[] = [];
        for (const belge of snapshot.docs) {
          const model = belgeyiModeleDonustur(belge.id, belge.data());
          if (model !== null) liste.push(model);
        }
        liste.sort((a, b) => b.olusturulmaMs - a.olusturulmaMs);
        return ok(liste);
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },

    async ekle(kullaniciId: string, form: AliskanlikForm): Promise<Result<Aliskanlik>> {
      try {
        const yeniRef = doc(habitsRef(kullaniciId));
        const kayit: Aliskanlik = {
          id: yeniRef.id,
          ad: form.ad,
          renk: form.renk,
          tamamlananGunler: [],
          olusturulmaMs: Date.now(),
        };
        await setDoc(yeniRef, {
          ad: kayit.ad,
          renk: kayit.renk,
          tamamlananGunler: kayit.tamamlananGunler,
          olusturulmaMs: kayit.olusturulmaMs,
        });
        return ok(kayit);
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },

    async bugunToggle(kullaniciId: string, aliskanlik: Aliskanlik): Promise<Result<Aliskanlik>> {
      const bugun = bugununTarihi();
      const tamamlandi = aliskanlik.tamamlananGunler.includes(bugun);
      const yeniGunler = tamamlandi
        ? aliskanlik.tamamlananGunler.filter((g) => g !== bugun)
        : [...aliskanlik.tamamlananGunler, bugun];

      try {
        await updateDoc(doc(db, 'users', kullaniciId, 'habits', aliskanlik.id), {
          tamamlananGunler: yeniGunler,
        });
        return ok({ ...aliskanlik, tamamlananGunler: yeniGunler });
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },

    async sil(kullaniciId: string, aliskanlikId: string): Promise<Result<void>> {
      try {
        await deleteDoc(doc(db, 'users', kullaniciId, 'habits', aliskanlikId));
        return ok(undefined);
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },

    async tumunuSil(kullaniciId: string): Promise<Result<void>> {
      try {
        const snapshot = await getDocs(habitsRef(kullaniciId));
        await Promise.all(snapshot.docs.map((belge) => deleteDoc(belge.ref)));
        return ok(undefined);
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },
  };
}

export type AliskanlikDeposu = ReturnType<typeof createAliskanlikDeposu>;
