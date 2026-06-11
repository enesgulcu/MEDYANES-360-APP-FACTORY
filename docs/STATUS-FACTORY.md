# STATUS — FABRİKA GENELİ

> Fabrikanın genel durum dosyası. Fabrika çapındaki her oturumun sonunda güncellenir.

Son güncelleme: 2026-06-11

## Genel durum: KURULUŞ TAMAMLANDI ✅

Fabrikanın temeli kuruldu ve doğrulandı. Henüz hiçbir gerçek uygulama
geliştirilmedi (bu bilinçli — ilk görev yalnızca temeldi).

### Ne kuruldu?

| Parça                             | Durum | Not                                                         |
| --------------------------------- | ----- | ----------------------------------------------------------- |
| Doküman sistemi (docs/)           | ✅    | ANAYASA, KODLAMA, TASARIM, STORE-CHECKLIST, SURECLER        |
| Cursor kuralları (.cursor/rules/) | ✅    | Oturum + mimari kuralları, her oturumda otomatik            |
| Monorepo (pnpm workspaces)        | ✅    | Node 22 + pnpm 11, hoisted linker (Expo uyumu)              |
| İzolasyon denetimi (ESLint)       | ✅    | Uygulamalar birbirini göremez; otomatik, elle bakım istemez |
| Çekirdek değişiklik kapısı        | ✅    | Husky pre-commit → `pnpm verify` (test + derleme + lint)    |
| 9 çekirdek paket                  | ✅    | Hepsi MOCK modda, 43 birim testi yeşil                      |
| Şablon uygulama (apps/\_sablon)   | ✅    | Expo SDK 56, çalıştığı doğrulandı (aşağıda)                 |
| Arşiv klasörü (apps/\_arsiv)      | ✅    | Workspace ve verify kapsamı dışında                         |

### Doğrulama kanıtları (2026-06-11)

- `pnpm verify` yeşil: 43 test + 10 projenin TS derlemesi + lint.
- Metro dev sunucusu ayağa kalktı; **iOS bundle (3866 modül) ve Android
  bundle (3957 modül) hatasız derlendi**.
- Statik web dışa aktarımı 7 rotayı (onboarding, paywall, home, ayarlar...)
  hatasız RENDER etti — yani uygulama kodu gerçekten çalıştı.
- Telefonda görsel doğrulama için: `cd apps/_sablon && pnpm start` → Expo Go
  ile QR okut (proje sahibinin yapabileceği 2 dakikalık iş).

## Mock modda olanlar (hesap bağlanınca gerçeğe geçecek)

Tüm dış servisler taklit (mock) istemcilerle çalışıyor; arayüzler sabit
olduğu için gerçeğe geçişte uygulama/ekran kodu DEĞİŞMEYECEK:

- kimlik → Firebase Auth bekliyor
- analitik → Firebase Analytics bekliyor
- loglama (Firestore hedefi) → Firestore bekliyor
- uzak-ayar → Firebase Remote Config bekliyor
- bildirim → Firebase Cloud Messaging (+ iOS için APNs) bekliyor
- odeme → RevenueCat bekliyor
- Crashlytics → Firebase bekliyor (henüz pakete eklenmedi; hesapla birlikte)

## Bilinen eksikler / teknik notlar

