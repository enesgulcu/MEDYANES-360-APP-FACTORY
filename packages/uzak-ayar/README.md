# @medyanes360/uzak-ayar

Firebase Remote Config sarmalayıcısı. Şu an **mock modda**.

## Ne işe yarar?

Uygulama davranışını YENİDEN YAYIN YAPMADAN uzaktan değiştirme: paywall'ı
aç/kapat, kampanya değiştir, özellik aç/kapa (feature flag).

- `getValue(anahtar, şema, varsayılan)` — değer her zaman Zod şemasından
  geçer; geçmezse uygulama KIRILMAZ, güvenli varsayılana döner.
- `PaywallAyariSemasi` — şablondaki örnek uzaktan yönetilen paywall ayarı.

## Nasıl kullanılır?

```ts
import {
  createMockUzakAyar,
  PaywallAyariSemasi,
  VARSAYILAN_PAYWALL_AYARI,
} from '@medyanes360/uzak-ayar';

const uzakAyar = createMockUzakAyar();
await uzakAyar.refresh(); // açılışta güncel değerleri çek

const paywall = uzakAyar.getValue('paywall', PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI);
if (paywall.aktif) {
  // onboarding sonunda paywall göster
}
```

## Kurallar

- Remote Config değeri dış veridir: şemasız KULLANILAMAZ.
- Varsayılan değerler kodda tanımlıdır; sunucuya ulaşılamasa bile uygulama
  anlamlı davranır (uçak modunda ilk açılış senaryosu).

## Firebase'e geçiş (yapılacak)

Hesap açılınca `createFirebaseUzakAyar` eklenecek
(@react-native-firebase/remote-config). Arayüz değişmez.
