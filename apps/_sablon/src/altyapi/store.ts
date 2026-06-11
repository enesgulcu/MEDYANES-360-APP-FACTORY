import { create } from 'zustand';
import { useSyncExternalStore } from 'react';
import type { PaywallDurumu } from '@medyanes360/odeme';
import { paywall } from './istemciler';

/**
 * Uygulama durumu (Zustand). Şablonda yalnızca onboarding bayrağı var;
 * yeni uygulamalar kendi alanlarını buraya ekler.
 * NOT: Kalıcılık (persist) bilinçli olarak eklenmedi — uygulamaya göre
 * AsyncStorage/MMKV tercihi Seviye 1 karar olarak verilecek.
 */
interface UygulamaDurumu {
  onboardingTamam: boolean;
  onboardingiTamamla: () => void;
}

export const useUygulamaDurumu = create<UygulamaDurumu>((set) => ({
  onboardingTamam: false,
  onboardingiTamamla: () => set({ onboardingTamam: true }),
}));

/**
 * PaywallYoneticisi (saf TS sınıfı) React'e bu köprüyle bağlanır:
 * useSyncExternalStore aboneliği yönetir, durum değişince bileşen yeniden çizilir.
 */
export function usePaywallDurumu(): PaywallDurumu {
  return useSyncExternalStore(
    (dinleyici) => paywall.subscribe(dinleyici),
    () => paywall.getDurum(),
    () => paywall.getDurum(),
  );
}
