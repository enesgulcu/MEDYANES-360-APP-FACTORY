import '../global.css';
import '../altyapi/i18n'; // i18next başlatma (yan etkili import — bir kez koşar)

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TemaSaglayici, ToastSaglayici } from '@medyanes360/tasarim-sistemi';
import { kimlik, logger, paywall, uzakAyar } from '../altyapi/istemciler';
import { uygulamaTemasi } from '../altyapi/tema';

const queryClient = new QueryClient();

export default function KokYerlesim() {
  // Uygulama açılış zinciri: anonim giriş → kimliği loglamaya bağla →
  // app_open olayı → uzak ayarları tazele → abonelik durumunu tazele.
  useEffect(() => {
    void (async () => {
      const giris = await kimlik.signInAnonymously();
      if (giris.ok) {
        logger.setUserId(giris.value.uid);
      } else {
        logger.logError(giris.error, 'anonim-giris');
      }
      logger.log('app_open');
      await uzakAyar.refresh();
      await paywall.durumuYenile();
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TemaSaglayici tema={uygulamaTemasi}>
        <ToastSaglayici>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }} />
        </ToastSaglayici>
      </TemaSaglayici>
    </QueryClientProvider>
  );
}
