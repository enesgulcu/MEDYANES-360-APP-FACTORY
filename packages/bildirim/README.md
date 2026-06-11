# @medyanes360/bildirim

FCM (Firebase Cloud Messaging) push bildirim altyapısı.
Şu an **mock modda** (Firebase bağlanmadı).

## Ne işe yarar?

- `BildirimIstemcisi` — izin iste, token al, gelen bildirimleri dinle.
- `BildirimSemasi` / `parseBildirim` — FCM payload'ı dış veridir; işlenmeden
  önce Zod'dan geçer. Bozuk/kötü niyetli payload uygulamayı çökertemez.
- `createMockBildirim` — `bildirimSimuleEt` ile test bildirimi göndererek
  uygulama davranışını Firebase olmadan deneme imkânı.

## Nasıl kullanılır?

```ts
import { createMockBildirim } from '@medyanes360/bildirim';

const bildirim = createMockBildirim();

// İzin: onboarding'de DEĞİL, kullanıcıya değer gösterdikten sonra iste
// (izin kabul oranını ciddi etkiler).
const izin = await bildirim.requestPermission();

const iptal = bildirim.onMessage((b) => {
  // Uygulama açıkken gelen bildirimi Toast olarak göster
});
```

## FCM'e geçiş (yapılacak)

Firebase projesi açılınca `createFcmBildirim` eklenecek
(@react-native-firebase/messaging). iOS push için ayrıca APNs anahtarı
gerekir (Apple Developer hesabı açıldığında). Arayüz değişmez.
