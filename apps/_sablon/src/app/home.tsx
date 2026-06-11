import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Inbox } from 'lucide-react-native';
import { Button, Card, EmptyState, Liste, useTema } from '@medyanes360/tasarim-sistemi';
import { usePaywallDurumu } from '../altyapi/store';

/**
 * Örnek ana sayfa: tasarım sistemi bileşenlerinin vitrini.
 * Yeni uygulamada bu ekran silinir, gerçek içerikle değiştirilir.
 */
export default function AnaSayfa() {
  const { t } = useTranslation();
  const { renkler, tema } = useTema();
  const router = useRouter();
  const paywallDurumu = usePaywallDurumu();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: renkler.zemin }}>
      <View style={{ flex: 1, padding: tema.bosluk.md, gap: tema.bosluk.md }}>
        <Card baslik={t('home.hosgeldin')}>
          <Text style={{ color: renkler.metinSoluk, fontSize: tema.tipografi.boyut.govde }}>
            {t('home.aciklama')}
          </Text>
          {paywallDurumu.premium && (
            <Text style={{ color: renkler.basari, fontSize: tema.tipografi.boyut.kucuk }}>
              Premium ✓
            </Text>
          )}
        </Card>

        {/* Boş liste asla boş beyazlık olarak bırakılmaz (TASARIM.md §2) */}
        <Liste
          veriler={[]}
          renderItem={() => null}
          anahtarCikar={(_, i) => String(i)}
          bosDurum={
            <EmptyState
              baslik={t('home.bosListeBaslik')}
              aciklama={t('home.bosListeAciklama')}
              ikon={<Inbox color={renkler.metinSoluk} size={48} />}
            />
          }
        />

        <Button
          baslik={t('home.ayarlaraGit')}
          varyant="secondary"
          onPress={() => router.push('/ayarlar')}
        />
      </View>
    </SafeAreaView>
  );
}
