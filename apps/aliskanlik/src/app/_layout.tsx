import '../global.css';
import '../altyapi/i18n'; // i18next başlatma (yan etkili import — bir kez koşar)

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  revenueCatDurumDinleyici,
  revenueCatKullaniciEslestir,
  yapilandirRevenueCat,
} from '@medyanes360/odeme';
import { TemaSaglayici, ToastSaglayici } from '@medyanes360/tasarim-sistemi';
import {
  kimlik,
  logger,
  paywall,
  REVENUECAT_ENTITLEMENT_ID,
  REVENUECAT_SDK_AKTIF,
  uzakAyar,
} from '../altyapi/istemciler';
import {
  REVENUECAT_ANDROID_API_KEY,
  REVENUECAT_IOS_API_KEY,
} from '../altyapi/revenuecat-yapilandirma';
import { useUygulamaDurumu } from '../altyapi/store';
import { uygulamaTemasi } from '../altyapi/tema';

const queryClient = new QueryClient();

export default function KokYerlesim() {
  const temaModu = useUygulamaDurumu((d) => d.temaModu);
  // Uygulama açılış zinciri: RC yapılandır → anonim giriş → RC kullanıcı eşle →
  // app_open → uzak ayar → abonelik durumu tazele.
  useEffect(() => {
    void (async () => {
      if (REVENUECAT_SDK_AKTIF) {
        const rcYapilandir = await yapilandirRevenueCat({
          iosApiKey: REVENUECAT_IOS_API_KEY,
          androidApiKey: REVENUECAT_ANDROID_API_KEY,
          debug: __DEV__,
        });
        if (!rcYapilandir.ok) {
          logger.logError(rcYapilandir.error, 'revenuecat-yapilandir');
        }
      }

      const giris = await kimlik.signInAnonymously();
      if (giris.ok) {
        logger.setUserId(giris.value.uid);
        if (REVENUECAT_SDK_AKTIF) {
          const eslestir = await revenueCatKullaniciEslestir(giris.value.uid);
          if (!eslestir.ok) {
            logger.logError(eslestir.error, 'revenuecat-eslestir');
          }
        }
      } else {
        logger.logError(giris.error, 'anonim-giris');
      }

      logger.log('app_open');
      try {
        await uzakAyar.refresh();
      } catch (hata) {
        logger.logError(
          hata instanceof Error ? hata : new Error(String(hata)),
          'uzak-ayar-refresh',
        );
      }
      await paywall.durumuYenile();
    })();
  }, []);

  // RC müşteri bilgisi değişince (yenileme, iptal, restore) premium durumunu güncelle.
  useEffect(() => {
    if (!REVENUECAT_SDK_AKTIF) return undefined;

    return revenueCatDurumDinleyici(REVENUECAT_ENTITLEMENT_ID, (abonelik) => {
      void paywall.durumuYenile();
      if (abonelik.premium) {
        logger.log('premium_aktif');
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TemaSaglayici tema={uygulamaTemasi} mod={temaModu}>
        <ToastSaglayici>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }} />
        </ToastSaglayici>
      </TemaSaglayici>
    </QueryClientProvider>
  );
}
