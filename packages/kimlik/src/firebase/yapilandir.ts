import { Platform } from 'react-native';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, type Auth } from 'firebase/auth';
import * as FirebaseAuthModul from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/** Expo Go uyumlu Firebase Web SDK yapılandırması (platforma göre apiKey/appId). */
export interface FirebaseWebYapilandirma {
  projectId: string;
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
  android: { apiKey: string; appId: string };
  ios: { apiKey: string; appId: string };
}

export interface FirebaseOturum {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

let oturum: FirebaseOturum | null = null;

type AuthKaliciligi = NonNullable<NonNullable<Parameters<typeof initializeAuth>[1]>['persistence']>;

/** RN bundle'ında mevcut; firebase/auth tip dosyası export listesinde yok. */
function reactNativeAuthKaliciligiAl(): AuthKaliciligi {
  const modul = FirebaseAuthModul as typeof FirebaseAuthModul & {
    getReactNativePersistence?: (storage: ReturnType<typeof createAsyncStorage>) => AuthKaliciligi;
  };
  if (typeof modul.getReactNativePersistence !== 'function') {
    throw new Error('getReactNativePersistence yalnızca React Native ortamında kullanılabilir');
  }
  return modul.getReactNativePersistence(createAsyncStorage('firebase-auth'));
}

/** RN'de oturum kalıcılığı; web'de varsayılan getAuth yeterli. */
function authBaslat(app: FirebaseApp): Auth {
  if (Platform.OS === 'web') {
    return getAuth(app);
  }

  try {
    return initializeAuth(app, {
      persistence: reactNativeAuthKaliciligiAl(),
    });
  } catch (hata: unknown) {
    const kod =
      typeof hata === 'object' && hata !== null && 'code' in hata
        ? String((hata as { code: unknown }).code)
        : '';
    if (kod === 'auth/already-initialized') {
      return getAuth(app);
    }
    throw hata;
  }
}

/**
 * Firebase uygulamasını tek seferlik başlatır.
 * Expo Go için Web SDK kullanılır (@react-native-firebase yerine).
 */
export function firebaseBaslat(yapilandirma: FirebaseWebYapilandirma): FirebaseOturum {
  if (oturum !== null) return oturum;

  const platform = Platform.OS === 'ios' ? yapilandirma.ios : yapilandirma.android;

  const firebaseConfig = {
    apiKey: platform.apiKey,
    authDomain: yapilandirma.authDomain,
    projectId: yapilandirma.projectId,
    storageBucket: yapilandirma.storageBucket,
    messagingSenderId: yapilandirma.messagingSenderId,
    appId: platform.appId,
  };

  const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : (getApps()[0] as FirebaseApp);
  const auth = authBaslat(app);
  const db = getFirestore(app);
  oturum = { app, auth, db };
  return oturum;
}

/** Başlatılmış Firebase oturumunu döner; yoksa hata fırlatır. */
export function firebaseOturumuAl(): FirebaseOturum {
  if (oturum === null) {
    throw new Error('Firebase henüz başlatılmadı');
  }
  return oturum;
}
