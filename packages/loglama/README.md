# @medyanes360/loglama

Kullanıcı bazlı log mekanizması. Şu an **mock modda** (Firebase bağlanmadı).

## Ne işe yarar?

Tek `log()` çağrısı iki hedefe birden yazar:

1. **Analitik** (Firebase Analytics) — "kullanıcılar genelinde ne oluyor?"
2. **Kullanıcı bazlı log koleksiyonu** (Firestore) — "ŞU kullanıcı dün ne yaşadı?"

Olay şeması (her kayıtta zorunlu):

```
{ userId, appId, event, params, timestamp, appVersion, platform }
```

## Nasıl kullanılır?

```ts
import { createLogger, createMockFirestoreHedefi } from '@medyanes360/loglama';
import { createMockAnalitik } from '@medyanes360/analitik';

const analitik = createMockAnalitik(appInfo);
const logger = createLogger(appInfo, analitik, createMockFirestoreHedefi());

logger.setUserId(anonimKullaniciId); // kimlik paketinden gelir
logger.log('app_open');
logger.logError(hata, 'profil-yukleme'); // hata yutmak yasak; bunu çağır
```

## KVKK / GDPR kuralları

- **Kişisel veri loglanmaz**: isim, e-posta, telefon, açık metin içerik YASAK.
  Yalnızca anonim/teknik kimlikler ve olay parametreleri.
- **Saklama süresi**: kullanıcı bazlı loglar Firestore'da en fazla 90 gün
  tutulur; süresi dolanlar zamanlanmış işle silinir (Firebase bağlanınca
  TTL/scheduled function ile kurulacak).
- **Silme akışı**: kullanıcı hesap/veri silme talep ettiğinde (ayarlar
  ekranındaki akış) o `userId`ye ait TÜM log kayıtları silinir. Bu akış
  STORE-CHECKLIST.md'deki Apple zorunluluğunun parçasıdır.

## Firebase'e geçiş (yapılacak)

Hesap açılınca `createFirestoreHedefi` (gerçek) eklenecek; `Logger` arayüzü
değişmeyeceği için uygulama kodu olduğu gibi kalacak.
