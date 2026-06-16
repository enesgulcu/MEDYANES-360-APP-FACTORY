# SPEC — [Uygulama Adı]

> **Canlı ürün belleği.** Onaylanmadan geliştirmeye başlanmaz.
> Proje sahibinin söyledikleri buraya işlenir; konuşma kaybolmaz.
> Protokol: `docs/URUN-ONAY-PROTOKOLU.md`

Son SPEC güncellemesi: YYYY-AA-GG

---

## Kesinleşenler (onaylı / uygulanmış)

> Proje sahibi ve agent'ın **anlaştığı ve değişmeyecek** sayılan maddeler.
> Yeni bilgi çelişirse agent sorar (Seviye 2).

- [ ] _(Henüz doldurulmadı — ilk oturumda agent proje sahibiyle doldurur)_

## Bekleyen sorular (agent soracak)

> Netleşmeden koda geçilmeyecek maddeler.

- [ ] Tasarım brifi (TASARIM.md) tamamlandı mı?
- [ ] Mağaza görünen adı kesin mi?
- [ ] _(diğer sorular…)_

## Bilerek ertelenenler (şimdilik yok)

> Sonraya bırakılanlar — unutulmasın diye burada.

| Özellik | Neden ertelendi | Tahmini ne zaman |
| ------- | --------------- | ---------------- |
| —       | —               | —                |

---

## Tek cümlelik tanım

[Uygulama ne yapar, kimin için?]

## Hedef kitle

[Kim kullanacak? Yaş, alışkanlıklar, ihtiyaç]

## Çözdüğü problem

[Kullanıcının hangi derdine deva oluyor?]

## Temel özellikler (MVP)

- [ ] [Özellik 1]
- [ ] [Özellik 2]

## Kabul kriterleri (test edilebilir — TANIM-BITTI.md)

Her özellik için "kullanıcı X yaptığında Y olur" formatında:

- [ ] Uygulama ilk açıldığında onboarding gösterilir.
- [ ] Dil değiştirildiğinde tüm arayüz anında güncellenir.
- [ ] …

## İzin envanteri (ANAYASA §8 — zorunlu)

| İzin     | Platform    | Hangi özellik için | Gerekçe metni (çeviri anahtarı) |
| -------- | ----------- | ------------------ | ------------------------------- |
| Bildirim | iOS/Android | Hatırlatma         | `izin.bildirim.gerekce`         |
| …        | …           | …                  | …                               |

Envanter dışı izin kodda **kullanılamaz**. Yeni izin = Seviye 2 onay.

## Gelir modeli

[Abonelik mi, tek seferlik mi? Hangi özellikler premium?]

## Tasarım brifi cevapları

(TASARIM.md brif soruları buraya işlenir)

## Kapsam dışı (bilinçli olarak YAPILMAYACAKLAR)

- [Özellik X — neden: …]

## Teknik kimlik

- Klasör adı: `apps/<uygulama-adi>`
- Bundle ID: `com.medyanes360.<uygulamaadi>`
- EAS update kanalı: `<uygulama-adi>-production`
