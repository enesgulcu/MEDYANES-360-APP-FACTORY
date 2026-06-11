# STATUS — FABRİKA GENELİ

> Fabrikanın genel durum dosyası. Fabrika çapındaki her oturumun sonunda güncellenir.

Son güncelleme: 2026-06-11 (Pilot uygulama + Anayasa §8 oturumu)

## Genel durum: FABRİKA AÇIK — PİLOT BAŞLADI ✅

İlk gerçek uygulama **`apps/aliskanlik`** (alışkanlık takipçisi pilot) açıldı.
Anayasa §8 İzin ve Mağaza Uyum Politikası yürürlükte. Tasarım brifi cevapları bekleniyor.

### Ne kuruldu?

| Parça                             | Durum | Not                                                        |
| --------------------------------- | ----- | ---------------------------------------------------------- |
| Doküman sistemi (docs/)           | ✅    | ANAYASA §8 eklendi; SURECLER + STORE-CHECKLIST güncellendi |
| Cursor kuralları (.cursor/rules/) | ✅    | Oturum + mimari kuralları                                  |
| Monorepo (pnpm workspaces)        | ✅    | Node 22 + pnpm 11                                          |
| İzolasyon denetimi (ESLint)       | ✅    | Otomatik                                                   |
| Çekirdek değişiklik kapısı        | ✅    | Husky → verify; oturum sonu push zorunlu (SURECLER §2)     |
| 9 çekirdek paket                  | ✅    | 51 test yeşil; mock servisler                              |
| Şablon (apps/\_sablon)            | ✅    | Referans şablon                                            |
| **Pilot (apps/aliskanlik)**       | 🟡    | Kimlik + SPEC hazır; **tasarım brifi bekleniyor**          |
| Arşiv (apps/\_arsiv)              | ✅    | Workspace dışı                                             |

### Doğrulama (2026-06-11)

| Kontrol       | Sonuç                                           |
| ------------- | ----------------------------------------------- |
| `pnpm verify` | **Yeşil** — 51 test + 11 proje typecheck + lint |
| GitHub        | Push ile senkron                                |

## Pilot uygulama: Alışkanlık

| Alan           | Değer                                              |
| -------------- | -------------------------------------------------- |
| Klasör         | `apps/aliskanlik`                                  |
| Bundle ID      | `com.medyanes360.aliskanlik`                       |
| Pazar          | Türkiye öncelikli (TR varsayılan, EN hazır)        |
| İzin envanteri | Yalnızca bildirim (hatırlatma)                     |
| Durum          | SPEC + kimlik tamam → **tasarım brifi bekleniyor** |

Detay: `apps/aliskanlik/docs/SPEC.md`, `apps/aliskanlik/docs/STATUS.md`

## ANAYASA'ya göre henüz karşılanmayan / eksik kalanlar

| Konu                                  | Durum                       |
| ------------------------------------- | --------------------------- |
| Firebase / RevenueCat gerçek bağlantı | ⏳ Mock                     |
| Crashlytics paketi                    | ❌ Yok                      |
| EAS Build denemesi                    | ⏳ Hesap bekliyor           |
| Firestore güvenlik kuralları          | ❌ Firebase projesi gerekli |
| Alışkanlık MVP kodu                   | ⏳ Tasarım brifi sonrası    |
| Mağaza yayını                         | ❌ Henüz değil              |

## SENDEN BEKLEYENLER

### ACİL (pilot için)

- [ ] **Alışkanlık tasarım brifi cevapları** — bu oturumda sorular iletildi; yanıt beklemede.

### Fabrika geneli (acil değil)

- [ ] Firebase hesabı (`docs/STATUS-FACTORY.md` §1 tarif)
- [ ] RevenueCat hesabı (§2)
- [ ] Expo hesabı (§3)
- [ ] Apple / Google mağaza hesapları — yayın öncesi (Seviye 3)

## Aylık servis maliyetleri

| Servis | Maliyet |
| ------ | ------- |
| —      | 0$/ay   |

## Sıradaki adımlar

1. **Proje sahibi:** Tasarım brifi sorularını yanıtla.
2. **Agent:** 2–3 tema önerisi sun → onay → MVP geliştirmesi.
3. **Proje sahibi:** Firebase + RevenueCat hesapları (paralel, acil değil).

## Oturum geçmişi

- **2026-06-11 — Pilot + Anayasa §8.** ANAYASA izin/IAP politikası; SURECLER/STORE
  güncellemesi; `apps/aliskanlik` açıldı; push yapıldı.
- **2026-06-11 — Seviye 1 iyileştirmeler.** Karanlık mod, RNTL, Husky, Jest 29.
- **2026-06-11 — Kuruluş Denetim Oturumu.**
- **2026-06-11 — Kuruluş oturumu.**
