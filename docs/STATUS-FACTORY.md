# STATUS — FABRİKA GENELİ

> Fabrikanın genel durum dosyası. Fabrika çapındaki her oturumun sonunda güncellenir.

Son güncelleme: 2026-06-11 (Seviye 1 iyileştirmeler oturumu)

## Genel durum: FABRİKA AÇIK ✅

Fabrika iskeleti kuruldu, denetimden geçti ve ilk Seviye 1 iyileştirmeler tamamlandı.
Henüz hiçbir gerçek uygulama geliştirilmedi (bilinçli karar). Dış servisler mock modda.

### Ne kuruldu?

| Parça                             | Durum | Not                                                      |
| --------------------------------- | ----- | -------------------------------------------------------- |
| Doküman sistemi (docs/)           | ✅    | ANAYASA, KODLAMA, TASARIM, STORE-CHECKLIST, SURECLER     |
| Cursor kuralları (.cursor/rules/) | ✅    | Oturum + mimari kuralları, her oturumda otomatik         |
| Monorepo (pnpm workspaces)        | ✅    | Node 22 + pnpm 11, hoisted linker (Expo uyumu)           |
| İzolasyon denetimi (ESLint)       | ✅    | Otomatik; bilerek ihlal denendi — yakalandı              |
| Çekirdek değişiklik kapısı        | ✅    | Husky pre-commit → `pnpm verify` (grep sorunu giderildi) |
| 9 çekirdek paket                  | ✅    | 51 birim + render testi yeşil; servis paketleri mock     |
| Şablon uygulama (apps/\_sablon)   | ✅    | Karanlık mod ayarı dahil; Expo SDK 56                    |
| Arşiv klasörü (apps/\_arsiv)      | ✅    | Workspace ve verify kapsamı dışında                      |

### Doğrulama kanıtları (2026-06-11)

| Kontrol                         | Sonuç                                                 |
| ------------------------------- | ----------------------------------------------------- |
| `pnpm verify`                   | **Yeşil** — 51 test + 10 projenin TS derlemesi + lint |
| Şablon karanlık mod             | ✅ Ayarlarda Sistem / Açık / Koyu                     |
| Tasarım sistemi render testleri | ✅ jest-expo + RNTL (Button, Card, TemaSaglayici)     |
| Husky pre-commit                | ✅ grep yerine sh `[ -n ... ]` — Windows uyumlu       |

**Şablon ekran durumu:**

| Özellik                         | Durum |
| ------------------------------- | ----- |
| Onboarding (2 adım)             | ✅    |
| Paywall (mock)                  | ✅    |
| Ayarlar                         | ✅    |
| Dil değiştirme (TR↔EN)          | ✅    |
| Karanlık mod (Sistem/Açık/Koyu) | ✅    |

Telefonda görsel doğrulama: `cd apps/_sablon && npx pnpm start` → Expo Go ile QR okut.

## 9 çekirdek paket — tek satır durum

| Paket             | Iskelet | Test                           | Mock mod |
| ----------------- | ------- | ------------------------------ | -------- |
| `cekirdek`        | ✅      | ✅ 6 test                      | —        |
| `kimlik`          | ✅      | ✅ 5 test                      | ✅ Mock  |
| `odeme`           | ✅      | ✅ 5 test                      | ✅ Mock  |
| `analitik`        | ✅      | ✅ 3 test                      | ✅ Mock  |
| `loglama`         | ✅      | ✅ 4 test                      | ✅ Mock  |
| `bildirim`        | ✅      | ✅ 6 test                      | ✅ Mock  |
| `dil`             | ✅      | ✅ 6 test                      | —        |
| `uzak-ayar`       | ✅      | ✅ 4 test                      | ✅ Mock  |
| `tasarim-sistemi` | ✅      | ✅ 12 test (4 tema + 8 render) | —        |

## ANAYASA'ya göre henüz karşılanmayan / eksik kalanlar

