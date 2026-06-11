# STATUS — Alışkanlık (Pilot)

> Her çalışma oturumunun SONUNDA güncellenir. İstisnasız. (ANAYASA §5)

Son güncelleme: 2026-06-11

## Mevcut durum

**MVP Aşama 1 tamamlandı:** Expo Go ile alışkanlık ekleme + günlük işaretleme +
Firestore kaydı. Tema A (Sakin Yeşil) aktif. Firebase Auth (anonim) + Remote Config
(ücretsiz limit 3) gerçek bağlantıda.

## Mock → gerçek geçiş durumu

| Aşama                   | Durum                           |
| ----------------------- | ------------------------------- |
| A Firebase projesi      | ✅ Proje sahibi tamamladı       |
| B MVP iskelet           | ✅ Ana sayfa + ekle formu       |
| C Auth + Firestore      | ✅ Web SDK (Expo Go uyumlu)     |
| D Remote Config         | ✅ `ucretsiz_aliskanlik_limiti` |
| E Bildirim (FCM)        | ⏳ Sonraki sprint               |
| F RevenueCat gerçek IAP | ⏳ EAS build gerekir            |
| G Crashlytics           | ⏳ Production öncesi            |

## Son oturumda yapılanlar

- Firebase config dosyaları yerleştirildi; `createFirebaseKimlik` + Firestore alışkanlık deposu.
- Tema A (#059669), onboarding metinleri, ana sayfa + ekle ekranı.
- Firestore kuralları rehberi (`docs/FIRESTORE-KURALLARI.md`).

## Sıradaki adımlar

1. **Proje sahibi:** Firestore kurallarını yayınla (rehber — zorunlu).
2. Hatırlatma + bildirim (FCM, bağlamsal izin).
3. Basit ilerleme grafiği (victory-native).
4. EAS development build → gerçek RC satın alma testi.

## Proje sahibinden bekleyenler

- [ ] Firestore Rules yayınla → `docs/FIRESTORE-KURALLARI.md`
- [ ] Telefonda test: alışkanlık ekle + işaretle
- [ ] RC entitlement identifier doğrulama

## Aylık servis maliyetleri

| Servis              | Maliyet |
| ------------------- | ------- |
| Firebase Spark + RC | 0$      |
