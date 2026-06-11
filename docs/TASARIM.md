# TASARIM SİSTEMİ İLKELERİ

> `packages/tasarim-sistemi` paketinin kuralları ve yeni uygulamalar için
> tasarım brifi şablonu.

---

## 1. Temel ilke: token tabanlı tema

Tasarım sistemi bir "gardırop" gibi çalışır: bileşenler (Button, Card...)
vücuttur, tema (renkler, yazı tipleri, boşluklar) kıyafettir. Yeni uygulama
açarken bileşenlere DOKUNULMAZ; yalnızca tema nesnesi değiştirilir.

- Renkler, tipografi, boşluklar, köşe yarıçapları **tek tema nesnesinden** gelir.
- Her uygulama kendi temasını enjekte eder; bileşen kodu değişmez.
- Bileşen içinde sabit renk/boşluk değeri (`#3B82F6`, `padding: 16`) yazmak yasaktır;
  her değer token'dan okunur.

## 2. Temel bileşen seti

Şablonda hazır bulunması gereken asgari set:

| Bileşen | Notlar |
|---|---|
| Button | varyantlar: primary / secondary / ghost / destructive; loading durumu |
| Card | başlık, içerik, opsiyonel aksiyon alanı |
| Input | RHF uyumlu, hata mesajı gösterimi, etiket |
| Modal | erişilebilir kapatma, alttan açılan (sheet) varyantı |
| Liste | FlatList sarmalayıcı; ayraç, boş durum entegrasyonu |
| Toast | başarı / hata / bilgi varyantları |
| Skeleton | yükleme iskeleti; liste ve kart varyantları |
| EmptyState | boş durum ekranı: ikon + başlık + açıklama + opsiyonel aksiyon |

## 3. Karanlık mod

- **Baştan ve her bileşende.** Sonradan eklenmez.
- Tema nesnesi `light` ve `dark` olmak üzere iki renk paleti içerir.
- Varsayılan: cihaz ayarını izle; kullanıcı ayarlardan elle değiştirebilir.
- Yeni bileşen, karanlık modda denenmeden "bitti" sayılmaz.

## 4. Responsive / adaptive

- Küçük telefondan tablete **bozulmadan** çalışır.
- Sabit piksel yerine esnek ölçüler: flex, yüzde, tema boşluk token'ları.
- **Kayma/taşma sıfır tolerans:** metin taşması, kesilen buton, ekran dışına
  taşan içerik kabul edilmez. Uzun metin ve büyük yazı tipi (erişilebilirlik
  ayarı) senaryoları test edilir.
- Güvenli alanlar (çentik, home bar) her ekranda hesaba katılır.

## 5. Animasyon

- Araçlar: react-native-reanimated + Moti (Lottie opsiyonel).
- **60fps hedefi:** animasyonlar UI thread'de koşar (Reanimated worklet).
- Animasyon amaca hizmet eder: geçişi açıklar, hiyerarşi kurar, geri bildirim
  verir. "Süs olsun" diye animasyon eklenmez.
- Kullanıcı "hareketi azalt" (reduce motion) ayarına saygı gösterilir.

## 6. Tasarım brifi şablonu

Yeni uygulama açılırken proje sahibine aşağıdaki sorular sorulur; görsel kimlik
bu briften üretilir ve cevaplar uygulamanın `docs/SPEC.md` dosyasına işlenir.

```markdown
# Tasarım Brifi — [Uygulama Adı]

## Hedef kitle
- Bu uygulamayı kim kullanacak? (yaş aralığı, meslek, teknoloji alışkanlığı)
- Kullanıcı uygulamayı hangi ortamda, ne sıklıkla açacak?

## Sektör ve bağlam
- Uygulama hangi sektöre/alana hitap ediyor?
- Bu alanda kullanıcıların alışkın olduğu görsel diller neler?

## Duygu / mizaç
- Uygulama açıldığında kullanıcı ne hissetmeli?
  (ör. güven, enerji, sakinlik, eğlence, ciddiyet)
- 3 sıfatla tarif et: ör. "sıcak, sade, profesyonel".

## Rakipler
- Doğrudan rakip uygulamalar hangileri?
- Rakiplerde beğendiğin / beğenmediğin görsel özellikler neler?

## Beğenilen uygulamalar
- (Rakip olması şart değil) Tasarımını beğendiğin 2-3 uygulama hangileri?
- Bu uygulamalarda tam olarak neyi beğeniyorsun? (renk, sadelik, akıcılık...)

## Kısıtlar
- Olmazsa olmaz bir renk/logo/kurumsal kimlik var mı?
- Kaçınılması gereken bir şey var mı? (ör. "asla pembe", "emoji kullanma")
```

## 7. Brif → tema üretim süreci

1. Brif cevapları alınır, `docs/SPEC.md`'ye işlenir.
2. Agent brife dayanarak 2-3 tema önerisi hazırlar (renk paleti + tipografi +
   köşe/boşluk karakteri) ve sade dille sunar (Seviye 2 karar).
3. Onaylanan tema, uygulamanın tema dosyasına işlenir; bileşenlere dokunulmaz.
