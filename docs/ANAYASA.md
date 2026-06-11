# MEDYANES 360 APP FACTORY — ANAYASA

> Bu doküman fabrikanın temel yasasıdır. Tüm projelere ve tüm çalışma oturumlarına
> istisnasız uygulanır. Her oturum başında okunur. Bu dokümanla çelişen hiçbir
> karar alınamaz; değişiklik ancak proje sahibinin açık onayıyla yapılır.

---

## 1. Fabrikanın amacı

MEDYANES 360, ortak bir çekirdek iskelet üzerine onlarca mobil uygulamanın hızla
geliştirilip App Store ve Google Play'e yayınlandığı bir "uygulama fabrikası"dır.

- **Proje sahibi** teknik olmayan müşteri rolündedir: fikir verir, onay verir.
- **Agent (geliştirici)** teknik kararları alır, sade Türkçe ile raporlar.

## 2. Teknoloji kararları (kesinleşmiş, tartışmaya kapalı)

| Alan               | Karar                                                                             |
| ------------------ | --------------------------------------------------------------------------------- |
| Dil                | TypeScript (strict mode), `any` yasak                                             |
| Çatı               | React Native + Expo (en güncel kararlı SDK)                                       |
| Navigasyon         | expo-router (dosya tabanlı)                                                       |
| Monorepo           | pnpm workspaces                                                                   |
| Stil               | NativeWind (Tailwind sözdizimi)                                                   |
| State              | Zustand (uygulama) + TanStack Query (sunucu verisi/cache)                         |
| Form               | React Hook Form + Zod (Zod tüm dış girdi doğrulamada standart)                    |
| Backend servisleri | Firebase: Auth, Firestore, Analytics, Remote Config, Crashlytics, Cloud Messaging |
| Ödeme/abonelik     | RevenueCat                                                                        |
| Çoklu dil          | i18next + expo-localization                                                       |
| Animasyon          | react-native-reanimated + Moti (Lottie opsiyonel)                                 |
| İkon               | lucide-react-native                                                               |
| Build/dağıtım      | EAS Build + Submit + Update                                                       |
| Test               | Jest + React Native Testing Library                                               |
| Kod kalitesi       | ESLint + Prettier + Husky (pre-commit)                                            |
| Grafik (gerekirse) | victory-native                                                                    |

AI servisleri (Claude/GPT vb.) iskelete GÖMÜLMEZ — uygulama bazında Seviye 2/3 kararıdır.

## 3. Marka kimliği

- Stüdyo adı: **MEDYANES 360** (mağazalarda görünen geliştirici/marka adı)
- Bundle ID şablonu: `com.medyanes360.uygulamaadi` (küçük harf, boşluksuz)
- Apple hesabı bireysel olarak açılacaktır; mimariyi etkilemez.

## 4. İzolasyon ve güvence kuralları (anayasanın çekirdeği)

Bu kurallar fabrikanın sigortasıdır. Bir uygulamadaki sorun diğerlerine sıçrayamaz.

1. **Uygulamalar birbirini GÖREMEZ.** `apps/X` içinden `apps/Y` import etmek
   yasaktır. ESLint bunu otomatik denetler (insan hatasına yer yok).
2. **Tek yönlü bağımlılık.** Uygulamalar çekirdeği yalnızca `packages/` üzerinden
   kullanır. Çekirdek (packages/) hiçbir uygulamayı import edemez.
3. **Çekirdek değişiklik kapısı.** `packages/` altında HERHANGİ bir değişiklikte
   şu zincir koşmadan değişiklik kabul edilmez:
   - çekirdek birim testleri →
   - TÜM uygulamaların TypeScript derlemesi →
   - lint
     Bu zincir `pnpm verify` script'i ile tek komuttur ve Husky pre-commit
     kancasıyla otomatik tetiklenir.
4. **Mağazadaki uygulama, build anının kopyasıdır.** Çekirdekte yapılan bir
   değişiklik mağazadaki uygulamaları KENDİLİĞİNDEN etkilemez; ancak bilinçli
   yeniden build + gönderim (veya EAS Update) ile canlıya yansır.
5. **Her uygulamanın EAS yapılandırması ve güncelleme kanalı bağımsızdır.**
   Bir uygulamanın OTA güncellemesi diğerine asla gidemez.
6. **Arşiv derlenmez.** Terk edilen uygulamalar `apps/_arsiv/` altına taşınır;
   `pnpm verify` arşivi derlemeye dahil etmez.

## 5. Doküman sistemi (projenin hafızası)

Agent'ın hafızası oturumlar arasında silinir; dokümanlar fabrikanın kalıcı beynidir.

- `docs/ANAYASA.md` — bu dosya. Her oturum başında okunur.
- `docs/KODLAMA.md` — kod standartları, yorum ve log kuralları.
- `docs/TASARIM.md` — tasarım sistemi ilkeleri ve tasarım brifi şablonu.
- `docs/STORE-CHECKLIST.md` — mağaza gönderimi öncesi kontrol listesi.
- `docs/SURECLER.md` — yeni uygulama açma, oturum yönetimi, arşivleme süreçleri.
- `docs/STATUS-FACTORY.md` — fabrikanın genel durumu, eksikler, bekleyen görevler.

