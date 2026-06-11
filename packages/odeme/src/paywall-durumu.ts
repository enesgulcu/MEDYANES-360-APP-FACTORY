import type { AbonelikDurumu, OdemeIstemcisi } from './client';

/**
 * Paywall durum yönetimi — bilinçli olarak FRAMEWORK'SÜZ yazıldı (saf TS).
 * Neden: Zustand store'u React'e bağımlıdır; bu sınıf ise hem Zustand
 * store'unun içinde hem birim testlerinde kullanılabilir. Şablon uygulama
 * bunu küçük bir Zustand store'una sarar (apps/_sablon içinde).
 */
export type PaywallEvre =
  | 'kapali' // paywall görünmüyor
  | 'gosteriliyor' // kullanıcı paywall'a bakıyor
  | 'satin-aliniyor' // mağaza diyaloğu açık, işlem sürüyor
  | 'tamamlandi' // satın alma başarılı
  | 'hata'; // işlem başarısız (mesajı ayrıca taşınır)

export interface PaywallDurumu {
  evre: PaywallEvre;
  premium: boolean;
  hataMesaji: string | null;
}

export class PaywallYoneticisi {
  private durum: PaywallDurumu = { evre: 'kapali', premium: false, hataMesaji: null };
  private dinleyiciler = new Set<(durum: PaywallDurumu) => void>();

  constructor(private readonly odeme: OdemeIstemcisi) {}

  getDurum(): PaywallDurumu {
    return this.durum;
  }

  subscribe(dinleyici: (durum: PaywallDurumu) => void): () => void {
    this.dinleyiciler.add(dinleyici);
    return () => this.dinleyiciler.delete(dinleyici);
  }

  private guncelle(yeni: Partial<PaywallDurumu>) {
    this.durum = { ...this.durum, ...yeni };
    for (const dinleyici of this.dinleyiciler) dinleyici(this.durum);
  }

  /** Uygulama açılışında abonelik durumunu tazeler. */
  async durumuYenile(): Promise<void> {
    const sonuc = await this.odeme.getStatus();
    if (sonuc.ok) this.guncelle({ premium: sonuc.value.premium });
    // Hata durumunda premium FALSE'a düşürülmez: ağ hatası kullanıcının
    // satın aldığı erişimi elinden almamalı (son bilinen durum korunur).
  }

  paywallGoster(): void {
    this.guncelle({ evre: 'gosteriliyor', hataMesaji: null });
  }

  paywallKapat(): void {
    this.guncelle({ evre: 'kapali', hataMesaji: null });
  }

  async satinAl(urunId: string): Promise<void> {
    this.guncelle({ evre: 'satin-aliniyor', hataMesaji: null });
    const sonuc = await this.odeme.purchase(urunId);
    if (sonuc.ok) {
      this.uygula(sonuc.value, 'tamamlandi');
    } else if (sonuc.error.message === 'PURCHASE_CANCELLED') {
      // Kullanıcı mağaza diyaloğunu kapattı — hata sayılmaz.
      this.guncelle({ evre: 'gosteriliyor', hataMesaji: null });
    } else {
      this.guncelle({ evre: 'hata', hataMesaji: sonuc.error.message });
    }
  }

  async geriYukle(): Promise<void> {
    const sonuc = await this.odeme.restorePurchases();
    if (sonuc.ok) {
      this.uygula(sonuc.value, sonuc.value.premium ? 'tamamlandi' : 'gosteriliyor');
    } else {
      this.guncelle({ evre: 'hata', hataMesaji: sonuc.error.message });
    }
  }

  private uygula(abonelik: AbonelikDurumu, evre: PaywallEvre) {
    this.guncelle({ premium: abonelik.premium, evre });
  }
}
