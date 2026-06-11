import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, useTema } from '@medyanes360/tasarim-sistemi';
import { PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI } from '@medyanes360/uzak-ayar';
import { logger, uzakAyar } from '../altyapi/istemciler';
import { useUygulamaDurumu } from '../altyapi/store';

/**
 * Örnek onboarding: iki bilgilendirme adımı. Sonunda, uzak ayardan yönetilen
 * paywall AÇIKSA paywall'a, kapalıysa doğrudan ana sayfaya gidilir —
 * "paywall'ı yayın yapmadan aç/kapat" senaryosunun canlı örneği.
 */
export default function Onboarding() {
  const { t } = useTranslation();
  const { renkler, tema } = useTema();
  const router = useRouter();
  const onboardingiTamamla = useUygulamaDurumu((d) => d.onboardingiTamamla);
  const [adim, setAdim] = useState<1 | 2>(1);

  function bitir() {
    onboardingiTamamla();
    const paywallAyari = uzakAyar.getValue('paywall', PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI);
    router.replace(paywallAyari.aktif ? '/paywall' : '/home');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: renkler.zemin }}>
      <View
        style={{ flex: 1, justifyContent: 'center', padding: tema.bosluk.xl, gap: tema.bosluk.md }}
      >
        <Text
          style={{
            color: renkler.metin,
            fontSize: tema.tipografi.boyut.buyukBaslik,
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          {t(adim === 1 ? 'onboarding.adim1Baslik' : 'onboarding.adim2Baslik')}
        </Text>
        <Text
          style={{
            color: renkler.metinSoluk,
            fontSize: tema.tipografi.boyut.govde,
            textAlign: 'center',
          }}
        >
          {t(adim === 1 ? 'onboarding.adim1Aciklama' : 'onboarding.adim2Aciklama')}
        </Text>
      </View>
      <View style={{ padding: tema.bosluk.lg, gap: tema.bosluk.sm }}>
        {adim === 1 ? (
          <Button
            baslik={t('ortak.devam')}
            onPress={() => {
              logger.log('screen_view', { ekran: 'onboarding_adim2' });
              setAdim(2);
            }}
          />
        ) : (
          <Button baslik={t('onboarding.basla')} onPress={bitir} />
        )}
      </View>
    </SafeAreaView>
  );
}
