# Firestore güvenlik kuralları — Alışkanlık

> Firebase Console → Firestore → **Rules** sekmesine yapıştır → **Publish**.

Production modda varsayılan kural **her şeyi reddeder**. Uygulama çalışması için
aşağıdaki kurallar **zorunludur** (tek seferlik, ~2 dk).

## Kurallar

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcı yalnızca kendi alışkanlıklarına erişir (anonim giriş dahil).
    match /users/{userId}/habits/{habitId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Ne anlama geliyor?

- Giriş yapmamış biri → hiçbir veri okuyamaz/yazamaz.
- Giriş yapmış kullanıcı → yalnızca `users/KENDİ_UID/habits/...` yoluna erişir.
- Başka kullanıcının verisi → erişilemez.

## Doğrulama

Kuralları yayınladıktan sonra uygulamada:

1. Onboarding → ana sayfa
2. **Alışkanlık ekle** → kaydet
3. Listede görünüyorsa kurallar doğru demektir.

Hata alırsan (`permission-denied`): kuralları tekrar kontrol et veya bana yaz.
