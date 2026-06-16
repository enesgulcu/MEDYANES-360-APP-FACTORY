# Proje Sahibinin Görevleri

> Agent teknik her şeyi yapar. Senin yapman gerekenler burada — ekran ekran.

---

## Şimdi yapman gerekenler

### 1. Telefonda pilot uygulamayı dene (öncelikli)

1. Bilgisayarda terminal açmana gerek yok — agent başlatabilir; veya:
   - `cd apps/aliskanlik` → `pnpm start`
2. Telefonda **Expo Go** ile QR kodu okut.
3. Dene: alışkanlık ekle, bugün işaretle, ayarlar, paywall.
4. Sorun görürsen ekran görüntüsü + kısa açıklama gönder.

### 2. Expo hesabı (ücretsiz — preview build için)

1. `expo.dev` → Sign up (GitHub ile olabilir).
2. Bana **"Expo hesabım hazır"** de.
3. Agent EAS projesini bağlar; telefonda önizleme linki alırsın.

### 3. GitHub Actions'ı kontrol et

1. `github.com/enesgulcu/MEDYANES-360-APP-FACTORY` → **Actions** sekmesi.
2. Son **Verify** işinin yeşil olduğunu gör (agent push ettikten sonra).
3. Kırmızıysa bana haber ver — agent düzeltir.

---

## Zaten tamamladıkların ✅

- Firebase hesabı ve `aliskanlik-001` projesi
- RevenueCat hesabı
- Firestore güvenlik kuralları yayını

---

## Her yeni uygulama için senin rolün

1. **Fikri anlat** — ne yapacak, kimin için.
2. **SPEC taslağını onayla** — agent sunar.
3. **Tasarım brifini doldur** — agent soruları sorar (TASARIM.md).
4. **Tema önerisini seç** — 2-3 seçenek sunulur.
5. **Preview build'i telefonda dene** — link gelince aç, yorum yap.
6. **"Beğendim" / "Şunu değiştir"** de — agent düzeltir.

Teknik komut çalıştırmana gerek yok.

---

## Yayın öncesi (acil değil)

| Görev                   | Maliyet            | Ne zaman                          |
| ----------------------- | ------------------ | --------------------------------- |
| Apple Developer         | 99$/yıl            | İlk App Store gönderiminden önce  |
| Google Play Developer   | 25$ tek sefer      | İlk Play Store gönderiminden önce |
| Gizlilik politikası URL | Ücretsiz (hosting) | Mağaza başvurusundan önce         |

**Ödeme adımlarından önce bana haber ver** — Seviye 3 onay gerekir.

---

## Senin yapmana gerek OLMAYANlar

- Kod yazmak, terminal kullanmak
- `pnpm verify`, test, lint
- Git commit / push (agent yapar)
- Paket seçimi, mimari kararlar (Seviye 1 — agent alır)
- IS-AKIS günlüğünü elle yazmak (agent her isteği kaydeder)

## İş akışını takip etmek (istersen)

Her uygulamanın `apps/<uygulama>/docs/IS-AKIS.md` dosyasında:
ne istediğin, ne değiştiği ve hangi tarihte yapıldığı kronolojik olarak durur.
Fabrika geneli işler: `docs/IS-AKIS-FACTORY.md`.
