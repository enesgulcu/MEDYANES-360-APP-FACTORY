/**
 * Firebase Web SDK yapılandırması — google-services.json / plist ile eşleşir.
 * Expo Go uyumluluğu için Web SDK kullanılır (native modül gerekmez).
 */
export const FIREBASE_WEB_YAPILANDIRMA = {
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? 'aliskanlik-001',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'aliskanlik-001.firebaseapp.com',
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'aliskanlik-001.firebasestorage.app',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '987401863284',
  android: {
    apiKey:
      process.env.EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY ?? 'AIzaSyAGFdTmN5x9RbNmI4DiXzCGVBBA9bWlwqM',
    appId:
      process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID ??
      '1:987401863284:android:0e1979b2b98bc004475121',
  },
  ios: {
    apiKey:
      process.env.EXPO_PUBLIC_FIREBASE_IOS_API_KEY ?? 'AIzaSyCLT9PkbFxr0e7lSyGxx9Hv3m78nJ2l6Nk',
    appId:
      process.env.EXPO_PUBLIC_FIREBASE_IOS_APP_ID ?? '1:987401863284:ios:ba57ddb1a47bcc51475121',
  },
} as const;

export const FIREBASE_AKTIF = FIREBASE_WEB_YAPILANDIRMA.projectId.length > 0;
