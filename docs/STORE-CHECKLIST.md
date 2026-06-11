# MAĞAZA GÖNDERİM KONTROL LİSTESİ

> Her uygulama, App Store / Google Play'e gönderilmeden önce bu listenin
> TAMAMI yeşil olmadan gönderilmez. Mağaza gönderimi Seviye 3 karardır:
> proje sahibinin açık onayı şarttır.

---

## 1. Yasal ve gizlilik

- [ ] **Gizlilik politikası URL'i** hazır ve canlı (her iki mağaza da zorunlu tutar).
- [ ] Gizlilik politikası, uygulamanın GERÇEKTE topladığı verilerle birebir uyumlu.
- [ ] Uygulama içinden gizlilik politikasına link var (ayarlar ekranı).
- [ ] KVKK/GDPR: veri saklama süresi ve silme akışı dokümante edilmiş.

## 2. App Tracking Transparency — ATT (iOS)

- [ ] Kullanıcıyı uygulamalar/siteler arası takip eden bir SDK var mı tespit edildi.
- [ ] Takip VARSA: ATT izin diyaloğu eklendi, `NSUserTrackingUsageDescription`
      metni yazıldı (sade ve dürüst).
- [ ] Takip YOKSA: App Store Connect'te "tracking yok" beyan edildi ve hiçbir
      SDK izinsiz takip yapmıyor (doğrulandı).

## 3. Veri toplama beyanları (iki mağaza)

- [ ] **Apple "App Privacy" (Privacy Nutrition Labels)** dolduruldu:
      hangi veri, hangi amaçla, kimliğe bağlı mı?
- [ ] **Google Play "Data safety"** formu dolduruldu (aynı bilgilerle tutarlı).
- [ ] Firebase Analytics, Crashlytics, RevenueCat gibi SDK'ların topladığı
      veriler beyanlara dahil edildi.

## 4. Hesap ve veri silme (Apple zorunluluğu)

- [ ] Uygulama hesap oluşturuyorsa, **uygulama içinden hesap silme** akışı var.
- [ ] Hesap silme, kullanıcı verilerini de (Firestore log dahil) siliyor/anonimleştiriyor.
- [ ] Ayarlar ekranındaki "hesap/veri silme talebi" akışı uçtan uca test edildi.

## 5. Abonelik ve paywall

- [ ] Abonelik şartları paywall'da GÖRÜNÜR: fiyat, süre, otomatik yenileme bilgisi.
- [ ] Kullanım Koşulları (EULA) ve Gizlilik Politikası linkleri paywall'da mevcut.
- [ ] "Satın alımları geri yükle" (restore purchases) butonu var ve çalışıyor.
- [ ] RevenueCat ürünleri ile mağaza ürünleri (ID ve fiyatlar) birebir eşleşiyor.
- [ ] Sandbox/test satın alma akışı uçtan uca denendi.

## 6. Mağaza varlıkları (metadata)

- [ ] Uygulama adı, alt başlık, açıklama (TR + EN) hazır.
- [ ] Anahtar kelimeler (iOS) / kısa açıklama (Android) hazır.
- [ ] **Ekran görüntüleri**: gerekli tüm boyutlarda (6.7" / 6.5" / iPad, telefon/tablet),
      gerçek uygulama içeriğiyle.
- [ ] Uygulama ikonu tüm boyutlarda; alfa kanalı yok (iOS).
- [ ] Geliştirici adı **MEDYANES 360** olarak görünüyor.

## 7. Yaş derecelendirmesi

- [ ] Apple yaş derecelendirme anketi dolduruldu.
- [ ] Google Play içerik derecelendirme anketi (IARC) dolduruldu.
- [ ] İçerik, beyan edilen yaş grubuyla tutarlı.

## 8. İnceleme ekibi için hazırlık

- [ ] **Test hesabı** oluşturuldu (kullanıcı adı + şifre) ve App Review notlarına yazıldı.
- [ ] Giriş gerektiren tüm özellikler test hesabıyla erişilebilir.
- [ ] Özel donanım/konum gerektiren özellikler için açıklama/video eklendi.
- [ ] Demo/inceleme notları sade İngilizce yazıldı.

## 9. Teknik son kontroller

- [ ] `pnpm verify` yeşil; sürüm ve build numarası artırıldı.
- [ ] Bundle ID `com.medyanes360.uygulamaadi` şablonuna uygun.
- [ ] Production build (EAS) gerçek cihazda denendi: açılış, onboarding,
      paywall, ayarlar, dil değişimi.
- [ ] Crashlytics ve Analytics production'da veri akıtıyor (doğrulandı).
- [ ] EAS Update kanalı bu uygulamaya özel ve doğru yapılandırılmış.
- [ ] `.env`/secrets mağaza build'inde mevcut; koda gömülü anahtar YOK.
