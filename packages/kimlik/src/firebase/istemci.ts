import {
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  deleteUser,
  type Auth,
  type User,
} from 'firebase/auth';
import { err, ok } from '@medyanes360/cekirdek';
import type { KimlikIstemcisi, Kullanici } from '../client';
import { KullaniciSemasi } from '../client';

function kullaniciyaDonustur(user: User): Kullanici {
  return KullaniciSemasi.parse({
    uid: user.uid,
    anonim: user.isAnonymous,
    email: user.email,
  });
}

function firebaseHataMesaji(hata: unknown): Error {
  if (hata instanceof Error) return hata;
  return new Error(String(hata));
}

/** Firebase Auth sarmalayıcısı — fabrika KimlikIstemcisi sözleşmesi korunur. */
export function createFirebaseKimlik(auth: Auth): KimlikIstemcisi {
  return {
    async signInAnonymously() {
      try {
        if (auth.currentUser !== null) {
          return ok(kullaniciyaDonustur(auth.currentUser));
        }
        const sonuc = await firebaseSignInAnonymously(auth);
        return ok(kullaniciyaDonustur(sonuc.user));
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },

    getCurrentUser() {
      const user = auth.currentUser;
      return user === null ? null : kullaniciyaDonustur(user);
    },

    async signOut() {
      try {
        await firebaseSignOut(auth);
        return ok(undefined);
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },

    async deleteAccount() {
      const user = auth.currentUser;
      if (user === null) return err(new Error('Silinecek oturum yok'));
      try {
        await deleteUser(user);
        return ok(undefined);
      } catch (hata) {
        return err(firebaseHataMesaji(hata));
      }
    },

    onAuthStateChanged(dinleyici) {
      return firebaseOnAuthStateChanged(auth, (user) => {
        dinleyici(user === null ? null : kullaniciyaDonustur(user));
      });
    },
  };
}
