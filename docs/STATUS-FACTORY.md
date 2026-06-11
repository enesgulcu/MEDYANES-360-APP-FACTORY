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

**`apps/aliskanlik`** — Expo Go ile alışkanlık ekleme/işaretleme çalışır durumda.
Firebase Auth + Firestore + Remote Config gerçek bağlantıda (Web SDK, Expo Go uyumlu).

## Mock → gerçek geçiş (pilot)

| Aşama                   | Durum                             |
| ----------------------- | --------------------------------- |
| A Firebase projesi      | ✅                                |
| B MVP iskelet           | ✅                                |
| C Auth + Firestore      | ✅                                |
| D Remote Config         | ✅                                |
| E Bildirim (FCM)        | ⏳                                |
| F RevenueCat gerçek IAP | ⏳ (SDK hazır, EAS build gerekir) |
| G Crashlytics           | ⏳                                |

## Proje sahibinden bekleyenler

- [ ] **Firestore Rules** yayınla → `apps/aliskanlik/docs/FIRESTORE-KURALLARI.md`
- [ ] Telefonda test: alışkanlık ekle + işaretle
- [ ] Expo hesabı (EAS build için, ileride)

## Sıradaki agent işleri

1. Hatırlatma + FCM (bağlamsal bildirim izni)
2. Basit ilerleme grafiği
3. EAS development build

## Oturum geçmişi

- **2026-06-11 — MVP Aşama 1:** Firebase gerçek bağlantı, tema A, alışkanlık listesi/formu, RC + RC SDK.
- **2026-06-11 — Pilot + Anayasa §8 + Seviye 1 iyileştirmeler.**
