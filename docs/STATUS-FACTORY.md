# STATUS — FABRİKA GENELİ

> Fabrikanın genel durum dosyası. Fabrika çapındaki her oturumun sonunda güncellenir.

Son güncelleme: 2026-06-11

## Fabrika resmi hesapları

| Servis                | Durum                               | Hesap                  |
| --------------------- | ----------------------------------- | ---------------------- |
| Firebase              | ✅ Proje kuruldu (`aliskanlik-001`) | `medyanestv@gmail.com` |
| RevenueCat            | ✅ Proje + SDK                      | `medyanestv@gmail.com` |
| Expo (EAS)            | ⏳ Henüz yok                        | —                      |
| Apple Developer       | ⏳ Yayın öncesi                     | —                      |
| Google Play Developer | ⏳ Yayın öncesi                     | —                      |

## Genel durum: PİLOT MVP AŞAMA 1 ✅

**`apps/aliskanlik`** — Expo Go ile alışkanlık ekleme/işaretleme hazır.
Expo Go / web konsol hataları çekirdekte giderildi; telefon testi bekleniyor.

## Mock → gerçek geçiş (pilot)

| Aşama                   | Durum                       |
| ----------------------- | --------------------------- |
| A Firebase projesi      | ✅                          |
| B MVP iskelet           | ✅                          |
| C Auth + Firestore      | ✅                          |
| D Remote Config         | ✅ (Expo Go: varsayılanlar) |
| E Bildirim (FCM)        | ⏳                          |
| F RevenueCat gerçek IAP | ⏳ (EAS build gerekir)      |
| G Crashlytics           | ⏳                          |

## Proje sahibinden bekleyenler

- [x] **Firestore Rules** yayınlandı ✅
- [ ] Telefonda test: alışkanlık ekle + işaretle + paywall
- [ ] Expo hesabı (EAS build için, ileride)

## Sıradaki agent işleri

1. Telefon test sonuçlarına göre kalan hatalar (varsa)
2. Hatırlatma + FCM (bağlamsal bildirim izni)
3. Basit ilerleme grafiği
4. EAS development build

## Oturum geçmişi

- **2026-06-11 — Expo Go stabilizasyon:** Ortam bazlı ödeme, RC/Remote Config/AsyncStorage v3 düzeltmeleri, paywall mock.
- **2026-06-11 — MVP Aşama 1:** Firebase gerçek bağlantı, tema A, alışkanlık listesi/formu, RC SDK.
- **2026-06-11 — Pilot + Anayasa §8 + Seviye 1 iyileştirmeler.**
