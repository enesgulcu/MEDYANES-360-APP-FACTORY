# MEDYANES 360 APP FACTORY — Güncel Durum Raporu

**Tarih:** 16 Haziran 2026  
**Durum:** Fabrika güçlendirildi, pilot uygulama (alışkanlık) MVP aşamasında  
**Son doğrulama:** `pnpm verify` yeşil (68 test, lint, typecheck)

---

## Tek cümleyle

Pastane binası artık sadece durmuyor — **otomatik kalite kontrolü (CI), yeni şube açma komutu ve standart süreçler** var. İlk gerçek ürün (**alışkanlık takip uygulaması**) Firebase'e bağlı ve telefonda denenmeyi bekliyor.

---

## Neredeyiz?

```
[Kuruluş ✅] → [Güçlendirme ✅] → [Pilot MVP ⏳ telefon testi] → [EAS build] → [Mağaza]
```

| Aşama                | Durum | Ne anlama geliyor?                                  |
| -------------------- | ----- | --------------------------------------------------- |
| Fabrika iskeleti     | ✅    | 9 paket, şablon, dokümanlar                         |
| Güvenilirlik katmanı | ✅    | CI, testler, lint, ErrorBoundary                    |
| Pilot uygulama       | ⏳    | `apps/aliskanlik` — senin telefon testin bekleniyor |
| Preview build        | ⏳    | Expo hesabı açılınca                                |
| Mağaza yayını        | ⏳    | Apple/Google hesapları — yayın öncesi               |

---

## Bu oturumda ne eklendi?

### Güvenilirlik

- **GitHub Actions:** Her kod değişikliğinde otomatik `pnpm verify`
- **Dependabot:** Güvenlik güncellemeleri için haftalık PR
- **68 birim testi** — çekirdek paketlerde regresyon koruması

### Akıcılık (senin için)

- **`pnpm new-app <isim>`** — yeni uygulama tek komutla açılır
- **Süreç haritası** (`docs/EKOSISTEM.md`) — fikirden uygulamaya adımlar
- **Definition of Done** (`docs/TANIM-BITTI.md`) — ne zaman "bitti" sayılır
- **Senin görev listen** (`docs/PROJE-SAHIBI-GOREVLERI.md`) — sadece senin yapacağın işler

### Adaptif yapı

- **Servis modu** (`mock` / `canli`) — aynı kod, farklı ortam
- **Fabrika fonksiyonları** — paketler tek giriş kapısından istemci üretir
- **Ortam bazlı ödeme** — Expo Go'da mock, native build'de RevenueCat

### Test altyapısı

- **Maestro smoke test** — şablonda onboarding → ana ekran akışı
- **testID'ler** — otomatik testlerin ekranları bulması için

---

## Pilot uygulama: Alışkanlık

| Özellik                            | Durum                |
| ---------------------------------- | -------------------- |
| Alışkanlık ekleme / işaretleme     | ✅                   |
| Firebase Auth (anonim)             | ✅                   |
| Firestore (veri saklama)           | ✅                   |
| Remote Config (ücretsiz limit vb.) | ✅                   |
| Paywall (mock / Expo Go)           | ✅                   |
| Gerçek satın alma                  | ⏳ EAS build gerekir |
| Push hatırlatma                    | ⏳                   |

---

## SENDEN BEKLEYENLER (sırayla)

### 1. Telefonda dene (5 dakika) — en önemli

1. Bilgisayarda: `cd apps/aliskanlik` → `pnpm start`
2. Telefonda **Expo Go** uygulamasını aç
3. QR kodu okut
4. Şunları dene:
   - Yeni alışkanlık ekle
   - Bugün işaretle
   - Ayarlara gir, dili değiştir
   - Paywall ekranını gör ("Sonra" ile geç)
5. Bir sorun görürsen ekran görüntüsü + ne yaptığını yaz — agent düzeltir

### 2. Expo hesabı (ücretsiz)

1. `expo.dev` → kayıt ol (GitHub ile olabilir)
2. Bana **"Expo hesabım hazır"** de
3. Agent EAS bağlar; telefona kurulabilir preview linki alırsın (Expo Go'dan daha stabil)

### 3. GitHub Actions kontrolü (1 dakika)

1. GitHub repo → **Actions** sekmesi
2. "Verify" işinin yeşil ✅ olduğunu gör
3. Kırmızıysa bana haber ver

### Zaten tamamladıkların ✅

- Firebase hesabı ve proje
- RevenueCat hesabı
- Firestore kuralları

### Yayın öncesi (acil değil)

| Görev                 | Maliyet       | Ne zaman                          |
| --------------------- | ------------- | --------------------------------- |
| Apple Developer       | 99$/yıl       | İlk App Store gönderiminden önce  |
| Google Play Developer | 25$ tek sefer | İlk Play Store gönderiminden önce |

**Ödeme adımlarından önce bana haber ver** — onay gerekir.

---

## Aylık maliyet

| Servis                                     | Şu an     |
| ------------------------------------------ | --------- |
| Firebase, RevenueCat, GitHub, Expo (temel) | **0$/ay** |

---

## Sıradaki adımlar

1. **Sen:** Telefonda alışkanlık uygulamasını dene, geri bildirim ver
2. **Sen:** Expo hesabı aç
3. **Agent:** Test sonuçlarına göre düzeltmeler
4. **Agent:** EAS preview build kurulumu
5. **Birlikte:** Hatırlatma bildirimi + ilerleme grafiği kararı

---

## Önemli dosyalar

| Dosya                            | Ne için?                 |
| -------------------------------- | ------------------------ |
| `docs/ANAYASA.md`                | Fabrikanın temel yasası  |
| `docs/EKOSISTEM.md`              | Fikirden uygulamaya akış |
| `docs/PROJE-SAHIBI-GOREVLERI.md` | Senin yapman gerekenler  |
| `docs/STATUS-FACTORY.md`         | Teknik detaylı durum     |
| `apps/aliskanlik/`               | Pilot uygulama           |
| `apps/_sablon/`                  | Yeni uygulama şablonu    |

---

## Temel komutlar (bilgi — çalıştırmana gerek yok)

```bash
pnpm verify              # tüm kontroller (agent çalıştırır)
pnpm new-app <isim>      # yeni uygulama aç
cd apps/aliskanlik && pnpm start   # pilot uygulamayı başlat
```

---

_Bu rapor fabrika güçlendirme oturumunun kapanışında güncellendi._
