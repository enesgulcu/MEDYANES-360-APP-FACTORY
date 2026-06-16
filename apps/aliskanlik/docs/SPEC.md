# SPEC — Alışkanlık (Pilot Uygulama)

> **Canlı ürün belleği.** Fabrikanın ilk gerçek uygulaması.
> Protokol: `docs/URUN-ONAY-PROTOKOLU.md`

Son SPEC güncellemesi: 2026-06-16

---

## Kesinleşenler (onaylı / uygulanmış)

- Pilot uygulama: günlük alışkanlık takibi; birincil pazar **Türkiye**, dil **TR + EN**.
- Bundle ID: `com.medyanes360.aliskanlik`; geliştirici markası **MEDYANES 360**.
- Tema **A — Sakin Yeşil** (`#059669` / `#F0FDF4`) — proje sahibi onayı (2026-06-11).
- Firebase: Auth (anonim) + Firestore veri; Expo Go için **Web SDK** (KARARLAR).
- Ücretsiz planda **en fazla 3 alışkanlık** (Remote Config: `ucretsiz_aliskanlik_limiti`, varsayılan 3).
- Gelir modeli: **freemium + abonelik** (RevenueCat); dış ödeme / web ödeme **yasak**.
- Onboarding **2 adım**; ardından paywall (uzaktan açılıp kapatılabilir).
- Ayarlar zorunlu set: dil, karanlık mod (sistem/açık/koyu), gizlilik linki, hesap/veri silme.
- Bildirim izni yalnızca **hatırlatma özelliği** için ve **bağlamsal** istenecek (toplu izin yok).
- İzin envanteri dışı: konum, kamera, mikrofon, rehber, ATT **istenmeyecek**.
- MVP Aşama 1 **kodlandı**: liste, ekleme formu, günlük işaretleme, mock paywall, ayarlar.
- Expo Go / web önizleme ile geliştirme; gerçek IAP için **EAS native build** gerekir.

## Bekleyen sorular (agent soracak)

- [ ] **Telefon testi:** Expo Go'da ekle/işaretle/paywall sorunsuz mu? (proje sahibi)
- [ ] **Mağaza görünen adı** kesin mi: "Alışkanlık" mı, başka isim mi?
- [ ] **Tasarım brifi** (TASARIM.md) — mağaza ekran görüntüsü ve his için tamamlanacak
- [ ] Premium'da kesin hangi özellikler? (şu an: sınırsız alışkanlık + gelişmiş grafik **taslak**)
- [ ] Hatırlatma: varsayılan saat var mı, yoksa kullanıcı her alışkanlık için mi seçer?
- [ ] **Expo hesabı** açıldı mı? (EAS preview için)

## Bilerek ertelenenler (şimdilik yok)

| Özellik                           | Neden ertelendi                                  | Tahmini ne zaman             |
| --------------------------------- | ------------------------------------------------ | ---------------------------- |
| Push hatırlatma (FCM)             | MVP önce liste/işaretleme; izin bağlamsal olacak | Telefon testi sonrası sprint |
| İlerleme grafiği (victory-native) | MVP Aşama 1 kapsamı dışında bırakıldı            | FCM sonrası                  |
| EAS development build             | Expo hesabı bekleniyor                           | Expo hazır olunca            |
| Gerçek RevenueCat IAP             | Native build + mağaza ürünleri gerekir           | EAS sonrası                  |
| Crashlytics (production)          | Canlı kullanıcı öncesi                           | Mağaza öncesi                |
| Sosyal / arkadaş yarışması        | Kapsam dışı (MVP)                                | Değerlendirme yok            |
| AI koçluk                         | Seviye 2/3 ayrı karar                            | Talep olursa                 |

---

## Kimliklendirme

| Alan                | Değer                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| Klasör              | `apps/aliskanlik`                                                         |
| Görünen ad (mağaza) | Alışkanlık _(bekleyen soru — netleşecek)_                                 |
| Bundle ID (iOS)     | `com.medyanes360.aliskanlik`                                              |
| Paket adı (Android) | `com.medyanes360.aliskanlik`                                              |
| URL scheme          | `aliskanlik`                                                              |
| EAS kanalları       | `aliskanlik-development` / `aliskanlik-preview` / `aliskanlik-production` |
| Geliştirici markası | MEDYANES 360                                                              |

## Tek cümlelik tanım

