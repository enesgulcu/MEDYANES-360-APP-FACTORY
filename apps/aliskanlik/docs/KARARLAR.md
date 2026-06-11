# KARARLAR — Alışkanlık

> Tarihli kararlar ve gerekçeleri. (ANAYASA §6)

---

### 2026-06-11 — Pilot uygulama olarak alışkanlık takipçisi (Seviye 2, onaylı)

- **Karar:** Fabrikanın ilk gerçek uygulaması `apps/aliskanlik` — basit alışkanlık
  takipçisi; TR birincil pazar.
- **Gerekçe:** Tüm çekirdek modülleri uçtan uca test etmek; mağazaya gönderilebilir
  gerçek bir MVP üretmek.
- **Alternatifler:** Not/finans uygulaması — daha geniş kapsam; pilot için erken.

### 2026-06-11 — Tema A Sakin Yeşil (Seviye 1, onaylı)

- **Karar:** Birincil renk `#059669`, açık zemin `#F0FDF4`.
- **Gerekçe:** Proje sahibi “A ile git” onayı; sakin, güven veren alışkanlık takip estetiği.

### 2026-06-11 — Expo Go için Firebase Web SDK (Seviye 1)

- **Karar:** `@react-native-firebase` yerine `firebase` Web SDK + AsyncStorage oturum kalıcılığı (kimlik paketi).
- **Gerekçe:** Expo Go native modül desteklemez; MVP telefon testi öncelikli. EAS build sonrası native SDK değerlendirilebilir (Seviye 2).

### 2026-06-11 — RevenueCat SDK entegrasyonu (Seviye 1)

- **Karar:** `packages/odeme` içinde `createRevenueCatOdeme` + RC Paywall / Customer Center
  sarmalayıcıları; pilot `apps/aliskanlik` gerçek test API anahtarıyla bağlandı.
- **Gerekçe:** Fabrika standardı — uygulama ekranları SDK görmez; mock → gerçek geçiş
  yalnızca `istemciler.ts` ve `.env` ile yapılır.
- **Ürünler:** `monthly`, `yearly` — entitlement `Alışkanlık Pro` (dashboard identifier ile eşleşmeli).
- **Not:** Gerçek satın alma için EAS development build gerekir; Expo Go Preview API Mode ile UI test edilir.

### 2026-06-11 — Ortam bazlı ödeme seçimi (Seviye 1)

- **Karar:** `createOdemeIstemcisi` + `calismaOrtamiAl()` (`packages/odeme`); web ve Expo Go'da mock, yalnızca native build'de RC SDK.
- **Gerekçe:** Web'de RC yapılandırılmıyordu → fiyatlar sonsuz yüklemede kalıyordu; Expo Go'da RC browser modu indexedDB hatası veriyordu.
- **Alternatifler:** Her uygulamada manuel `if (expoGo)` — tekrar eden, hata eğilimli; fabrika standardı tercih edildi.

### 2026-06-11 — Expo Go'da Remote Config fetch atlanır (Seviye 1)

- **Karar:** Firebase Web SDK `fetchAndActivate` yalnızca IndexedDB olan ortamlarda (web tarayıcı) çalışır; Expo Go / RN'de `defaultConfig` kullanılır.
- **Gerekçe:** Web SDK Remote Config, fetch önbelleği için indexedDB ister; React Native'de bu API yok → hata ve gereksiz uyarı.
- **Sonraki adım:** EAS build'de `@react-native-firebase/remote-config` ile gerçek sunucu çekimi (Seviye 2).

### 2026-06-11 — AsyncStorage v3 API (Seviye 1)

- **Karar:** Zustand persist ve Firebase Auth için `createAsyncStorage('...')` kullanılır; default export (legacy) kullanılmaz.
- **Gerekçe:** async-storage v3'te default export Expo Go'da `Native module is null` hatası verir.
