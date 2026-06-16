# İŞ AKIŞI — Fabrika Geneli

> Fabrika çapındaki işlerin kronolojik günlüğü (çekirdek, CI, doküman, süreç).
> Uygulama özel işler → `apps/<uygulama>/docs/IS-AKIS.md`
> Format: `docs/IS-AKIS-SABLONU.md`

Son güncelleme: 2026-06-16

---

## 2026-06-11 18:00 — Fabrika kuruluşu (Aşama 0–5)

**İstek (proje sahibi):**

> MEDYANES 360 App Factory monoreposunu kur; çekirdek paketler, şablon, doküman sistemi.

**Önce → Sonra (sade):**

- **Önce:** Boş veya başlangıç deposu.
- **Sonra:** 9 çekirdek paket, `apps/_sablon`, ANAYASA/KODLAMA/TASARIM, `pnpm verify` yeşil.

**Teknik müdahale:**

- `packages/*` — 9 mock paket
- `apps/_sablon` — Expo SDK 56 şablon uygulama
- `docs/` — anayasa ve süreç dokümanları
- `.cursor/rules/` — oturum kuralları

**Commit:** `6b78997` (kuruluş serisi)
**Durum:** ✅ tamamlandı

---

## 2026-06-16 15:00 — Fabrika güçlendirme (CI, süreç, servis modu)

**İstek (proje sahibi):**

> Tüm tespitleri uygula; sistem güvenilir, akıcı, adaptive olsun; kontrol sende.

**Önce → Sonra (sade):**

- **Önce:** Manuel verify; oturum sonu özet; yeni uygulama elle kopyalanıyordu.
- **Sonra:** GitHub Actions CI, `pnpm new-app`, servis modu, Maestro smoke, ErrorBoundary, süreç dokümanları.

**Teknik müdahale:**

- `.github/workflows/verify.yml` — otomatik doğrulama
- `packages/cekirdek/src/servis-modu.ts` — mock/canlı mod
- `packages/*/src/fabrika.ts` — tek giriş kapısı istemcileri
- `scripts/yeni-uygulama.mjs` — `pnpm new-app`
- `apps/_sablon/.maestro/` — smoke E2E
- `docs/TANIM-BITTI.md`, `EKOSISTEM.md`, `AGENT-OTURUM-CHECKLIST.md` vb.

**Commit:** `d7152fa`
**Durum:** ✅ tamamlandı

---

## 2026-06-16 16:30 — İş akışı kayıt sistemi

**İstek (proje sahibi):**

> Her uygulama geliştirirken yapay zekaya verilen komutların tarih, prompt ve değişiklik özetiyle takip edildiği iş akış günlüğü entegre et.

**Önce → Sonra (sade):**

- **Önce:** Yalnızca oturum sonu STATUS özeti; istek bazlı kronolojik kayıt yoktu.
- **Sonra:** Her uygulamada `IS-AKIS.md`; fabrika işleri için `IS-AKIS-FACTORY.md`; agent her iş bitince kayıt açar.

**Teknik müdahale:**

- `docs/IS-AKIS-SABLONU.md` — kayıt formatı
- `apps/_sablon/docs/IS-AKIS.md` — şablon
- `docs/SURECLER.md`, `AGENT-OTURUM-CHECKLIST.md`, `.cursor/rules/` — süreç güncellemesi
- `scripts/yeni-uygulama.mjs` — yeni uygulamalara IS-AKIS kopyası

**Commit:** `aa44c0b`
**Durum:** ✅ tamamlandı

---

## 2026-06-16 18:00 — Ürün onay protokolü (SPEC canlı bellek)

**İstek (proje sahibi):**

> Ürün onay protokolünü kur; eksik kalmasın, kontrollerini yap.

**Önce → Sonra (sade):**

- **Önce:** SPEC vardı ama canlı bellek disiplini (kesinleşen / bekleyen / ertelenen) ve onay kapısı süreçlere tam bağlı değildi.
- **Sonra:** `URUN-ONAY-PROTOKOLU.md`; SPEC şablonları güncellendi; agent oturum kuralları ve checklist'e onay + çelişki kontrolü eklendi.

**Teknik müdahale:**

- `docs/URUN-ONAY-PROTOKOLU.md` — "Anladım" özeti, çelişki kontrolü, SPEC bölümleri
- `apps/_sablon/docs/SPEC.md`, `apps/aliskanlik/docs/SPEC.md` — Kesinleşenler / Bekleyen / Ertelenen
- `docs/ANAYASA.md`, `SURECLER.md`, `TANIM-BITTI.md`, `EKOSISTEM.md`, `OZELLIK-ISTEGI-SABLONU.md`
- `docs/PROJE-SAHIBI-GOREVLERI.md`, `AGENT-OTURUM-CHECKLIST.md`, `.cursor/rules/oturum-kurallari.mdc`
- `scripts/yeni-uygulama.mjs` — SPEC tarih yer tutucusu

**Commit:** `fe65dc6`
**Durum:** ✅ tamamlandı

---

## 2026-06-16 12:00 — Görsel vitrin (ekran önizleme) sistemi

**İstek (proje sahibi):**

> Geliştirilen sayfaların ekran görüntülerini uygulama klasöründe topla; telefonda gezmeden görsel değerlendirme yapabileyim.

**Önce → Sonra (sade):**

- **Önce:** Değişiklikleri görmek için Expo Go ile tek tek gezmek gerekiyordu.
- **Sonra:** `docs/onizleme/VITRIN.md` — GitHub'da tüm ekranlar tek sayfada; agent otomatik günceller.

**Teknik müdahale:**

- `scripts/ekran-onizleme.mjs` + `pnpm onizleme <uygulama>`
- `apps/*/docs/onizleme/` — görseller + manifest + VITRIN.md
- `docs/GORSEL-VITRIN.md` — proje sahibi rehberi

**Commit:** `aa44c0b`
**Durum:** ✅ tamamlandı
