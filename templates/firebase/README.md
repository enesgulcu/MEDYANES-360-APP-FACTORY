# Firebase Kurulum Şablonu

> Her uygulama için ayrı Firebase projesi açılır. Bu klasör referans dosyaları içerir.

## Adımlar (proje sahibi + agent)

1. Firebase Console → yeni proje.
2. iOS uygulaması ekle → bundle ID: `com.medyanes360.<uygulamaadi>`.
3. Android uygulaması ekle → package: aynı.
4. `google-services.json` ve `GoogleService-Info.plist` indir → `apps/<uygulama>/` (git dışı).
5. Auth, Firestore, Analytics, Remote Config, Messaging, Crashlytics etkinleştir.
6. `firestore.rules` dosyasını bu şablondan kopyala ve deploy et:
   ```bash
   firebase deploy --only firestore:rules
   ```
7. Uygulamada `.env`:
   ```
   EXPO_PUBLIC_SERVIS_MODU=canli
   ```

## Güvenlik

- Kurallar **varsayılan kapalı** başlar (`templates/firestore.rules`).
- API anahtarları `.env` + EAS secrets; koda gömülmez.
