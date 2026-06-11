# @medyanes360/odeme

RevenueCat sarmalayıcısı + paywall durum yönetimi.
Şu an **mock modda** (RevenueCat hesabı henüz bağlanmadı).

## Ne işe yarar?

- `OdemeIstemcisi` — ürünleri getir, satın al, geri yükle, durum sorgula.
- `PaywallYoneticisi` — paywall'ın tüm durum akışı tek yerde:
  `kapali → gosteriliyor → satin-aliniyor → tamamlandi | hata`
- `createMockOdeme` — RevenueCat olmadan geliştirme/test.

## Nasıl kullanılır?

```ts
import { createMockOdeme, PaywallYoneticisi } from '@medyanes360/odeme';

const odeme = createMockOdeme();
const paywall = new PaywallYoneticisi(odeme);

paywall.subscribe((durum) => {
  // UI bu duruma göre çizilir (şablonda küçük bir Zustand store'una sarılır)
});

paywall.paywallGoster();
await paywall.satinAl('aylik_premium');
```

## Tasarım kararları

- **Ağ hatasında premium düşürülmez**: durum yenileme başarısız olursa son
  bilinen durum korunur — kullanıcının satın aldığı erişim ağ hatası yüzünden
  elinden alınmaz.
- "Geri yükle" (restore) butonu mağaza zorunluluğudur; paywall'da her zaman
  bulunur (STORE-CHECKLIST.md §5).

## RevenueCat'e geçiş

`createRevenueCatOdeme` hazır (`react-native-purchases` peer dependency).
API anahtarları `.env` + EAS secrets; entitlement identifier
`EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID`. RC Paywall: `gosterRevenueCatPaywall`,
Customer Center: `gosterMusteriMerkezi`.
