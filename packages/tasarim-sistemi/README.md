# @medyanes360/tasarim-sistemi

Token tabanlı tema + UI bileşen kütüphanesi (NativeWind tabanlı).

## Durum

- ✅ Tema token sistemi (renk, tipografi, boşluk, köşe) — hazır ve testli.
- ✅ Görsel bileşenler (Button, Card, Input, Modal, Liste, Toast, Skeleton,
  EmptyState) — jest-expo + RNTL render testleri ile doğrulanıyor.

## Temel fikir

Bileşenler vücut, tema kıyafettir: yeni uygulama açarken bileşenlere
DOKUNULMAZ, yalnızca tema değiştirilir. Bileşen içinde sabit renk/boşluk
değeri yazmak yasaktır.

## Nasıl kullanılır?

```ts
import { createTheme } from '@medyanes360/tasarim-sistemi';

// Uygulamaya özel tema: yalnızca değişen alanlar yazılır,
// kalan her şey fabrika varsayılanından gelir.
export const tema = createTheme({
  renkler: {
    light: { birincil: '#7C3AED' }, // marka moru
    dark: { birincil: '#8B5CF6' },
  },
  tipografi: { aile: 'Inter' },
});
```

## Kurallar (TASARIM.md)

- **Karanlık mod baştan**: her temada `light` + `dark` paleti zorunlu;
  tip sistemi eksik bırakmaya izin vermez.
- Responsive: sabit piksel değil tema ölçekleri (`bosluk.md` gibi) kullanılır.
- `createTheme` varsayılan temayı değiştirmez — bir uygulamanın teması
  diğerini etkileyemez (testle garanti altında).
