# Görsel Vitrin — Proje Sahibi Rehberi

> Ekranları telefonda tek tek gezmek yerine **tek dosyadan** inceleyebilirsin.
> Terminal veya teknik bilgi gerekmez.

---

## Nerede?

Her uygulamanın vitrin dosyası:

```
apps/<uygulama-adı>/docs/onizleme/VITRIN.md
```

Örnek (pilot uygulama):

[apps/aliskanlik/docs/onizleme/VITRIN.md](../apps/aliskanlik/docs/onizleme/VITRIN.md)

GitHub'da repo içinde bu dosyayı aç — görseller doğrudan sayfada görünür.

---

## Nasıl kullanırsın?

1. Agent bir ekranı değiştirdiğinde vitrin otomatik yenilenir (sen bir şey yapmazsın).
2. `VITRIN.md` dosyasını aç.
3. Her bölümde bir ekran görüntüsü var: ana sayfa, ayarlar, paywall vb.
4. Beğenmediğin yeri chat'te yaz:
   - _"Paywall'da fiyatlar daha büyük olsun"_
   - _"Ana sayfa renklerini beğendim, devam"_
   - _"Ayarlar koyu temada yazılar okunmuyor"_
5. Agent düzeltir, vitrini tekrar günceller.

---

## Ne zaman bakmalısın?

| Durum                      | Bak            |
| -------------------------- | -------------- |
| Yeni özellik eklendi       | ✅             |
| Tasarım / renk değişti     | ✅             |
| Agent "bitti" dedi         | ✅             |
| Sadece arka plan teknik iş | ❌ (gerek yok) |

---

## Teknik not (bilgi)

- Görseller **web önizlemesinden** üretilir; telefona çok yakındır, piksel piksel aynı olmayabilir.
- Kritik kararlar için ara sıra gerçek telefon testi yine de önerilir.
- Görselleri üretmek agent'ın işidir (`pnpm onizleme` — sen çalıştırmazsın).

---

## Agent kuralı

Ekran görünümü değişen her işten sonra:

1. `pnpm onizleme <uygulama>` çalıştır
2. `VITRIN.md` + `gorseller/` commit'e ekle
3. IS-AKIS kaydına _"Görsel vitrin güncellendi"_ yaz
