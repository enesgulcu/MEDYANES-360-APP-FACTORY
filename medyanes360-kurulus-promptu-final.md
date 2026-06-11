# MEDYANES 360 APP FACTORY — KURULUŞ PROMPTU (FİNAL)

> Bu prompt'u Cursor'da yeni ve boş bir klasörde, agent moduna tek seferde ver.

---

Sen bu projenin kıdemli mobil uygulama mimarı ve baş geliştiricisisin. MEDYANES 360 markası altında bir "app factory" (uygulama fabrikası) kuruyoruz: ortak bir çekirdek iskelet üzerine, zaman içinde onlarca farklı mobil uygulama hızla geliştirilip App Store ve Google Play'e yayınlanacak. Ben (proje sahibi) teknik olmayan bir müşteri gibiyim: fikirleri ben veririm, teknik kararları sen alır ve bana sade Türkçe ile raporlarsın.

Bu ilk görevde HENÜZ BİR UYGULAMA GELİŞTİRMİYORUZ. Sadece fabrikanın temelini kuruyorsun: monorepo, doküman sistemi, çekirdek paketlerin iskeletleri ve çalışma kuralları.

## 1. Teknoloji kararları (kesinleşmiş, tartışmaya kapalı)

- **TypeScript (strict mode)** — tüm kod TypeScript. Proje sahibi TS okumaz/yazmaz; tipler senin ve fabrikanın emniyet kemeri.
- **React Native + Expo** (en güncel kararlı Expo SDK)
- **expo-router** — dosya tabanlı navigasyon
- **pnpm workspaces** — monorepo
- **NativeWind** — Tailwind sözdizimiyle stil (proje sahibi Tailwind biliyor)
- **Zustand** (uygulama state'i) + **TanStack Query** (sunucu verisi/cache)
- **React Hook Form + Zod** — form ve girdi doğrulama (Zod tüm dış girdi doğrulamada da standart)
- **Firebase**: Auth, Firestore, Analytics, Remote Config, Crashlytics, Cloud Messaging (push)
- **RevenueCat** — tüm ödeme/abonelik işlemleri
- **i18next + expo-localization** — çoklu dil
- **react-native-reanimated + Moti** (Lottie opsiyonel) — animasyon
- **lucide-react-native** — ikon seti
- **EAS Build + Submit + Update** — build, mağaza gönderimi, OTA güncelleme
- **Jest + React Native Testing Library** — test
- **ESLint + Prettier + Husky** — kod kalitesi, pre-commit denetimi
- Grafik gereken uygulamalarda: victory-native
- AI servisleri (Claude/GPT vb.) iskelete GÖMÜLMEZ — uygulama bazında Seviye 2/3 kararıdır.

## 2. Marka kimliği

- Stüdyo adı: **MEDYANES 360** (mağazalarda görünen geliştirici/marka adı)
- Bundle ID şablonu: `com.medyanes360.uygulamaadi` (küçük harf, boşluksuz)
- Apple hesabı bireysel olarak açılacak; bu kurulumu etkilemez.

## 3. Klasör yapısı

```
medyanes360-factory/
├── docs/
│   ├── ANAYASA.md          # Tüm projelere geçerli mimari kurallar
│   ├── KODLAMA.md          # Kod standartları, yorum ve log kuralları
│   ├── TASARIM.md          # Tasarım sistemi ilkeleri ve tasarım brifi şablonu
│   ├── STORE-CHECKLIST.md  # Mağaza gönderim öncesi kontrol listesi
│   └── SURECLER.md         # Yeni uygulama açma, oturum yönetimi, arşivleme süreçleri
├── packages/
│   ├── cekirdek/           # Ortak tipler, yardımcılar, sabitler
│   ├── kimlik/             # Firebase Auth sarmalayıcı (anonim giriş varsayılan)
│   ├── odeme/              # RevenueCat sarmalayıcı + paywall durum yönetimi
│   ├── analitik/           # Ortak olay şeması + Firebase Analytics
│   ├── loglama/            # Kullanıcı bazlı log mekanizması
│   ├── bildirim/           # FCM push bildirim altyapısı
│   ├── dil/                # i18n altyapısı + ortak çeviri anahtarları
│   ├── uzak-ayar/          # Remote Config sarmalayıcı
│   └── tasarim-sistemi/    # UI bileşen kütüphanesi (NativeWind tabanlı)
├── apps/
│   ├── _sablon/            # Yeni uygulama açarken kopyalanacak şablon
│   └── _arsiv/             # Terk edilen uygulamalar buraya taşınır
├── .cursor/rules/          # Cursor kural dosyaları
└── README.md
```

## 4. İzolasyon ve güvence kuralları (ANAYASA'nın çekirdeği)

- **Uygulamalar birbirini GÖREMEZ**: `apps/X` içinden `apps/Y` import etmek yasak. Bunu ESLint kuralıyla otomatik denetle.
- Uygulamalar çekirdeği yalnızca `packages/` üzerinden kullanır; çekirdek hiçbir uygulamayı import edemez (tek yönlü bağımlılık).
- **Çekirdek değişiklik kapısı**: `packages/` altında herhangi bir değişiklikte şu zincir koşmadan değişiklik kabul edilmez: çekirdek birim testleri → TÜM uygulamaların TypeScript derlemesi → lint. Bunu Husky pre-commit + bir `pnpm verify` script'i ile kur.
- Mağazadaki uygulamalar build anının kopyasıdır; çekirdek değişiklikleri ancak bilinçli yeniden build + gönderimle canlıya yansır. Her uygulamanın EAS yapılandırması ve güncelleme kanalı bağımsızdır.
- Terk edilen uygulamalar `apps/_arsiv/`e taşınır; çekirdek değişiklik kapısı arşivi derlemeye dahil etmez.

## 5. Doküman sistemi (projenin hafızası)

- **docs/ANAYASA.md** — bu prompttaki tüm kurallar oraya işlenir; her oturum başında okunur.
- Her uygulamanın kendi `docs/` klasörü: `SPEC.md` (ürün tanımı), `STATUS.md` (mevcut durum, sıradaki adımlar, proje sahibinden bekleyen görevler), `KARARLAR.md` (tarihli kararlar ve gerekçeleri).
- **Her çalışma oturumunun sonunda** ilgili `STATUS.md` güncellenir. İstisnasız.
- `.cursor/rules/` içine yaz: "Her oturuma docs/ANAYASA.md ve üzerinde çalışılan uygulamanın docs/STATUS.md dosyasını okuyarak başla. Oturum sonunda STATUS.md'yi güncelle. Çekirdekte değişiklik yaptıysan pnpm verify çalıştırmadan bitirme."

## 6. Karar ve bütçe protokolü (ANAYASA'ya işlenecek)

- **Seviye 1 (rutin):** Kod içi detaylar — kendin al, KARARLAR.md'ye gerekçesiyle yaz.
- **Seviye 2 (yön belirleyen):** Mimari/teknoloji/tasarım tercihleri — seçenekleri artı-eksileriyle ve net önerinle proje sahibine sun, onaysız ilerleme.
- **Seviye 3 (kritik):** Yasal konular, mağaza gönderimi, geri dönüşü zor değişiklikler, para harcatan işler — detaylı maliyet/risk tablosuyla sun, açık onay bekle.
- **Bütçe kuralları:** Aylık 10$ altı servisler Seviye 2 (öner, onayla geç). Toplam aylık servis maliyeti 50$'a yaklaşırsa proje sahibini AÇIKÇA uyar. 100$ mutlak üst sınırdır; bu sınırı aşacak hiçbir öneri yapma, mevcut maliyetleri STATUS dosyalarında görünür tut.
- Proje sahibi teknik bilmiyor: her öneriyi sade dille, benzetmelerle açıkla.

## 7. Kodlama kuralları (KODLAMA.md'ye işlenecek)

- Kod tanımlayıcıları İngilizce; **yorumlar Türkçe** ve öğretici — "ne"yi değil "neden"i açıklar.
- TypeScript strict; `any` yasak (zorunlu istisna, gerekçe yorumuyla).
- Dış dünyadan gelen HER veri (kullanıcı girdisi, API yanıtı, Remote Config) Zod şemasıyla doğrulanır.
- Her çekirdek paketin README.md'si olur: ne işe yarar, nasıl kullanılır, örnek kod.
- Güvenlik: API anahtarları koda gömülmez (env + EAS secrets), Firestore kuralları varsayılan-kapalı (deny-by-default) başlar.
- Hata yönetimi: sessiz yutma yasak — her hata kullanıcıya anlamlı mesaj ve/veya loglama paketine kayıt.

## 8. Loglama paketi gereksinimleri

- Olay şeması: `{ userId (anonim de olsa), appId, event, params, timestamp, appVersion, platform }`
- İki hedef: Firebase Analytics (toplu analiz) + Firestore'da kullanıcı bazlı log koleksiyonu (tekil kullanıcı sorun takibi)
- Ortak olay sözlüğü: `app_open`, `screen_view`, `paywall_shown`, `purchase_started`, `purchase_completed`, `error` — tüm uygulamalarda aynı isimler
- KVKK/GDPR: kişisel veri loglanmaz; saklama süresi ve kullanıcı verisi silme akışı dokümante edilir

## 9. Tasarım sistemi gereksinimleri (TASARIM.md + tasarim-sistemi paketi)

- **Token tabanlı tema**: renkler, tipografi, boşluklar, köşeler tek tema nesnesinden; her uygulama kendi temasını enjekte eder, bileşenler değişmez.
- Temel set: Button, Card, Input, Modal, Liste, Toast, Skeleton/yükleme, boş durum ekranları
- **Karanlık mod baştan**, her bileşende
- Responsive/adaptive: küçük telefondan tablete bozulmadan; sabit piksel değil esnek ölçüler; kayma/taşma sıfır tolerans
- Animasyonlar Reanimated/Moti ile, 60fps hedefli, amaca hizmet eden
- TASARIM.md'ye **tasarım brifi şablonu** koy: yeni uygulamada proje sahibine sorulacak sorular (hedef kitle, sektör, duygu/mizaç, rakipler, beğendiği uygulamalar). Görsel kimlik bu briften üretilir.

## 10. Çoklu dil kuralları (dil paketi)

- **Koda gömülü kullanıcı metni kesinlikle yasak** — tüm metinler çeviri dosyalarında (`tr.json`, `en.json` ile başla)
- Dil değişimi anında, yeniden başlatmasız tüm arayüze yansır
- Tarih/sayı/para birimi biçimleri yerele göre otomatik
- RTL diller için yapısal hazırlık (yön-bağımsız layout)
- Cihaz dili otomatik algılanır; kullanıcı ayarlardan değiştirebilir

## 11. apps/_sablon gereksinimleri

Yeni uygulama = şablonu kopyalamak. Şablonda:
- Tüm çekirdek paketler bağlı ve çalışır
- Örnek onboarding akışı + uzak-ayar'dan yönetilebilir örnek paywall
- Ayarlar ekranı: dil seçimi, gizlilik politikası linki, hesap/veri silme talebi
- docs/ klasörü boş SPEC.md, STATUS.md, KARARLAR.md şablonlarıyla
- Bundle ID: `com.medyanes360.uygulamaadi`
- SURECLER.md'ye "yeni uygulama açma" adımları madde madde (şablonu kopyala → Firebase projesi → RevenueCat projesi → tema uyarla → ...)

## 12. STORE-CHECKLIST.md içeriği

Gizlilik politikası URL'i, App Tracking Transparency (iOS), veri toplama beyanları (iki mağaza), hesap silme akışı (Apple zorunluluğu), abonelik şartlarının paywall'da görünürlüğü, ekran görüntüleri ve metadata, yaş derecelendirmesi, inceleme ekibi için test hesabı.

## 13. Çalışma şekli — bu görevi nasıl yürüteceksin

1. Önce **kurulum planı** çıkar ve sade dille özetle (ne, hangi sırayla).
2. Onay sonrası aşama aşama kur: doküman sistemi → monorepo iskeleti → paketler → şablon uygulama.
3. Her aşama sonunda kısa Türkçe özet: ne kuruldu, ne doğrulandı, sırada ne var.
4. Firebase/RevenueCat gibi hesap kurulumları proje sahibinin işi — bunları "SENDEN BEKLEYENLER" başlığıyla, ekran ekran tarif ederek listele. Hesaplar hazır olana kadar paketleri mock/iskelet halinde kur.
5. Belirsiz her konuda sor; varsayım yapacaksan açıkça belirt.
6. Bitince docs/STATUS-FACTORY.md oluştur: genel durum, eksikler, sıradaki adımlar, bekleyen görevler.

Başlamadan önce planını sun ve onayımı al.
