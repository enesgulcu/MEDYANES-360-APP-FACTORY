# @medyanes360/cekirdek

Fabrikanın en temel paketi: ortak tipler, yardımcılar ve sabitler.
Diğer tüm çekirdek paketler ve uygulamalar buna yaslanır.

## Ne işe yarar?

- `Result<T, E>` — hata fırlatmak yerine başarı/başarısızlığı tip olarak taşır.
- `parseWith` / `safeJsonParse` — dış veriyi Zod şemasıyla güvenli doğrulama.
- `Platform`, `AppInfo` — uygulama kimlik tipleri.
- `assertNever`, `sleep` — küçük ama her yerde lazım yardımcılar.

## Nasıl kullanılır?

```ts
import { parseWith, ok, err, type Result, type AppInfo } from '@medyanes360/cekirdek';
import { z } from 'zod';

// Dış veriyi doğrula (API yanıtı, Remote Config, kullanıcı girdisi...)
const KullaniciSemasi = z.object({ id: z.string(), yas: z.number().int() });

const sonuc = parseWith(KullaniciSemasi, apiYaniti);
if (sonuc.ok) {
  // sonuc.value artık tam tipli ve doğrulanmış
} else {
  // sonuc.error bir ZodError — loglanır, kullanıcıya anlamlı mesaj gösterilir
}
```

## Kurallar

- Bu pakete uygulamaya özel hiçbir şey GİREMEZ; yalnızca tüm uygulamaların
  ortak kullandığı tipler/yardımcılar burada yaşar.
- Değişiklikler çekirdek değişiklik kapısından geçer: `pnpm verify`.
