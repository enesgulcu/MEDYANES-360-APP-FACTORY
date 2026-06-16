import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Skeleton, useTema, useToast } from '@medyanes360/tasarim-sistemi';
import { PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI } from '@medyanes360/uzak-ayar';
import { logger, odeme, paywall, uzakAyar } from '../altyapi/istemciler';
import { usePaywallDurumu } from '../altyapi/store';

/**
 * Örnek paywall: başlığı ve öne çıkan ürünü uzak-ayar'dan gelir,
 * ürün listesi TanStack Query ile çekilir (mock RevenueCat).
 * Abonelik şartları + geri yükleme butonu mağaza zorunluluğudur.
 */
export default function Paywall() {
  const { t } = useTranslation();
  const { renkler, tema } = useTema();
  const toast = useToast();
  const router = useRouter();
  const durum = usePaywallDurumu();

  const paywallAyari = uzakAyar.getValue('paywall', PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI);

  // Sunucu verisi cache standardı: TanStack Query (ANAYASA §2).
  const { data: urunler, isLoading } = useQuery({
    queryKey: ['urunler'],
    queryFn: async () => {
      logger.log('paywall_shown');
      const sonuc = await odeme.getProducts();
      if (!sonuc.ok) throw sonuc.error;
      return sonuc.value;
    },
  });

  async function satinAl(urunId: string) {
    logger.log('purchase_started', { urun: urunId });
    await paywall.satinAl(urunId);
    const son = paywall.getDurum();
    if (son.evre === 'tamamlandi') {
      logger.log('purchase_completed', { urun: urunId });
      toast.goster(t('ortak.tamam'), 'basari');
      router.replace('/home');
    } else if (son.hataMesaji !== null) {
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

        {/* Abonelik şartları paywall'da görünür OLMAK ZORUNDA (STORE-CHECKLIST §5) */}
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
          onPress={() => void paywall.geriYukle()}
        />
        <Button
          baslik={t('paywall.sonra')}
          testID="paywall-sonra"
          varyant="ghost"
          onPress={() => router.replace('/home')}
        />
      </View>
    </SafeAreaView>
  );
}