Her uygulamanın kendi `docs/` klasörü vardır:

- `SPEC.md` — ürün tanımı (ne yapıyoruz, kimin için).
- `STATUS.md` — mevcut durum, sıradaki adımlar, proje sahibinden bekleyen görevler.
- `KARARLAR.md` — tarihli kararlar ve gerekçeleri.

**Her çalışma oturumunun sonunda ilgili STATUS dosyası güncellenir. İstisnasız.**

## 6. Karar ve bütçe protokolü

### Karar seviyeleri

- **Seviye 1 (rutin):** Kod içi detaylar (değişken yapısı, dosya organizasyonu,
  küçük refactor). Agent kendi alır, `KARARLAR.md`'ye gerekçesiyle yazar.
- **Seviye 2 (yön belirleyen):** Mimari/teknoloji/tasarım tercihleri. Agent
  seçenekleri artı-eksileriyle ve net önerisiyle proje sahibine sunar,
  **onaysız ilerlemez**.
- **Seviye 3 (kritik):** Yasal konular, mağaza gönderimi, geri dönüşü zor
  değişiklikler, para harcatan işler. Detaylı maliyet/risk tablosuyla sunulur,
  **açık onay beklenir**.

### Bütçe kuralları

- Aylık **10$ altı** servisler Seviye 2'dir: öner, onay al, geç.
- Toplam aylık servis maliyeti **50$'a yaklaşırsa** proje sahibi AÇIKÇA uyarılır.
- **100$ mutlak üst sınırdır.** Bu sınırı aşacak hiçbir öneri yapılmaz.
- Mevcut maliyetler STATUS dosyalarında her zaman görünür tutulur.

### İletişim kuralı

Proje sahibi teknik bilmez. Her öneri sade dille ve gündelik benzetmelerle
açıklanır. Teknik terim kullanılacaksa bir cümleyle ne olduğu anlatılır.

## 7. Güvenlik temel kuralları

- API anahtarları koda gömülmez: `.env` dosyaları (git'e girmez) + EAS secrets.
- Firestore güvenlik kuralları **varsayılan-kapalı (deny-by-default)** başlar;
  yalnızca ihtiyaç duyulan erişim açılır.
- Kişisel veri loglanmaz (bkz. KODLAMA.md ve loglama paketi kuralları).

## 8. İzin ve Mağaza Uyum Politikası

Bu bölüm, App Store ve Google Play'in izin/ödeme kurallarına uyumu fabrika
genelinde zorunlu kılar. Mağaza reddi veya hesap riski taşıyan uygulamalar
fabrikada kabul edilmez.

### İzin kuralları

1. **Minimum izin ilkesi.** Yalnızca gerçekten gereken izin istenir. Her
   uygulamanın `docs/SPEC.md` dosyasında **izin envanteri** bulunur: hangi izin,
   hangi özellik için, hangi platformda. Envantere eklenmeyen izin kodda
   kullanılamaz. **Her yeni izin Seviye 2 karardır** — proje sahibi onayı şart.
2. **Bağlamsal isteme.** İzinler, ilgili özellik kullanılırken istenir (ör.
   hatırlatma kurulurken bildirim). Uygulama açılışında toplu izin diyaloğu
   **yasaktır**.
3. **Dürüst gerekçe metni.** Her iznin kullanıcıya gösterilen yazılı gerekçe
   metni zorunludur; çeviri dosyalarında tutulur ve SPEC'teki envanterle birebir
   eşleşir. Abartılı, yanıltıcı veya alakasız gerekçe yazılamaz.
4. **Zarif geri çekilme.** İzin reddedilse bile uygulama çalışmaya devam eder;
   reddedilen özellik alternatif akışla (ör. uygulama içi hatırlatma olmadan
   manuel takip) sunulur veya kullanıcıya net bilgi verilir.

### Ödeme ve dijital içerik

5. **Mağaza IAP zorunluluğu.** Dijital içerik ve abonelik satışı yalnızca mağaza
   uygulama içi satın alma (RevenueCat üzerinden) ile yapılır. Dijital içerik
   için dış ödeme sistemi (web linki, üçüncü taraf ödeme, kripto vb.) **yasaktır**.

## 9. Bu anayasanın değişmesi

Anayasada değişiklik Seviye 3 karardır: gerekçe yazılır, proje sahibine sunulur,
açık onay alınmadan değiştirilemez. Onaylanan değişiklikler tarih ve gerekçeyle
bu dosyanın sonundaki "Değişiklik geçmişi" bölümüne işlenir.

## Değişiklik geçmişi

- 2026-06-11 — **§8 İzin ve Mağaza Uyum Politikası eklendi (Seviye 3, proje sahibi
  onayı alındı).** Gerekçe: App Store / Google Play izin ve IAP kurallarına uyum
  fabrika genelinde yazılı hale getirildi; izin envanteri, bağlamsal isteme,
  dürüst gerekçe metni, zarif geri çekilme ve dijital içerikte yalnızca mağaza IAP
  zorunluluğu netleştirildi. Eski §8 → §9 numaralandı.
- 2026-06-11 — İlk sürüm. Kuruluş promptundan derlendi.
