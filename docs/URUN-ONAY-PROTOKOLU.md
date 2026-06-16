# Ürün Onay Protokolü — Yanlış Anlaşılmayı Önleme

> Proje sahibi dağınık konuşsa bile ürünün **tek doğru kaynağı** `SPEC.md` kalır.
> Agent kodlamadan önce anladığını doğrular; çelişki görürse sorar.

---

## Üç katman (ne nereye yazılır?)

| Katman                 | Dosya                          | Rol                                                          |
| ---------------------- | ------------------------------ | ------------------------------------------------------------ |
| **Canlı ürün belleği** | `apps/<uygulama>/docs/SPEC.md` | Kesinleşenler, bekleyen sorular, ertelenenler — güncel doğru |
| **İş günlüğü**         | `IS-AKIS.md`                   | Her isteğin tarihçesi (ne zaman, ne istendi)                 |
| **Kararlar**           | `KARARLAR.md`                  | Mimari / yön kararları ve gerekçe                            |

Konuşmadan gelen yeni bilgi önce **SPEC**'e işlenir; IS-AKIS'e iş bitince kayıt düşülür.

---

## Agent akışı (her önemli istek)

```
1. Proje sahibi bilgi / istek verir
2. Agent SPEC + KARARLAR + IS-AKIS (son kayıtlar) okur
3. Çelişki var mı? → Varsa sor, netleştir
4. SPEC güncelle (Kesinleşenler / Bekleyen / Ertelenen)
5. "Anladım" özeti sun → onay bekle (Seviye 2+ veya belirsiz istek)
6. Onay sonrası kodla
7. IS-AKIS + VITRIN (gerekirse) + STATUS + commit
```

---

## "Anladım" özeti şablonu (chat'te kullan)

Agent önemli işe girmeden önce şu formatta yazar:

```
## Anladım — [kısa başlık]

**Senin isteğin:** … (mümkünse senin cümlen)

**Yapacağım:** …
**Dokunmayacağım:** …
**SPEC'te güncellediğim:** … (hangi bölüm)

**Çelişki / soru:** … (yoksa "Yok")

Onaylıyor musun? (Evet / Şunu değiştir: …)
```

### Ne zaman onay şart?

| Durum                                                | Onay                     |
| ---------------------------------------------------- | ------------------------ |
| Seviye 2/3 (yön, para, mağaza, izin)                 | ✅ Zorunlu               |
| Belirsiz veya geniş istek ("daha güzel olsun")       | ✅ Özet + onay           |
| SPEC'te çelişen yeni bilgi                           | ✅ Netleştir, sonra onay |
| Seviye 1 rutin (yazım, küçük bug, vitrin güncelleme) | ❌ Doğrudan yap          |
| Proje sahibi "yap", "onaylıyorum", "devam" dedi      | ✅ Sayılır               |

---

## Çelişki kontrolü

Yeni istek gelince agent şunlara bakar:

1. `SPEC.md` → **Kesinleşenler** ve **Kapsam dışı**
2. `KARARLAR.md` → tarihli kararlar
3. `IS-AKIS.md` → son 5–10 kayıt

Çelişki örneği:

> SPEC'te "ücretsiz max 3 alışkanlık" kesinleşmiş; yeni istek "sınırsız ücretsiz" → **Seviye 2**, onay gerekir.

Agent tahmin etmez; hangisinin geçerli olduğunu sorar.

---

## SPEC güncelleme kuralları

1. **Her önemli cümle** SPEC'te bir yere işlenir (Kesinleşen / Bekleyen / Ertelenen).
2. **Kesinleşenler** yalnızca onay sonrası veya zaten uygulanmış gerçekler için.
3. **Bekleyen sorular** agent'ın proje sahibine soracağı net maddeler.
4. **Ertelenenler** bilinçli olarak sonraya bırakılanlar (neden kısaca).
5. Kabul kriterleri Kesinleşenlerle uyumlu tutulur.

---

## Proje sahibi ne yapar?

- Serbest konuşur, fikir verir — **SPEC yazmana gerek yok**
- Agent özet sunduğunda **Evet** veya **Şunu değiştir** dersin
- Çelişki sorusu gelince hangisini istediğini seçersin
- VITRIN ve IS-AKIS'i istersen kontrol edersin

---

## İlgili dosyalar

- `docs/OZELLIK-ISTEGI-SABLONU.md` — büyük özellikler için detaylı istek
- `docs/TANIM-BITTI.md` — iş bitince kontrol listesi
- `docs/GORSEL-VITRIN.md` — görsel onay
