# SPEC — [Uygulama Adı]

> Ürün tanımı. Onaylanmadan geliştirmeye başlanmaz.

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
