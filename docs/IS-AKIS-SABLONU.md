# İş Akışı Kaydı — Format Şablonu

> Agent her tamamlanan iş için ilgili `IS-AKIS.md` dosyasına **en alta** yeni kayıt ekler.
> Uygulama işi → `apps/<uygulama>/docs/IS-AKIS.md`
> Fabrika geneli iş → `docs/IS-AKIS-FACTORY.md`

---

## Ne zaman kayıt açılır?

| Durum                                            | Kayıt gerekir mi?                |
| ------------------------------------------------ | -------------------------------- |
| Proje sahibi yeni istek verdi, agent işi bitirdi | ✅ Evet                          |
| Küçük yazım düzeltmesi, tek satır                | ❌ Hayır (commit yeterli)        |
| Oturumda birden fazla istek                      | Her istek için **ayrı** kayıt    |
| Aynı istekte birkaç commit                       | Tek kayıt; son commit hash'i yaz |

---

## Kayıt şablonu (kopyala-yapıştır)

```markdown
## YYYY-AA-GG SS:DD — [Kısa başlık]

**İstek (proje sahibi):**

> [Kullanıcının söylediği — mümkünse kelimesi kelimesine]

**Önce → Sonra (sade):**

- **Önce:** …
- **Sonra:** …

**Teknik müdahale:**

- `dosya/yol` — ne değişti (kısa)
- `packages/...` — varsa

**Commit:** `abc1234` veya _henüz yok_
**Durum:** ✅ tamamlandı | ⏳ devam ediyor | ❌ iptal ([neden])
```

---

## Kurallar

1. **Tarih/saat:** İşin bittiği an (Türkiye saati, 24 saat: `2026-06-16 14:32`).
2. **İstek:** Proje sahibinin prompt'u; uzunsa öz ama anlamı korunsun.
3. **Önce → Sonra:** Teknik olmayan dil; proje sahibi okuyabilsin.
4. **Teknik müdahale:** Dosya yolları + tek cümle; tüm diff'i kopyalama.
5. **Commit:** Push sonrası hash yaz; iş bitmeden kayıt açıldıysa `_henüz yok_`.
6. **Sıra:** Eskiden yeniye — **en yeni kayıt dosyanın en altında.**

---

## Diğer dosyalarla ilişki

| Dosya         | Rol                                        |
| ------------- | ------------------------------------------ |
| `IS-AKIS.md`  | Kronolojik günlük (her istek)              |
| `STATUS.md`   | Güncel durum panosu (oturum sonu özet)     |
| `KARARLAR.md` | Mimari / yön kararları (Seviye 1+)         |
| Git commit    | Teknik kanıt; IS-AKIS'te hash ile bağlanır |

`STATUS` kısa kalır; detay `IS-AKIS`'te birikir.
