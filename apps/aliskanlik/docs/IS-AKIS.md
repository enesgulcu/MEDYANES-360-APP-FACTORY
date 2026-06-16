# İŞ AKIŞI — Alışkanlık (Pilot)

> Proje sahibinin her isteği ve agent'ın yaptığı işlerin kronolojik günlüğü.
> En yeni kayıt **en alta** eklenir. Format: `docs/IS-AKIS-SABLONU.md`

Son güncelleme: 2026-06-16

---

## 2026-06-11 10:00 — Pilot uygulama olarak alışkanlık takipçisi

**İstek (proje sahibi):**

> Fabrikanın ilk gerçek uygulamasını yapalım; alışkanlık takibi olsun.

**Önce → Sonra (sade):**

- **Önce:** Yalnızca mock şablon (`_sablon`) vardı.
- **Sonra:** `apps/aliskanlik` açıldı; basit alışkanlık ekleme ve işaretleme hedeflendi.

**Teknik müdahale:**

- `apps/aliskanlik/` — pilot uygulama iskeleti
- `docs/SPEC.md`, `KARARLAR.md` — ürün ve tema kararları

**Commit:** `6b78997`
**Durum:** ✅ tamamlandı

---

## 2026-06-11 14:00 — MVP Aşama 1: Firebase + alışkanlık listesi

**İstek (proje sahibi):**

> Firebase bağla; alışkanlık ekleyip işaretleyebileyim.

**Önce → Sonra (sade):**

- **Önce:** Mock veri; dış servis yoktu.
- **Sonra:** Firebase Auth (anonim) + Firestore; ana sayfada liste; ekleme formu; tema A (sakin yeşil).

**Teknik müdahale:**

- `packages/kimlik` — Firebase Web SDK istemcisi
- `apps/aliskanlik/src/veri/aliskanlik-depo.ts` — Firestore deposu
- `apps/aliskanlik/src/app/home.tsx`, `ekle.tsx` — liste ve form
- `apps/aliskanlik/src/altyapi/firebase-yapilandirma.ts` — env yapılandırması

**Commit:** `6f40bb4`
**Durum:** ✅ tamamlandı

---

## 2026-06-11 17:00 — Expo Go stabilizasyonu

**İstek (proje sahibi):**

> Telefonda Expo Go ile çalışsın; konsol hataları gitsin.

**Önce → Sonra (sade):**

- **Önce:** Paywall sonsuz yüklemede kalıyordu; Remote Config ve AsyncStorage hataları vardı.
- **Sonra:** Web/Expo Go'da mock ödeme; RC SDK yalnızca native build'de; Remote Config varsayılanları; paywall fiyatları görünür.

**Teknik müdahale:**

- `packages/odeme/src/fabrika-istemci.ts` — ortam bazlı ödeme seçimi
- `packages/uzak-ayar` — Expo Go'da fetch atlanır
- `packages/kimlik` — AsyncStorage v3 kalıcılık
- `apps/aliskanlik/src/app/paywall.tsx` — mock fiyatlar ve hata durumu

**Commit:** `ee3244c`
**Durum:** ✅ tamamlandı

---

## 2026-06-16 12:00 — Telefon testi bekleniyor (durum notu)

**İstek (proje sahibi):**

> Sistemi güçlendir; sonra telefonda deneyeceğim.

**Önce → Sonra (sade):**

- **Önce:** MVP hazır ama telefon doğrulaması yapılmadı.
- **Sonra:** Fabrika CI/süreç güçlendirildi; pilot uygulama test için bekliyor.

**Teknik müdahale:**

- Fabrika geneli — `docs/IS-AKIS-FACTORY.md` (güçlendirme kaydı)
- `apps/aliskanlik/docs/STATUS.md` — bekleyen görev: telefon testi

**Commit:** `d7152fa` (fabrika)
**Durum:** ⏳ proje sahibi telefon testi bekleniyor

---

## 2026-06-16 16:30 — İş akışı kayıt sistemi entegrasyonu

**İstek (proje sahibi):**

> Her uygulama geliştirirken yapay zekaya verilen komutların tarih, prompt ve değişiklik özetiyle takip edildiği iş akış günlüğünü entegre et.

**Önce → Sonra (sade):**

- **Önce:** Yalnızca oturum sonu STATUS özeti vardı; hangi istekte ne değiştiği kronolojik kayıtlı değildi.
- **Sonra:** `IS-AKIS.md` ile her istek tarih/saat, prompt, önce/sonra ve teknik özet olarak kayıt altında.

**Teknik müdahale:**

- `docs/IS-AKIS-SABLONU.md`, `docs/IS-AKIS-FACTORY.md` — format ve fabrika günlüğü
- `apps/_sablon/docs/IS-AKIS.md` — yeni uygulama şablonu
- `docs/ANAYASA.md`, `SURECLER.md`, `AGENT-OTURUM-CHECKLIST.md` — süreç kuralları
- `scripts/yeni-uygulama.mjs` — new-app ile IS-AKIS kopyalanır

**Commit:** `2391f00`
**Durum:** ✅ tamamlandı
