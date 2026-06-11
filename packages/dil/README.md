# @medyanes360/dil

Çoklu dil (i18n) altyapısı + ortak çeviri anahtarları.

## Ne işe yarar?

- `ORTAK_CEVIRILER` — tüm uygulamaların paylaştığı çeviri metinleri
  (butonlar, hata mesajları, ayarlar/paywall metinleri), `tr` + `en`.
- `cihazDilindenSec` — cihaz dilini desteklenen dile güvenle çevirir.
- `tarihBicimle` / `sayiBicimle` / `paraBicimle` — yerele göre otomatik biçim.
- `rtlMi` — RTL diller için yapısal hazırlık.

## Kurallar (prompt §10)

- **Koda gömülü kullanıcı metni KESİNLİKLE yasak.** Tüm metinler çeviri
  dosyalarında; bileşenler `t('anahtar')` kullanır.
- Dil değişimi anında, yeniden başlatmasız tüm arayüze yansır
  (i18next `changeLanguage` bunu sağlar).
- Cihaz dili otomatik algılanır (expo-localization); kullanıcı ayarlardan
  değiştirebilir.

## Nasıl kullanılır? (uygulama tarafında)

i18next ve react-i18next bağlantısı ŞABLON uygulamada kurulur
(`apps/_sablon/src/i18n.ts`); bu paket çekirdek veri ve yardımcıları sağlar:

```ts
import { ORTAK_CEVIRILER, cihazDilindenSec } from '@medyanes360/dil';
import * as Localization from 'expo-localization';

const baslangicDili = cihazDilindenSec(Localization.getLocales()[0]?.languageTag ?? 'en');
// i18next.init({ resources: ORTAK_CEVIRILER, lng: baslangicDili, ... })
// Uygulama kendi çevirilerini ortakların üzerine ekler (deep merge).
```

## Yeni dil ekleme

Yeni dil çekirdek değişikliğidir (Seviye 2): `DESTEKLENEN_DILLER`e eklenir,
`ceviriler/<dil>.json` oluşturulur, anahtar eşitlik testi geçmelidir.
