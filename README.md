# MEDYANES 360 APP FACTORY

Ortak bir çekirdek iskelet üzerine onlarca mobil uygulamanın hızla geliştirilip
App Store ve Google Play'e yayınlandığı uygulama fabrikası.

## Yapı

```
├── docs/                   # Fabrikanın hafızası (ANAYASA, KODLAMA, TASARIM, ...)
├── packages/               # Çekirdek paketler (tüm uygulamaların ortak temeli)
│   ├── cekirdek/           # Ortak tipler, yardımcılar, sabitler
│   ├── kimlik/             # Firebase Auth sarmalayıcı (anonim giriş varsayılan)
│   ├── odeme/              # RevenueCat sarmalayıcı + paywall durum yönetimi
│   ├── analitik/           # Ortak olay şeması + Firebase Analytics
│   ├── loglama/            # Kullanıcı bazlı log mekanizması
│   ├── bildirim/           # FCM push bildirim altyapısı
│   ├── dil/                # i18n altyapısı + ortak çeviri anahtarları
│   ├── uzak-ayar/          # Remote Config sarmalayıcı
│   └── tasarim-sistemi/    # UI bileşen kütüphanesi (NativeWind tabanlı)
├── apps/
│   ├── _sablon/            # Yeni uygulama açarken kopyalanacak şablon
│   └── _arsiv/             # Terk edilen uygulamalar
└── .cursor/rules/          # Cursor çalışma kuralları
```

## Teknoloji

TypeScript (strict) · React Native + Expo · expo-router · pnpm workspaces ·
NativeWind · Zustand · TanStack Query · React Hook Form + Zod · Firebase ·
RevenueCat · i18next · Reanimated + Moti · EAS Build/Submit/Update ·
Jest + RNTL · ESLint + Prettier + Husky

## Temel komutlar

```bash
pnpm install          # bağımlılıkları kur
pnpm verify           # çekirdek testleri + tüm uygulamaların TS derlemesi + lint
pnpm test             # tüm testler
pnpm lint             # lint
```

## Temel kurallar (özet)

- Uygulamalar birbirini göremez; çekirdek uygulamaları göremez (apps → packages, tek yön).
- `packages/` değişikliği `pnpm verify` yeşil olmadan kabul edilmez.
- Her oturum `docs/ANAYASA.md` + ilgili `STATUS.md` okunarak başlar,
  STATUS güncellenerek biter.

Detaylar: [docs/ANAYASA.md](docs/ANAYASA.md)
