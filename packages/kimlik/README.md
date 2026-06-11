# @medyanes360/kimlik

Firebase Auth sarmalayıcısı. Şu an **mock modda** (Firebase bağlanmadı).

## Ne işe yarar?

- **Anonim giriş varsayılandır**: kullanıcı uygulamayı açar açmaz arka planda
  anonim hesap oluşur; kayıt/şifre dayatılmaz. Loglama ve analitik bu anonim
  kimliğe bağlanır, böylece "şu kullanıcı ne yaşadı?" sorusu cevaplanabilir.
- `KimlikIstemcisi` arayüzü: `signInAnonymously`, `getCurrentUser`, `signOut`,
  `deleteAccount`, `onAuthStateChanged`.
- `deleteAccount` Apple'ın hesap silme zorunluluğunun teknik karşılığıdır.

## Nasıl kullanılır?

```ts
import { createMockKimlik } from '@medyanes360/kimlik';

const kimlik = createMockKimlik();

const sonuc = await kimlik.signInAnonymously();
if (sonuc.ok) {
  logger.setUserId(sonuc.value.uid); // loglama paketine kimliği bağla
}

// Oturum değişikliklerini dinle (ör. çıkışta login ekranına dön)
const iptal = kimlik.onAuthStateChanged((kullanici) => {
  // kullanici null ise oturum kapalı
});
```

## Firebase'e geçiş (yapılacak)

Firebase projesi açılınca `createFirebaseKimlik` eklenecek
(@react-native-firebase/auth). Arayüz aynı kalır, uygulama kodu değişmez.
