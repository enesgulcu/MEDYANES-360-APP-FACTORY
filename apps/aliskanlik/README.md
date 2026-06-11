# Şablon Uygulama (apps/\_sablon)

Yeni uygulama açarken kopyalanan başlangıç noktası. Tüm çekirdek paketler
bağlı ve **mock modda** çalışır durumdadır.

## İçinde ne var?

- Örnek onboarding akışı (2 adım) → uzak-ayar'dan yönetilen örnek paywall
- Ayarlar ekranı: dil seçimi, gizlilik politikası linki, hesap/veri silme
- Tasarım sistemi bileşenleri kullanımda (Button, Card, Liste, Modal, Toast...)
- i18n: TR/EN, cihaz dili otomatik, anında dil değişimi
- Zustand (uygulama durumu) + TanStack Query (sunucu verisi) kurulu
- NativeWind v5 yapılandırılmış (className kullanılabilir)
- `docs/` içinde boş SPEC / STATUS / KARARLAR şablonları

## Çalıştırma

```bash
pnpm install          # monorepo kökünde
cd apps/_sablon
pnpm start            # Expo dev sunucusu (Expo Go ile QR okutun)
```

## Yeni uygulamaya dönüştürme

Adım adım süreç: `docs/SURECLER.md` (monorepo kökünde) §1.
Özet: klasörü kopyala → `package.json` name + `app.json` (name, slug, scheme,
bundle ID `com.medyanes360.<uygulamaadi>`) → tema (`src/altyapi/tema.ts`) →
appId (`src/altyapi/appInfo.ts`) → Firebase/RevenueCat bağla → SPEC doldur.