Günlük alışkanlıklarını takip etmek isteyen kullanıcılar için sade bir alışkanlık
takipçisi; hatırlatmalar, ilerleme görünümü ve isteğe bağlı premium özellikler sunar.

## Hedef kitle

- **Birincil pazar:** Türkiye (varsayılan dil TR; EN hazır).
- Günlük rutinlerini düzenlemek isteyen 18–45 yaş, akıllı telefon kullanan genel kitle.
- Teknoloji alışkanlığı: orta — karmaşık uygulamalardan kaçınır, net arayüz ister.

## Çözdüğü problem

İnsanlar alışkanlık kurmak ister ama unutur, motivasyonu düşer veya araçlar fazla
karmaşıktır. Bu uygulama: ekle → işaretle → hatırlat → ilerlemeyi gör akışını
minimum sürtünme ile sunar.

## Pilotun amacı (fabrika testi)

| Modül                   | Pilot kullanımı              | Durum        |
| ----------------------- | ---------------------------- | ------------ |
| Kimlik                  | Anonim giriş, hesap silme    | ✅ Bağlı     |
| Form (RHF + Zod)        | Alışkanlık ekleme            | ✅           |
| Liste + EmptyState      | Alışkanlık listesi           | ✅           |
| Bildirim                | Hatırlatma                   | ⏳ Ertelendi |
| Paywall                 | Premium sınır (3 alışkanlık) | ✅ Mock      |
| Uzak ayar               | Limit, paywall aç/kapa       | ✅           |
| Analitik + loglama      | Olay takibi                  | ✅ Mock      |
| Dil (TR/EN)             | Çift dil                     | ✅           |
| Karanlık mod            | Ayarlardan Sistem/Açık/Koyu  | ✅           |
| Grafik (victory-native) | Haftalık/aylık ilerleme      | ⏳ Ertelendi |

## Temel özellikler (MVP)

- [x] Onboarding (2 adım)
- [x] Alışkanlık listesi (günlük işaretleme)
- [x] Alışkanlık ekleme formu (ad, renk)
- [ ] Hatırlatma saati + bildirim (ertelendi)
- [ ] Basit ilerleme grafiği (ertelendi)
- [x] Ayarlar: dil, karanlık mod, gizlilik, hesap silme, abonelik kartı (RC hazırsa)
- [x] Paywall (mock / Expo Go); limit aşımında yönlendirme

## Kabul kriterleri (test edilebilir)

- [x] İlk açılışta onboarding gösterilir; tamamlanınca paywall veya ana sayfa.
- [x] Kullanıcı alışkanlık ekleyebilir; Firestore'da saklanır (Firebase açıkken).
- [x] Kullanıcı bugünü işaretleyebilir / kaldırabilir.
- [x] Ücretsiz kullanıcı 3 alışkanlıktan sonra paywall'a yönlendirilir.
- [x] Ayarlardan dil TR/EN anında değişir.
- [x] Ayarlardan tema sistem/açık/koyu seçilebilir.
- [ ] Telefonda (Expo Go) uçtan uca manuel test — proje sahibi onayı bekliyor.
- [ ] Hatırlatma kurulduğunda bildirim gelir (henüz uygulanmadı).

## Gelir modeli

- **Freemium + abonelik** (RevenueCat).
- Ücretsiz: en fazla 3 alışkanlık, temel istatistik.
- Premium: sınırsız alışkanlık, gelişmiş grafikler _(detay bekleyen soru)_.

## İzin envanteri (ANAYASA §8)

| İzin            | Platform      | Özellik                          | Ne zaman istenir                       | Gerekçe (TR)                                                                     |
| --------------- | ------------- | -------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------- |
| Bildirim (push) | iOS + Android | Günlük alışkanlık hatırlatmaları | Kullanıcı hatırlatma saati eklediğinde | Seçtiğin saatte hatırlatma gönderebilmemiz için bildirim iznine ihtiyacımız var. |

**Reddedilme:** Uygulama çalışır; hatırlatma kurulamaz; manuel işaretleme devam eder.

## Tasarım brifi cevapları

> **BEKLEMEDE** — TASARIM.md brif soruları tamamlanacak. Tema A renkleri kesinleşti.

## Kapsam dışı

- Sosyal paylaşım / arkadaş yarışması
- Konum, sağlık sensörü
- Web ödeme / dış abonelik linki
- Uygulama açılışında toplu izin
- AI koçluk (ayrı karar)
