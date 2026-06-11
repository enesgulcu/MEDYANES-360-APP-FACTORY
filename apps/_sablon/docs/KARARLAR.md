# KARARLAR — Şablon Uygulama

> Tarihli kararlar ve gerekçeleri. (ANAYASA §6)

---

### 2026-06-11 — Ayarlardan karanlık mod seçimi (Seviye 1)

- **Karar:** Zustand store'da `temaModu` (`sistem` | `light` | `dark`) tutulur; ayarlar
  ekranında üç butonla değiştirilir; `_layout.tsx` bunu `TemaSaglayici`'ya iletir.
- **Gerekçe:** Kuruluş denetiminde "elle kontrol edilebilir karanlık mod" eksikti;
  altyapı hazırdı, yalnızca UI bağlantısı gerekiyordu.
- **Alternatifler:** AsyncStorage ile kalıcılık — bilinçli ertelendi (uygulama bazında karar).

### 2026-06-11 — Jest 29 + jest-expo hizalaması (Seviye 1)

- **Karar:** Monorepo kök Jest sürümü 30 → 29'a indirildi; `tasarim-sistemi` bileşen
  testleri jest-expo preset ile koşuyor.
- **Gerekçe:** jest-expo SDK 56, Jest 29 bekliyor; hoisted monorepoda Jest 30 ile sürüm
  çakışması tüm paket testlerini kırıyordu.
- **Alternatifler:** Paket bazında izole Jest 30/29 — bakım maliyeti yüksek, elendi.
