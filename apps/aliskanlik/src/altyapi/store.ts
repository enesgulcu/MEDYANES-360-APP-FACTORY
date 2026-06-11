import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useSyncExternalStore } from 'react';
import type { PaywallDurumu } from '@medyanes360/odeme';
import type { TemaModu } from '@medyanes360/tasarim-sistemi';
import { paywall } from './istemciler';

/** v3 API — default export legacy modda Expo Go'da çalışmaz. */
const uygulamaDeposu = createAsyncStorage('aliskanlik-uygulama');

interface UygulamaDurumu {
  onboardingTamam: boolean;
  onboardingiTamamla: () => void;
  temaModu: TemaModu;
  temaModuAyarla: (mod: TemaModu) => void;
}

export const useUygulamaDurumu = create<UygulamaDurumu>()(
  persist(
    (set) => ({
      onboardingTamam: false,
      onboardingiTamamla: () => set({ onboardingTamam: true }),
      temaModu: 'sistem',
      temaModuAyarla: (mod) => set({ temaModu: mod }),
    }),
    {
      name: 'aliskanlik-uygulama-durumu',
      storage: createJSONStorage(() => uygulamaDeposu),
      partialize: (durum) => ({
        onboardingTamam: durum.onboardingTamam,
        temaModu: durum.temaModu,
      }),
    },
  ),
);

export function usePaywallDurumu(): PaywallDurumu {
  return useSyncExternalStore(
    (dinleyici) => paywall.subscribe(dinleyici),
    () => paywall.getDurum(),
    () => paywall.getDurum(),
  );
}
