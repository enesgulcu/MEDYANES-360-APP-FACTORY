import { Platform } from 'react-native';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
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
  const auth = getAuth(app);
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
