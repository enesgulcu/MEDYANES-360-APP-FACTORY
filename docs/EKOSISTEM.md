# Fabrika Ekosistemi — Nasıl İşler?

> Proje sahibi fikir verir ve yorum yapar; agent teknik işi yürütür.
> Bu doküman o döngünün haritasıdır.

---

## Roller

| Kim                | Ne yapar                                                           |
| ------------------ | ------------------------------------------------------------------ |
| **Proje sahibi**   | Fikir, onay, red, estetik yorum, hesap açma, para onayı            |
| **Agent**          | Kod, test, doküman, verify, push, teknik karar (Seviye 1)          |
| **GitHub Actions** | Her push'ta otomatik `pnpm verify` — agent hata yapsa bile yakalar |
| **Dokümanlar**     | Oturumlar arası kalıcı hafıza (STATUS, SPEC, KARARLAR)             |

## Fikirden uygulamaya akış

```
1. Proje sahibi fikir anlatır
      ↓
2. Agent OZELLIK-ISTEGI-SABLONU veya SPEC taslağı çıkarır → onay
      ↓
3. Tasarım brifi (TASARIM.md) → tema önerisi → onay
      ↓
4. pnpm new-app <ad>  (şablon kopyalanır, kimlikler güncellenir)
      ↓
5. Geliştirme (SPEC'teki kabul kriterlerine göre)
      ↓
6. pnpm verify + (isteğe bağlı) Maestro smoke E2E
      ↓
7. EAS preview build → proje sahibi telefonda dener, yorum yapar
      ↓
8. Düzeltme döngüsü
      ↓
9. Mağaza gönderimi (Seviye 3, STORE-CHECKLIST)
```

## Servis modları

| Mod     | Ne zaman                    | Açıklama                                   |
| ------- | --------------------------- | ------------------------------------------ |
| `mock`  | Varsayılan                  | Firebase/RevenueCat yok; taklit istemciler |
| `canli` | Hesaplar bağlandıktan sonra | `EXPO_PUBLIC_SERVIS_MODU=canli`            |

Mock → canlı geçişte **ekran kodu değişmez**; yalnızca `istemciler.ts` ve env güncellenir.

## Güvenlik katmanları (hata önleme)

1. TypeScript strict + Zod
2. ESLint izolasyon kuralları
3. Husky pre-commit (lint-staged + çekirdek verify)
4. GitHub Actions CI (uzak verify)
5. Birim testleri (çekirdek paketler)
6. Maestro smoke E2E (şablon uygulama)
7. STATUS + KARARLAR disiplini

## Yeni uygulama açma (tek komut)

```bash
pnpm new-app ornek-uygulama
```

Detay: `docs/SURECLER.md` §1 ve `scripts/yeni-uygulama.mjs`.