| Anayasa maddesi                     | Durum             | Açıklama                                            |
| ----------------------------------- | ----------------- | --------------------------------------------------- |
| Firebase gerçek bağlantıları        | ⏳ Mock           | Hesap açılınca `createFirebase*` eklenecek          |
| Firebase Crashlytics                | ❌ Yok            | Paket henüz eklenmedi                               |
| RevenueCat gerçek bağlantı          | ⏳ Mock           | `createRevenueCatOdeme` yok                         |
| Jest + React Native Testing Library | ✅                | jest-expo + RNTL; temel bileşen render testleri var |
| EAS Build + Submit + Update         | ⏳ Yapılandırıldı | Hesaplar olmadan denenemedi                         |
| Firestore güvenlik kuralları        | ❌ Yok            | Firebase projesi gerekli                            |
| Gerçek uygulama yayını              | ❌ Yok            | Bilinçli                                            |
| React Hook Form                     | ⚠️ Bağımlılık var | Şablonda form ekranı yok                            |
| Moti animasyon                      | ⚠️ Bağımlılık var | Şablonda kullanılmıyor                              |
| Zustand kalıcılığı                  | ⏳ Ertelendi      | Uygulama bazında karar                              |
| NativeWind v5 preview               | ⚠️ Risk           | SDK 56 resmi yolu                                   |

## Mock modda olanlar (hesap bağlanınca gerçeğe geçecek)

- kimlik → Firebase Auth
- analitik → Firebase Analytics
- loglama → Firestore
- uzak-ayar → Remote Config
- bildirim → FCM (+ APNs)
- odeme → RevenueCat
- Crashlytics → Firebase (paket henüz yok)

## Bilinen eksikler / teknik notlar

- NativeWind v5 preview (Expo SDK 56 resmi yolu).
- Zustand kalıcılığı şablona bilinçli eklenmedi.
- EAS Build, Expo + mağaza hesapları olmadan denenemez.
- Jest monorepo genelinde **29.x** (jest-expo uyumu); kök `package.json`'da sabitlendi.
- Windows'ta `pnpm` global yoksa: `npx pnpm@11.5.3` kullan.

## SENDEN BEKLEYENLER (proje sahibi görevleri)

> Ekran ekran tarifler. Hiçbiri acil değil.

### 1. Firebase hesabı (ücretsiz başlar)

1. `console.firebase.google.com` → Google hesabınla giriş.
2. "Proje oluştur" — şimdilik hesabın hazır olması yeterli.
3. Google Analytics'i etkinleştir.
4. Bana "Firebase hazır" de.

💰 Ücretsiz (Spark). Blaze geçişi Seviye 3 karar.

### 2. RevenueCat hesabı (ücretsiz başlar)

1. `app.revenuecat.com` → kayıt ol.
2. Şirket adı: "MEDYANES 360".
3. Bana "RevenueCat hazır" de.

💰 2.500$/ay gelire kadar ücretsiz.

### 3. Expo hesabı (EAS Build — ücretsiz katman)

1. `expo.dev` → kayıt ol.
2. Bana "Expo hesabım hazır" de; `eas login` birlikte yapılır.

💰 Ücretsiz katman geliştirme için yeterli.

### 4. Apple Developer hesabı (yayın öncesi)

1. `developer.apple.com` → bireysel (Individual) kayıt.
2. **99$/yıl — ödemeden önce haber ver (Seviye 3).**

### 5. Google Play Developer hesabı (yayın öncesi)

1. `play.google.com/console` → kişisel hesap.
2. **25$ tek sefer — ödemeden önce haber ver (Seviye 3).**

## Aylık servis maliyetleri (mevcut)

| Servis | Maliyet | Not                |
| ------ | ------- | ------------------ |
| —      | 0$/ay   | Ücretli servis yok |

## Sıradaki adımlar

1. **Proje sahibi:** İlk uygulama fikrini anlat → SPEC.md çıkarırız.
2. **Proje sahibi:** Firebase + RevenueCat hesaplarını aç.
3. **Agent:** İlk uygulamayı şablondan aç (SURECLER.md §1).
4. **Agent:** Hesaplar hazır olunca mock → gerçek istemci geçişi.
5. Telefonda görsel tur: Expo Go ile şablonu dene.

## Oturum geçmişi

- **2026-06-11 — Seviye 1 iyileştirmeler.** Karanlık mod ayarı (Sistem/Açık/Koyu),
  jest-expo + RNTL render testleri, Husky grep düzeltmesi, Jest 29 hizalaması.
  `pnpm verify` yeşil (51 test).
- **2026-06-11 — Kuruluş Denetim Oturumu.** Bağımsız denetim; STATUS-FACTORY güncellendi.
- **2026-06-11 — Kuruluş oturumu.** Fabrika temeli sıfırdan kuruldu (6 commit).
