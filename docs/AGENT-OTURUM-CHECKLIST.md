# Agent Oturum Kontrol Listesi

> Her çalışma oturumunda agent bu listeyi izler. Atlama yasak.

---

## Oturum başı

- [ ] `docs/ANAYASA.md` okundu.
- [ ] İlgili `docs/SPEC.md` okundu (**Kesinleşenler**, **Bekleyen sorular**, **Ertelenenler**).
- [ ] İlgili `docs/STATUS.md` veya `docs/STATUS-FACTORY.md` okundu.
- [ ] İlgili `docs/IS-AKIS.md` veya `docs/IS-AKIS-FACTORY.md` okundu (son 3–5 kayıt).
- [ ] Yapılacak iş SPEC ile uyumlu mu; **çelişki** var mı kontrol edildi.

## Oturum sırasında

- [ ] Proje sahibinden gelen **yeni bilgi SPEC'e işlendi** (doğru bölüm).
- [ ] Seviye 2/3 veya belirsiz istekte **"Anladım" özeti + onay** alındı (`docs/URUN-ONAY-PROTOKOLU.md`).
- [ ] Seviye 1 kararlar `KARARLAR.md`'ye yazıldı.
- [ ] Kapsam dağıtılmadı; yalnızca istenen iş yapıldı.
- [ ] **Her tamamlanan proje sahibi isteğinde** `IS-AKIS.md` kaydı eklendi (en alta).
- [ ] **Ekran görünümü değiştiyse** `pnpm onizleme <uygulama>`; `VITRIN.md` güncellendi.

## Oturum sonu

- [ ] `docs/TANIM-BITTI.md` maddeleri kontrol edildi.
- [ ] `SPEC.md` güncel (yeni kesinleşen / bekleyen / ertelenen).
- [ ] STATUS dosyası güncellendi.
- [ ] `IS-AKIS` kayıtlarında commit hash güncellendi (push sonrası).
- [ ] `pnpm verify` koşuldu (çekirdek değişikliği varsa zorunlu).
- [ ] Commit atıldı (anlamlı Türkçe mesaj).
- [ ] `git push origin main` yapıldı.
- [ ] Proje sahibine sade Türkçe özet verildi.
