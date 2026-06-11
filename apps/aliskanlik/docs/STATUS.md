# STATUS — Alışkanlık (Pilot)

> Her çalışma oturumunun SONUNDA güncellenir. İstisnasız. (ANAYASA §5)

Son güncelleme: 2026-06-11

## Mevcut durum

**MVP Aşama 1 tamamlandı.** Expo Go / web ile alışkanlık ekleme + işaretleme hazır.
Konsol hataları (RC, Remote Config, AsyncStorage) çekirdekte giderildi — telefon testi bekleniyor.

## Mock → gerçek geçiş durumu

| Aşama                   | Durum                                |
| ----------------------- | ------------------------------------ |
| A Firebase projesi      | ✅ Proje sahibi tamamladı            |
| B MVP iskelet           | ✅ Ana sayfa + ekle formu            |
| C Auth + Firestore      | ✅ Web SDK (Expo Go uyumlu)          |
| D Remote Config         | ✅ Varsayılanlar (Expo Go fetch yok) |
| E Bildirim (FCM)        | ⏳ Sonraki sprint                    |
| F RevenueCat gerçek IAP | ⏳ EAS build gerekir                 |
| G Crashlytics           | ⏳ Production öncesi                 |

## Son oturumda yapılanlar (2026-06-11)

### Çekirdek (`packages/`)

- **Ödeme:** `createOdemeIstemcisi` + `calismaOrtamiAl()` — web/Expo Go mock, native RC.
- **RC SDK:** lazy import; Expo Go'da indexedDB/flush hataları engellendi.
- **Remote Config:** `indexedDbKullanilabilirMi()` — Expo Go'da fetch atlanır, uyarı yok.
- **Kimlik:** Firebase Auth AsyncStorage kalıcılığı (`createAsyncStorage` v3).
- **Çekirdek:** `indexedDbKullanilabilirMi()` ortam yardımcısı + testler.

### Pilot uygulama (`apps/aliskanlik`)

- Paywall: web/Expo Go'da mock fiyatlar (₺49,99 / ₺399,99); hata durumunda "Tekrar dene".
- Zustand persist: `createAsyncStorage('aliskanlik-uygulama')` — legacy import hatası giderildi.
- `start:go` script Expo Go modu için mevcut.

## Sıradaki adımlar (devam oturumu)

1. **Proje sahibi:** Telefonda doğrulama — onboarding, alışkanlık ekle/işaretle, paywall fiyatları.
2. Hatırlatma + bildirim (FCM, bağlamsal izin).
3. Basit ilerleme grafiği (victory-native).
4. EAS development build → gerçek RC + native Remote Config.

## Proje sahibinden bekleyenler

- [x] Firestore Rules yayınlandı ✅
- [ ] Telefonda test: alışkanlık ekle + işaretle + paywall
- [ ] RC entitlement identifier doğrulama

## Aylık servis maliyetleri

| Servis              | Maliyet |
| ------------------- | ------- |
| Firebase Spark + RC | 0$      |
