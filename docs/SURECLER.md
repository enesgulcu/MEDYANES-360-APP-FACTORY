# SÜREÇLER

> Fabrikanın günlük işleyiş tarifleri: yeni uygulama açma, çalışma oturumu
> yönetimi, çekirdek değişikliği ve arşivleme.

---

## 1. Yeni uygulama açma süreci

Yeni uygulama = şablonu kopyalamak + kimliklendirmek. Adımlar sırayla:

1. **Fikir ve isim**
   - Proje sahibi fikri anlatır; agent `SPEC.md` taslağı çıkarır, onaylatır.
   - Uygulama adı ve klasör adı belirlenir (küçük harf, boşluksuz, Türkçe karaktersiz).
2. **İzin envanteri**
   - SPEC.md'ye **izin envanteri** yazılır: hangi izin, hangi özellik için, hangi
     platform, kullanıcıya gösterilecek gerekçe metni (ANAYASA §8).
   - Envanter dışı izin kodda kullanılamaz; yeni izin eklemek Seviye 2 karardır.
3. **Şablonu kopyala**
   - `pnpm new-app <uygulama-adi>` (önerilen) — veya elle `apps/_sablon` → `apps/<uygulama-adi>`.
   - `package.json` içindeki `name`, `app.json` içindeki `name`, `slug`,
     `scheme` ve bundle ID güncellenir: `com.medyanes360.<uygulamaadi>`.
   - `docs/SPEC.md`, `STATUS.md`, `KARARLAR.md`, `IS-AKIS.md` şablonları doldurulmaya başlanır.
4. **Tasarım brifi**
   - TASARIM.md'deki brif soruları proje sahibine sorulur.
   - Tema önerileri sunulur (Seviye 2), onaylanan tema uygulanır.
5. **Firebase projesi** (proje sahibi + agent rehberliği)
   - console.firebase.google.com → yeni proje → iOS ve Android uygulamaları eklenir.
   - `google-services.json` ve `GoogleService-Info.plist` indirilir, uygulama
     klasörüne (git dışı) konur; gerekli servisleri (Auth, Firestore, Analytics,
     Remote Config, Messaging) aç.
   - Firestore kuralları deny-by-default yüklenir.
6. **RevenueCat projesi** (proje sahibi + agent rehberliği)
   - app.revenuecat.com → yeni proje → iOS/Android app eklenir; API anahtarları
     `.env`'e yazılır.
   - Ürünler/abonelikler mağaza taraflarıyla eşleştirilir (mağaza hesapları
     hazır olduğunda).
7. **EAS yapılandırması**
   - `eas.json` bu uygulamaya özel profillerle güncellenir; update kanalı
     uygulamaya özel adlandırılır (ör. `<uygulama-adi>-production`).
   - Secrets EAS'a yüklenir.
8. **İlk çalıştırma ve doğrulama**
   - `pnpm install` → uygulama dev modda açılır → onboarding, paywall (mock),
     ayarlar, dil değişimi elle denenir.
   - `pnpm verify` yeşil olmalı.
9. **Geliştirme** SPEC.md'ye göre ilerler; mağaza gönderimi öncesi
   STORE-CHECKLIST.md uygulanır.

## 2. Çalışma oturumu yönetimi

### Oturum başı

1. `docs/ANAYASA.md` okunur.
2. Üzerinde çalışılan uygulamanın `docs/STATUS.md` dosyası okunur
   (fabrika geneli iş ise `docs/STATUS-FACTORY.md`).
3. Aynı uygulamanın `docs/IS-AKIS.md` (veya fabrika işi ise `docs/IS-AKIS-FACTORY.md`)
   son kayıtları okunur — önceki isteklerin bağlamı için.
4. Aynı uygulamanın `docs/SPEC.md` okunur — Kesinleşenler, Bekleyen sorular, Ertelenenler.
5. STATUS'taki "sıradaki adımlar" ve "bekleyen görevler" gözden geçirilir.

### Oturum sırasında

- Seviye 1 kararlar `KARARLAR.md`'ye tarihli ve gerekçeli işlenir.
- Yeni ürün bilgisi önce `SPEC.md`'ye işlenir (`docs/URUN-ONAY-PROTOKOLU.md`).
- Seviye 2/3 veya belirsiz istekte **"Anladım" özeti** ile onay alınır; onaysız kod yazılmaz.
- **Her tamamlanan proje sahibi isteğinde** `IS-AKIS.md`'ye kayıt eklenir
  (format: `docs/IS-AKIS-SABLONU.md`; en yeni kayıt en altta).
- Seviye 2/3 konular biriktirilmez; ortaya çıktığında proje sahibine sorulur.

### Oturum sonu (istisnasız)

1. İlgili `STATUS.md` güncellenir: ne yapıldı, mevcut durum, sıradaki adımlar,
   proje sahibinden bekleyenler.
2. `SPEC.md` güncel tutulur (yeni kesinleşen / bekleyen / ertelenen maddeler).
3. `IS-AKIS` kayıtlarındaki commit alanları push sonrası hash ile güncellenir.
4. Çekirdekte (`packages/`) değişiklik yapıldıysa `pnpm verify` koşulur;
   kırmızıysa oturum bitmiş sayılmaz.
5. Anlamlı bir bütün tamamlandıysa git commit atılır (Türkçe, açıklayıcı mesaj).
6. **Commit'ler GitHub'a push edilir.** Push'suz oturum kapanmış sayılmaz;
   repo her zaman güncel kalmalıdır.

## 3. Çekirdek (packages/) değişiklik süreci

Çekirdek tüm uygulamaların ortak temelidir; değişiklik "binanın kolonuna
dokunmak" gibidir.

1. Değişiklik ihtiyacı `KARARLAR.md`'ye yazılır (hangi uygulama için, neden).
2. Davranış değişiyorsa Seviye 2: proje sahibine sade dille sorulur.
3. Değişiklik yapılır; ilgili birim testleri güncellenir/eklenir.
4. `pnpm verify` koşulur: çekirdek testleri → TÜM uygulamaların TS derlemesi →
   lint. (Husky pre-commit zaten zorlar.)
5. Mağazadaki uygulamalar etkilenmez; canlıya yansıması istenen uygulamalar
   için bilinçli yeniden build/güncelleme planlanır ve STATUS'a yazılır.

## 4. Arşivleme süreci

Bir uygulama terk edildiğinde:

1. Karar `KARARLAR.md`'ye gerekçesiyle yazılır (Seviye 2 — proje sahibi onayı).
2. `STATUS.md` son durumla güncellenir: neden bırakıldı, mağazada yayında mı,
   geri dönülürse nereden devam edilir.
3. Klasör `apps/<ad>` → `apps/_arsiv/<ad>` taşınır.
4. Arşiv `pnpm verify` kapsamı DIŞINDADIR; çekirdek değişiklikleri arşivi derlemez.
5. Uygulama mağazada yayındaysa: mağazadan kaldırma ayrı bir Seviye 3 karardır;
   arşivlemek tek başına mağazadan kaldırmaz.

## 5. Geri getirme (arşivden çıkarma)

1. Klasör `apps/_arsiv/<ad>` → `apps/<ad>` taşınır.
2. `pnpm install` + `pnpm verify` koşulur; çekirdek bu arada ilerlediyse uyum
   sorunları burada yakalanır ve giderilir.
3. STATUS.md "aktif" olarak güncellenir.
