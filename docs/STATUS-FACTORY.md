# STATUS — FABRİKA GENELİ

> Fabrikanın genel durum dosyası. Fabrika çapındaki her oturumun sonunda güncellenir.

Son güncelleme: 2026-06-16

## Fabrika resmi hesapları

| Servis                | Durum                               | Hesap                  |
| --------------------- | ----------------------------------- | ---------------------- |
| Firebase              | ✅ Proje kuruldu (`aliskanlik-001`) | `medyanestv@gmail.com` |
| RevenueCat            | ✅ Proje + SDK                      | `medyanestv@gmail.com` |
| Expo (EAS)            | ⏳ Henüz yok                        | —                      |
| Apple Developer       | ⏳ Yayın öncesi                     | —                      |
| Google Play Developer | ⏳ Yayın öncesi                     | —                      |

## Genel durum: FABRİKA GÜÇLENDİRME ✅ + PİLOT MVP AŞAMA 1 ✅

**Fabrika altyapısı** — CI, süreç dokümanları, servis modu, `pnpm new-app`, Maestro smoke, ErrorBoundary tamamlandı. `pnpm verify` yeşil.

**`apps/aliskanlik`** — Expo Go ile alışkanlık ekleme/işaretleme hazır; Firebase Auth + Firestore + Remote Config bağlı.

## Yeni eklenen fabrika yetenekleri (2026-06-16)

| Yetenek                         | Açıklama                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------ |
| GitHub Actions `Verify`         | Her push/PR'da `pnpm verify`                                                   |
| Dependabot                      | Haftalık bağımlılık güncelleme PR'ları                                         |
| `pnpm new-app <ad>`             | Şablondan yeni uygulama açma                                                   |
| Servis modu (`mock` \| `canli`) | Paket fabrikaları; canlı modda yapılandırma eksikse anlamlı hata               |
| Maestro smoke                   | `apps/_sablon` — onboarding → home akışı                                       |
| Süreç dokümanları               | `TANIM-BITTI`, `EKOSISTEM`, `AGENT-OTURUM-CHECKLIST`, `PROJE-SAHIBI-GOREVLERI` |
| Firebase şablonları             | `templates/firebase/` — deny-by-default Firestore kuralları                    |
| ErrorBoundary                   | Şablonda i18n destekli hata sınırı                                             |

## Mock → gerçek geçiş (pilot: aliskanlik)

| Aşama                   | Durum                       |
| ----------------------- | --------------------------- |
| A Firebase projesi      | ✅                          |
| B MVP iskelet           | ✅                          |
| C Auth + Firestore      | ✅                          |
| D Remote Config         | ✅ (Expo Go: varsayılanlar) |
| E Bildirim (FCM)        | ⏳                          |
| F RevenueCat gerçek IAP | ⏳ (EAS build gerekir)      |
| G Crashlytics           | ⏳                          |

## Doğrulama

| Kontrol                   | Sonuç                                                    |
| ------------------------- | -------------------------------------------------------- |
| Birim testleri (paketler) | 68 test — geçti                                          |
| TypeScript                | 11 proje — hatasız                                       |
| ESLint                    | Temiz                                                    |
| CI workflow               | `.github/workflows/verify.yml` — push sonrası kontrol et |

## Proje sahibinden bekleyenler

- [x] Firebase + RevenueCat hesapları ✅
- [x] Firestore Rules yayınlandı ✅
- [ ] **Expo hesabı** aç (`expo.dev`) — EAS preview build için
- [ ] Telefonda test: alışkanlık ekle + işaretle + paywall
- [ ] GitHub Actions sekmesinde Verify işinin yeşil olduğunu kontrol et

## Sıradaki agent işleri

1. Telefon test sonuçlarına göre kalan hatalar (varsa)
2. Expo/EAS bağlantısı (hesap açılınca)
3. Hatırlatma + FCM (bağlamsal bildirim izni)
4. Basit ilerleme grafiği (aliskanlik)
5. Crashlytics paketi iskeleti

## Oturum geçmişi

- **2026-06-16 — Fabrika güçlendirme:** CI/CD, servis modu, fabrika pattern, new-app script, Maestro, ErrorBoundary, süreç dokümanları, verify yeşil.
- **2026-06-11 — Expo Go stabilizasyon:** Ortam bazlı ödeme, RC/Remote Config/AsyncStorage düzeltmeleri.
- **2026-06-11 — MVP Aşama 1:** Firebase gerçek bağlantı, tema A, alışkanlık listesi/formu.
- **2026-06-11 — Kuruluş:** Monorepo, 9 paket, şablon, 6 commit.
