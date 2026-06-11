# KODLAMA STANDARTLARI

> Tüm paketler ve uygulamalar için geçerli kod yazım kuralları.
> ANAYASA.md'nin altındadır; onunla çelişemez.

---

## 1. Dil ve adlandırma

- **Kod tanımlayıcıları İngilizce:** değişken, fonksiyon, tip, dosya adları
  (`getUserProfile`, `PaywallState`). İstisna: paket klasör adları ve doküman
  dosyaları Türkçedir (fabrika kararı).
- **Yorumlar Türkçe ve öğreticidir.** Yorum "ne"yi değil **"neden"i** açıklar.
  Proje sahibi kodu okuyamaz ama yorumları okuyabilir; yorumlar aynı zamanda
  gelecekteki oturumlara not niteliğindedir.

```ts
// KÖTÜ: Sayacı bir artır. (kod zaten bunu söylüyor)
// İYİ: Apple, abonelik yenilemelerini gecikmeli bildirebildiği için
//      burada son kontrol zamanını saklayıp 5 dk'dan eski ise yeniliyoruz.
```

## 2. TypeScript kuralları

- `strict: true` her pakette ve her uygulamada zorunludur.
- **`any` yasaktır.** Zorunlu istisna gerekiyorsa (ör. tipsiz 3. parti
  kütüphane) hemen üstüne gerekçe yorumu yazılır ve mümkünse `unknown` +
  daraltma tercih edilir.
- Dışa açılan her fonksiyonun parametre ve dönüş tipleri açıkça yazılır.
- Tip tanımları paylaşılacaksa `@medyanes360/cekirdek` paketine konur.

## 3. Dış girdi doğrulama (Zod standardı)

Dış dünyadan gelen **HER** veri Zod şemasıyla doğrulanır:

- kullanıcı girdileri (formlar — React Hook Form + zodResolver),
- API/Firestore yanıtları,
- Remote Config değerleri,
- deep link / push bildirim payload'ları.

Doğrulanmamış dış veri tipli koda giremez. Şema, verinin kullanıldığı pakette
tanımlanır ve dışa `parse...` fonksiyonlarıyla açılır.

## 4. Hata yönetimi

- **Sessiz yutma yasak.** Boş `catch` bloğu kabul edilmez.
- Her hata en az birini yapar:
  1. kullanıcıya anlamlı, çevrilmiş bir mesaj gösterir,
  2. `@medyanes360/loglama` paketine `error` olayı olarak kaydedilir.
- Beklenen hatalar (ör. ağ yok) ile beklenmeyen hatalar (bug) ayrılır;
  beklenmeyenler Crashlytics'e gider.

## 5. Güvenlik

- API anahtarı, secret, token koda **gömülmez**: `.env` (git dışı) + EAS secrets.
- `.env.example` dosyası hangi anahtarların gerektiğini (değersiz) listeler.
- Firestore kuralları deny-by-default başlar.
- Loglara kişisel veri (isim, e-posta, telefon, açık metin içerik) yazılmaz.

## 6. Paket standartları

Her çekirdek paket (`packages/*`) şunları içerir:

- `README.md`: ne işe yarar, nasıl kullanılır, örnek kod.
- `src/index.ts`: paketin tek resmi giriş kapısı (derin import yasak).
- Birim testleri (`*.test.ts`) — en azından dışa açılan API için.
- Kendi `package.json` + strict `tsconfig.json`.

## 7. Loglama kuralları (özet — detay: packages/loglama/README.md)

- Olay şeması: `{ userId, appId, event, params, timestamp, appVersion, platform }`
  (userId anonim de olsa her zaman vardır).
- İki hedef: Firebase Analytics (toplu analiz) + Firestore kullanıcı bazlı log
  koleksiyonu (tekil kullanıcı sorun takibi).
- Ortak olay sözlüğü tüm uygulamalarda aynıdır:
  `app_open`, `screen_view`, `paywall_shown`, `purchase_started`,
  `purchase_completed`, `error`.
- KVKK/GDPR: kişisel veri loglanmaz; saklama süresi ve silme akışı
  loglama paketinin README'sinde dokümante edilir.

## 8. Kullanıcı metinleri (özet — detay: packages/dil/README.md)

- **Koda gömülü kullanıcı metni kesinlikle yasak.** Tüm metinler çeviri
  dosyalarında durur (`tr.json`, `en.json` ile başlanır).
- Bileşenler metinleri yalnızca `t('anahtar')` üzerinden alır.

## 9. Biçimlendirme ve denetim

- Prettier biçimlendirir, ESLint denetler; ikisi de kökten tek konfigürasyonla yönetilir.
- Husky pre-commit: staged dosyalarda lint + format; `packages/` değiştiyse
  `pnpm verify` (testler + tüm uygulamaların derlemesi + lint) koşar.
- `pnpm verify` kırmızıyken commit yapılmaz, oturum "bitti" sayılmaz.

## 10. Test kuralları

- Test çatısı: Jest + React Native Testing Library.
- Çekirdek paketlerde dışa açılan her API'nin birim testi olur.
- Test, davranışı sınar; iç implementasyon detayına kilitlenmez.
