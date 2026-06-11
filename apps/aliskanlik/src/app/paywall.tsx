import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { PAYWALL_RESULT, gosterRevenueCatPaywall } from '@medyanes360/odeme';
import { Button, Card, Skeleton, useTema, useToast } from '@medyanes360/tasarim-sistemi';
import { PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI } from '@medyanes360/uzak-ayar';
import { logger, odeme, paywall, REVENUECAT_AKTIF, uzakAyar } from '../altyapi/istemciler';
import { usePaywallDurumu } from '../altyapi/store';

/**
 * Paywall ekranı: RC dashboard paywall (native) + fabrika yedek UI (mock / web).
 * Abonelik şartları + geri yükleme mağaza zorunluluğudur.
 */
export default function Paywall() {
  const { t } = useTranslation();
  const { renkler, tema } = useTema();
  const toast = useToast();
  const router = useRouter();
  const durum = usePaywallDurumu();

  const paywallAyari = uzakAyar.getValue('paywall', PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI);

  const { data: urunler, isLoading } = useQuery({
    queryKey: ['urunler'],
    queryFn: async () => {
      logger.log('paywall_shown');
      const sonuc = await odeme.getProducts();
      if (!sonuc.ok) throw sonuc.error;
      return sonuc.value;
    },
  });

  async function rcPaywallAc() {
    logger.log('rc_paywall_acildi');
    const sonuc = await gosterRevenueCatPaywall();
    if (!sonuc.ok) {
      logger.logError(sonuc.error, 'rc-paywall');
      toast.goster(t('ortak.hataOlustu'), 'hata');
      return;
    }

    await paywall.durumuYenile();
    const premium = paywall.getDurum().premium;

    if (
      sonuc.value === PAYWALL_RESULT.PURCHASED ||
      sonuc.value === PAYWALL_RESULT.RESTORED ||
      premium
    ) {
      logger.log('purchase_completed', { kaynak: 'rc-paywall', sonuc: sonuc.value });
      toast.goster(t('ortak.tamam'), 'basari');
      router.replace('/home');
    }
  }

  async function satinAl(urunId: string) {
    logger.log('purchase_started', { urun: urunId });
    await paywall.satinAl(urunId);
    const son = paywall.getDurum();
    if (son.evre === 'tamamlandi') {
      logger.log('purchase_completed', { urun: urunId });
      toast.goster(t('ortak.tamam'), 'basari');
      router.replace('/home');
    } else if (son.hataMesaji !== null && son.hataMesaji !== 'PURCHASE_CANCELLED') {
      toast.goster(t('ortak.hataOlustu'), 'hata');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: renkler.zemin }}>
      <View
        style={{ flex: 1, padding: tema.bosluk.lg, gap: tema.bosluk.md, justifyContent: 'center' }}
      >
        <Text
          style={{
            color: renkler.metin,
            fontSize: tema.tipografi.boyut.buyukBaslik,
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          {t(paywallAyari.baslikAnahtari)}
        </Text>
        <Text
          style={{
            color: renkler.metinSoluk,
            textAlign: 'center',
            fontSize: tema.tipografi.boyut.govde,
          }}
        >
          {t('paywall.altBaslik')}
        </Text>

        {REVENUECAT_AKTIF && (
          <Button
            baslik={t('paywall.rcPaywallAc')}
            varyant="primary"
            onPress={() => void rcPaywallAc()}
          />
        )}

        {isLoading || urunler === undefined ? (
          <View style={{ gap: tema.bosluk.sm }}>
            <Skeleton yukseklik={96} />
            <Skeleton yukseklik={96} />
          </View>
        ) : (
          urunler.map((urun) => (
            <Card
              key={urun.id}
              baslik={`${t(urun.periyot === 'yillik' ? 'paywall.yillik' : 'paywall.aylik')} — ${urun.fiyatMetni}`}
              aksiyon={
                <Button
                  baslik={t('paywall.satinAl')}
                  varyant={urun.id === paywallAyari.oneCikanUrun ? 'primary' : 'secondary'}
                  yukleniyor={durum.evre === 'satin-aliniyor'}
                  onPress={() => void satinAl(urun.id)}
                />
              }
            >
              {urun.id === paywallAyari.oneCikanUrun && (
                <Text style={{ color: renkler.basari, fontSize: tema.tipografi.boyut.kucuk }}>
                  {t('paywall.kampanya')}
                </Text>
              )}
            </Card>
          ))
        )}

        <Text
          style={{
            color: renkler.metinSoluk,
            fontSize: tema.tipografi.boyut.kucuk,
            textAlign: 'center',
          }}
        >
          {t('paywall.otomatikYenileme')}
        </Text>
        <Button
          baslik={t('paywall.geriYukle')}
          varyant="ghost"
          yukleniyor={durum.evre === 'satin-aliniyor'}
          onPress={() => void paywall.geriYukle()}
        />
        <Button
          baslik={t('paywall.sonra')}
          varyant="ghost"
          onPress={() => router.replace('/home')}
        />
      </View>
    </SafeAreaView>
  );
}
