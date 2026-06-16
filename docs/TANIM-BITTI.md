# Tanımı Yapılmış Bitti (Definition of Done)

> Bir özellik, görev veya oturum ancak bu listedeki maddelerin TAMAMI sağlandığında
> "bitti" sayılır. Agent ve proje sahibi aynı ölçütü kullanır.

---

## Özellik / görev bitti sayılması için

- [ ] `docs/SPEC.md` veya ilgili özellik isteğindeki **kabul kriterleri** tek tek karşılandı.
- [ ] Kullanıcıya görünen metinler çeviri dosyalarında (`tr.json` / `en.json`); koda gömülü metin yok.
- [ ] Dış veri (API, Remote Config, form) Zod ile doğrulanıyor.
- [ ] Hata sessiz yutulmuyor; anlamlı mesaj ve/veya loglama kaydı var.
- [ ] `pnpm verify` yeşil (test + typecheck + lint).
- [ ] İlgili `docs/IS-AKIS.md` veya `docs/IS-AKIS-FACTORY.md` kaydı eklendi/güncellendi.
- [ ] İlgili `docs/STATUS.md` güncellendi.
- [ ] Seviye 1 kararlar `docs/KARARLAR.md`'ye işlendi.
- [ ] Anlamlı commit atıldı ve **GitHub'a push edildi**.

## Çekirdek (`packages/`) değişikliği için ek maddeler

- [ ] Birim testi eklendi veya güncellendi.
- [ ] Paket `README.md` güncellendi (davranış değiştiyse).
- [ ] Tüm uygulamaların typecheck'i verify zincirinde geçti.

## Mağazaya yakın özellikler için ek maddeler

- [ ] `docs/STORE-CHECKLIST.md` ilgili maddeleri kontrol edildi.
- [ ] İzin envanteri `SPEC.md` ile uyumlu (ANAYASA §8).
- [ ] Proje sahibi onayı alındı (Seviye 2 veya 3).

## Oturum bitti sayılması için

- [ ] `docs/STATUS.md` veya `docs/STATUS-FACTORY.md` güncellendi.
- [ ] Oturumdaki tüm istekler `IS-AKIS` dosyasına işlendi; commit hash'leri yazıldı.
- [ ] `pnpm verify` koşuldu (çekirdek değişikliği varsa zorunlu).
- [ ] Değişiklikler commit + **push** edildi (push'suz oturum bitmiş sayılmaz).
