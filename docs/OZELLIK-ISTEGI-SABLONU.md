# Özellik İsteği Şablonu

> Proje sahibi yeni bir özellik veya değişiklik istediğinde agent bu şablonu
> doldurur ve onaya sunar. Onaylanınca `SPEC.md` → **Kesinleşenler** ve kabul kriterleri güncellenir.

Protokol: `docs/URUN-ONAY-PROTOKOLU.md`

---

## [Özellik adı]

**Tarih:** YYYY-AA-GG  
**Uygulama:** [uygulama adı veya "fabrika geneli"]  
**Seviye:** 1 / 2 / 3

### Proje sahibinin isteği (kelimesi kelimesine)

> [Kullanıcının söylediği]

### Agent'ın anladığı

[1-3 cümle: ne yapılacak, kimin için]

### Kabul kriterleri (test edilebilir)

- [ ] Kullanıcı … yaptığında … olur.
- [ ] …

### Etkilenen ekranlar / paketler

- …

### Risk / maliyet (varsa)

- …

### Agent önerisi

[Ne yapılması gerektiği, net öneri]

### Proje sahibi onayı

- [ ] Onaylandı — `SPEC.md` Kesinleşenler'e işle, uygulamaya geç
- [ ] Revize — [not]

### İş akışı

Onaylanan istek tamamlandığında `apps/<uygulama>/docs/IS-AKIS.md` dosyasına kayıt eklenir.
Format: `docs/IS-AKIS-SABLONU.md`.