- NativeWind v5 "preview" sürümünde (Expo SDK 56'nın resmi yolu bu).
  Kararlı sürüm çıktığında güncellenecek (Seviye 1).
- Tasarım sistemi bileşen testleri (render testleri) ilk gerçek uygulamayla
  birlikte jest-expo üzerinden eklenecek; şu an tema mantığı testli.
- Zustand kalıcılığı (uygulama kapatılınca durumu hatırlama) bilinçli olarak
  şablona eklenmedi; uygulama bazında karar verilecek.
- EAS Build/Submit, Expo hesabı + mağaza hesapları olmadan denenemez.

## SENDEN BEKLEYENLER (proje sahibi görevleri)

> Bunlar hesap açma işleri; teknik bilgi gerektirmez, ekran ekran tarif edildi.
> Hiçbiri ACİL değil: ilk gerçek uygulamaya başlarken 1-2'nin hazır olması yeter.

### 1. Firebase hesabı (ücretsiz başlar)

1. Tarayıcıda `console.firebase.google.com` adresine git.
2. Google hesabınla giriş yap (yoksa bir Gmail hesabı aç).
3. Karşına çıkan ekranda "Create a project / Proje oluştur" düğmesine bas.
4. Proje adı olarak ilk uygulamanın adını yaz (her uygulamaya ayrı proje açacağız;
   şimdilik sadece hesabın hazır olması yeterli, proje açmayı birlikte yaparız).
5. "Google Analytics" sorusuna "Evet/Enable" de (ücretsiz, bize lazım).
6. Hesap açıldıktan sonra bana "Firebase hazır" demen yeterli.

💰 Maliyet: Ücretsiz (Spark planı). Kullanım büyürse Blaze planına geçiş
Seviye 3 karar olarak ayrıca önüne gelir.

### 2. RevenueCat hesabı (ücretsiz başlar)

1. Tarayıcıda `app.revenuecat.com` adresine git.
2. "Sign up" ile e-postanla kayıt ol.
3. Şirket/proje adı sorulursa "MEDYANES 360" yaz.
4. İçeride başka bir şey yapmana gerek yok; proje kurulumunu birlikte yaparız.

💰 Maliyet: Aylık 2.500$ gelire kadar ücretsiz. Bu eşik bizden çok uzak;
geçersek zaten kazanıyoruz demektir.

### 3. Apple Developer hesabı (yayın öncesi gerekli, acil değil)

1. `developer.apple.com` → "Account" → Apple ID ile giriş.
2. "Enroll" (kayıt) sürecini başlat; **bireysel (Individual)** hesabı seç
   (önceden kararlaştırdığımız gibi).
3. Kimlik doğrulaması istenebilir (pasaport/kimlik fotoğrafı).
4. Ödeme adımı: yıllık 99$ — **bu Seviye 3 harcamadır; ödemeden önce bana
   haber ver, zamanlamasını birlikte kararlaştıralım** (ilk uygulama App
   Store'a gönderilmeye yakınken açmak yeterli).

💰 Maliyet: 99$/yıl.

### 4. Google Play Developer hesabı (yayın öncesi gerekli, acil değil)

1. `play.google.com/console` → Google hesabınla giriş.
2. "Create developer account" → kişisel hesap seç.
3. Kimlik doğrulaması ve tek seferlik 25$ ödeme ister — **ödemeden önce bana
   haber ver (Seviye 3)**.

💰 Maliyet: 25$ (tek seferlik).

## Aylık servis maliyetleri (mevcut)

| Servis | Maliyet | Not                                       |
| ------ | ------- | ----------------------------------------- |
| —      | 0$/ay   | Şu an hiçbir ücretli servis kullanılmıyor |

Planlanan tek seferlik/yıllık: Apple 99$/yıl + Google 25$ (tek sefer) —
yalnızca mağaza yayını öncesi, açık onayınla.

## Sıradaki adımlar

1. **Proje sahibi:** İlk uygulama fikrini anlat → birlikte SPEC.md çıkarırız.
2. **Proje sahibi:** Firebase + RevenueCat hesaplarını aç (yukarıdaki tarifle).
3. **Agent:** İlk uygulamayı şablondan açar (SURECLER.md §1), tasarım brifini
   sorar, tema önerileri sunar.
4. **Agent:** Hesaplar hazır olunca mock istemcileri gerçek Firebase/RevenueCat
   istemcileriyle değiştirir (ekran kodları değişmeden).
5. Telefonda görsel tur: `cd apps/_sablon && pnpm start` → Expo Go ile dene
   (istersen ilk oturumda birlikte yaparız).

## Oturum geçmişi

- **2026-06-11 — Kuruluş oturumu.** Fabrika temeli sıfırdan kuruldu:
  dokümanlar, monorepo, 9 çekirdek paket, şablon uygulama. 5 git commit
  atıldı (her aşama bir geri dönüş noktası). Tüm doğrulamalar yeşil.
