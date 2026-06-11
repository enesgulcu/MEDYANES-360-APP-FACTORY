# SPEC — Alışkanlık (Pilot Uygulama)

> Ürün tanımı. Fabrikanın ilk gerçek uygulaması; tüm çekirdek modüllerin uçtan uca
> test edildiği pilot.

## Kimliklendirme

| Alan                | Değer                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| Klasör              | `apps/aliskanlik`                                                         |
| Görünen ad (mağaza) | Alışkanlık _(tasarım brifi sonrası netleşebilir)_                         |
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

Bu uygulama yalnızca "ürün" değil; **fabrika modüllerinin gerçek üründe doğrulanması**
için pilot:

| Modül                       | Pilot kullanımı                                   |
| --------------------------- | ------------------------------------------------- |
| Kimlik                      | Anonim giriş, hesap silme                         |
| Form (RHF + Zod)            | Alışkanlık ekleme/düzenleme                       |
| Liste + EmptyState          | Alışkanlık listesi                                |
| Bildirim (mock→gerçek)      | Hatırlatma zamanları                              |
| Paywall (mock)              | Premium: sınırsız alışkanlık, gelişmiş grafik vb. |
| Uzak ayar                   | Paywall aç/kapa, deneme süresi                    |
| Analitik + loglama          | Olay takibi                                       |
| Dil (TR/EN)                 | Çift dil                                          |
| Karanlık mod                | Ayarlardan Sistem/Açık/Koyu                       |
| Animasyon (Moti/Reanimated) | Tamamlama, geçişler                               |
| Grafik (victory-native)     | Haftalık/aylık ilerleme                           |

## Temel özellikler (MVP)

- [ ] Onboarding (2–3 adım, değer önerisi)
- [ ] Alışkanlık listesi (günlük işaretleme: yapıldı / yapılmadı)
- [ ] Alışkanlık ekleme/düzenleme formu (ad, ikon/renk, hedef sıklık)
- [ ] Hatırlatma saati (bildirim izni **bağlamında** istenir)
- [ ] Basit ilerleme grafiği (streak / haftalık özet)
- [ ] Ayarlar: dil, karanlık mod, gizlilik, hesap silme
- [ ] Paywall (mock): premium sınırlar (ör. ücretsiz max 3 alışkanlık)

## Gelir modeli

- **Freemium + abonelik** (RevenueCat / mağaza IAP).
- Ücretsiz: sınırlı alışkanlık sayısı, temel istatistik.
- Premium: sınırsız alışkanlık, gelişmiş grafikler, özel hatırlatmalar _(net liste tasarım brifi sonrası)_.
- Dijital içerik dış ödeme **yasak** (ANAYASA §8).

## İzin envanteri (ANAYASA §8)

| İzin            | Platform      | Özellik                          | Ne zaman istenir                                   | Gerekçe metni (TR)                                                                                | Gerekçe metni (EN)                                                                 |
| --------------- | ------------- | -------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Bildirim (push) | iOS + Android | Günlük alışkanlık hatırlatmaları | Kullanıcı alışkanlığa hatırlatma saati eklediğinde | "Seçtiğin saatte alışkanlık hatırlatmaları gönderebilmemiz için bildirim iznine ihtiyacımız var." | "We need notification permission to send habit reminders at the times you choose." |

**Envanter dışı izin:** Yok. Konum, kamera, mikrofon, rehber, takip (ATT) vb. **istenmeyecek**.

**Reddedilme davranışı:** Bildirim reddedilirse uygulama çalışır; hatırlatma kurulamaz
veya "bildirimler kapalı" bilgisi gösterilir; manuel takip devam eder.

## Dil ve yerelleştirme

- Varsayılan dil: **Türkçe** (cihaz dili desteklenmiyorsa TR'ye düş).
- İngilizce tam destek (çeviri dosyaları).
- Tüm kullanıcı metinleri `tr.json` / `en.json` — koda gömülü metin yok.

## Tasarım brifi cevapları

> **BEKLEMEDE** — Proje sahibi TASARIM.md brif sorularını yanıtlamadan tema/kod
> geliştirmesine geçilmeyecek.

## Kapsam dışı (bilinçli olarak YAPILMAYACAKLAR)

- Sosyal paylaşım / arkadaş yarışması (MVP sonrası değerlendirilebilir)
- Konum veya sağlık sensörü entegrasyonu
- Web ödeme / dış abonelik linki
- Uygulama açılışında toplu izin isteme
- AI koçluk (Seviye 2/3 ayrı karar)
