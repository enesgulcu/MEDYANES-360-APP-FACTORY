# @medyanes360/analitik

Ortak olay şeması + analitik istemcisi. Hedef: Firebase Analytics.
Şu an **mock modda** (Firebase hesabı henüz bağlanmadı).

## Ne işe yarar?

- `ORTAK_OLAYLAR` — tüm uygulamalarda aynı isimle kullanılan olay sözlüğü:
  `app_open`, `screen_view`, `paywall_shown`, `purchase_started`,
  `purchase_completed`, `error`.
- `AnalitikIstemcisi` — uygulamaların gördüğü tek arayüz.
- `createMockAnalitik` — bellek-içi istemci (geliştirme + test).

## Nasıl kullanılır?

```ts
import { createMockAnalitik, type AnalitikIstemcisi } from '@medyanes360/analitik';

const analitik: AnalitikIstemcisi = createMockAnalitik({
  appId: 'com.medyanes360.ornekapp',
  appVersion: '1.0.0',
  platform: 'ios',
});

analitik.setUserId(anonimKullaniciId);
analitik.logEvent('paywall_shown', { ekran: 'onboarding' });
```

## Kurallar

- Olay adları snake_case; ortak olaylar İSİM DEĞİŞTİRMEDEN kullanılır.
- Parametrelere kişisel veri (isim, e-posta, telefon) GİRMEZ (KVKK).
- Yeni uygulamaya özel olaylar eklenebilir; ortak sözlüğe ekleme çekirdek
  değişikliğidir (pnpm verify + Seviye 2 onay).

## Firebase'e geçiş (yapılacak)

Firebase hesabı açılınca `createFirebaseAnalitik` eklenecek; uygulama kodu
değişmeyecek çünkü arayüz aynı kalacak.
