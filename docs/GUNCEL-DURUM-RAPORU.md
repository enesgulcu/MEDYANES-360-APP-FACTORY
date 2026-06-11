# MEDYANES 360 APP FACTORY — Güncel Durum Raporu

**Tarih:** 11 Haziran 2026  
**Durum:** Kuruluş tamamlandı, fabrika çalışmaya hazır  
**Son commit:** 5 aşamalı kurulum (6 commit), tüm doğrulamalar yeşil

---

## Tek cümleyle

Pastane binasını inşa ettik: mutfak (çekirdek paketler), tarif defterleri (dokümanlar) ve yeni şube açmak için hazır şablon (`apps/_sablon`) hazır. Henüz hiçbir gerçek uygulama (pasta) yapılmadı — bu bilinçli bir karardı.

---

## Ne kuruldu?

| Bölüm                   | Ne işe yarar?                                                          | Durum                   |
| ----------------------- | ---------------------------------------------------------------------- | ----------------------- |
| **docs/**               | Fabrikanın kalıcı hafızası: kurallar, süreçler, mağaza kontrol listesi | ✅ Hazır                |
| **packages/** (9 paket) | Tüm uygulamaların ortak temeli: kimlik, ödeme, dil, tasarım vb.        | ✅ Mock modda, testli   |
| **apps/\_sablon**       | Yeni uygulama açarken kopyalanacak çalışan şablon                      | ✅ Çalıştığı doğrulandı |
| **apps/\_arsiv**        | Terk edilen uygulamaların saklandığı yer                               | ✅ Boş, hazır           |
| **pnpm verify**         | Çekirdek değişince otomatik güvenlik kontrolü                          | ✅ Yeşil                |
| **Git geçmişi**         | Her aşama ayrı commit — sorun olursa geri dönülebilir                  | ✅ 6 commit             |

### 9 çekirdek paket (hepsi mock modda)

| Paket             | Görevi                                           |
| ----------------- | ------------------------------------------------ |
| `cekirdek`        | Ortak tipler ve yardımcılar                      |
| `kimlik`          | Kullanıcı girişi (varsayılan: anonim)            |
| `odeme`           | Abonelik / paywall yönetimi                      |
| `analitik`        | Olay takibi (Analytics)                          |
| `loglama`         | Kullanıcı bazlı sorun kaydı                      |
| `bildirim`        | Push bildirim altyapısı                          |
| `dil`             | Türkçe + İngilizce, otomatik cihaz dili          |
| `uzak-ayar`       | Uygulamayı yeniden yayınlamadan uzaktan ayarlama |
| `tasarim-sistemi` | Buton, kart, modal vb. + tema sistemi            |

**Mock mod** = dış servisler (Firebase, RevenueCat) henüz bağlı değil; uygulama taklit modda çalışıyor. Hesaplar açılınca gerçek bağlantıya geçilir, ekran kodları değişmez.

### Şablon uygulamada neler var?

- Örnek onboarding (2 adım) → uzaktan açılıp kapatılabilen örnek paywall
- Ayarlar: dil seçimi, gizlilik politikası linki, hesap/veri silme
- Karanlık mod desteği
- Expo SDK 56 + NativeWind (Tailwind tarzı stiller)

---

## Doğrulama (test edildi mi?)

| Kontrol                  | Sonuç                 |
| ------------------------ | --------------------- |
| Birim testleri           | 43 test — hepsi geçti |
| TypeScript derlemesi     | 10 proje — hatasız    |
| Lint (kod kalitesi)      | Temiz                 |
| Metro dev sunucusu       | Ayağa kalktı          |
| iOS bundle derlemesi     | 3866 modül — hatasız  |
| Android bundle derlemesi | 3957 modül — hatasız  |
| Web statik render        | 7 ekran — hatasız     |

Telefonda görsel deneme (senin yapabileceğin 2 dakikalık iş):

```bash
cd apps/_sablon
pnpm start
```

Expo Go uygulamasıyla QR kodu okut.

---

## Git commit geçmişi (geri dönüş noktaları)

| Commit | İçerik                                          |
| ------ | ----------------------------------------------- |
| 1      | Doküman sistemi (ANAYASA, KODLAMA, TASARIM, …)  |
| 2      | Monorepo iskeleti (pnpm, ESLint, Husky, verify) |
| 3      | 9 çekirdek paket (mock, testli, README'li)      |
| 4      | Şablon uygulama + tasarım sistemi bileşenleri   |
| 5      | STATUS-FACTORY.md                               |
| 6      | Bu rapor + push                                 |

---

## SENDEN BEKLEYENLER

Hiçbiri acil değil. İlk gerçek uygulamaya başlarken Firebase + RevenueCat yeterli.

### 1. Firebase hesabı (ücretsiz)

1. `console.firebase.google.com` → Google hesabınla giriş
2. "Proje oluştur" → Analytics'i aç
3. Bana "Firebase hazır" de — proje kurulumunu birlikte yaparız

### 2. RevenueCat hesabı (ücretsiz, 2.500$/ay gelire kadar)

1. `app.revenuecat.com` → kayıt ol
2. Şirket adı: **MEDYANES 360**
3. Bana "RevenueCat hazır" de

### 3. Apple Developer (99$/yıl — yayın öncesi, acil değil)

`developer.apple.com` → bireysel hesap. **Ödemeden önce bana haber ver** (Seviye 3 karar).

### 4. Google Play Developer (25$ tek sefer — yayın öncesi, acil değil)

`play.google.com/console` → kayıt. **Ödemeden önce bana haber ver** (Seviye 3 karar).

---

## Aylık maliyet

| Servis        | Şu an     |
| ------------- | --------- |
| Tüm servisler | **0$/ay** |

---

## Sıradaki adımlar

1. **Sen:** İlk uygulama fikrini anlat.
2. **Sen:** Firebase + RevenueCat hesaplarını aç (yukarıdaki tarifle).
3. **Agent:** Şablondan ilk uygulamayı açar, tasarım brifini sorar, tema önerir.
4. **Agent:** Hesaplar hazır olunca mock servisleri gerçeğe bağlar.
5. **Birlikte:** Telefonda şablonu Expo Go ile dene (istersen).

---

## Önemli dosyalar (nerede ne var?)

| Dosya                         | Ne için?                                      |
| ----------------------------- | --------------------------------------------- |
| `docs/ANAYASA.md`             | Fabrikanın temel yasası — her oturumda okunur |
| `docs/STATUS-FACTORY.md`      | Teknik detaylı fabrika durumu                 |
| `docs/SURECLER.md`            | Yeni uygulama açma adımları                   |
| `docs/GUNCEL-DURUM-RAPORU.md` | Bu dosya — senin için özet rapor              |
| `apps/_sablon/`               | Yeni uygulama şablonu                         |
| `README.md`                   | Genel tanıtım ve temel komutlar               |

---

## Teknik ortam (bilgi amaçlı)

- Node.js 22, pnpm 11
- Expo SDK 56, React Native 0.85
- Monorepo: `pnpm install` (kök dizinde), `pnpm verify` (kontrol)

---

_Bu rapor kuruluş oturumunun kapanışında oluşturuldu. Güncel teknik detaylar için `docs/STATUS-FACTORY.md` dosyasına bak._
