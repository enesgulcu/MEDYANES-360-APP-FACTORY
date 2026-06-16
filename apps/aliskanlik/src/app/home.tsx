import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Target } from 'lucide-react-native';
import { Button, EmptyState, Liste, useTema, useToast } from '@medyanes360/tasarim-sistemi';
import { AliskanlikSatiri } from '../bilesenler/AliskanlikSatiri';
import {
  aliskanlikDeposu,
  kimlik,
  logger,
  UcretsizAliskanlikLimitiSemasi,
  uzakAyar,
} from '../altyapi/istemciler';
import { usePaywallDurumu } from '../altyapi/store';

export default function AnaSayfa() {
  const { t } = useTranslation();
  const { renkler, tema } = useTema();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const paywallDurumu = usePaywallDurumu();

  const kullanici = kimlik.getCurrentUser();
  const uid = kullanici?.uid ?? null;

  const limit = uzakAyar.getValue('ucretsiz_aliskanlik_limiti', UcretsizAliskanlikLimitiSemasi, 3);

  const { data: aliskanliklar = [], isLoading } = useQuery({
    queryKey: ['aliskanliklar', uid],
    enabled: uid !== null && aliskanlikDeposu !== null,
    queryFn: async () => {
      if (uid === null || aliskanlikDeposu === null) return [];
      const sonuc = await aliskanlikDeposu.listele(uid);
      if (!sonuc.ok) throw sonuc.error;
      return sonuc.value;
    },
  });

  const toggleMutasyon = useMutation({
    mutationFn: async (aliskanlikId: string) => {
      if (uid === null || aliskanlikDeposu === null) {
        throw new Error('Oturum hazır değil');
      }
      const hedef = aliskanliklar.find((a) => a.id === aliskanlikId);
      if (hedef === undefined) throw new Error('Alışkanlık bulunamadı');
      const sonuc = await aliskanlikDeposu.bugunToggle(uid, hedef);
      if (!sonuc.ok) throw sonuc.error;
      return sonuc.value;
    },
    onSuccess: (guncel) => {
      logger.log('habit_toggled', { id: guncel.id });
      void queryClient.invalidateQueries({ queryKey: ['aliskanliklar', uid] });
    },
    onError: (hata) => {
      logger.logError(hata, 'habit-toggle');
      toast.goster(t('ortak.hataOlustu'), 'hata');
    },
  });

  function ekleBasildi() {
    if (!paywallDurumu.premium && aliskanliklar.length >= limit) {
      logger.log('paywall_limit', { limit });
      router.push('/paywall');
      return;
    }
    router.push('/ekle' as Href);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: renkler.zemin }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: tema.bosluk.md,
            paddingTop: tema.bosluk.md,
            gap: tema.bosluk.xs,
          }}
        >
          <Text
            style={{
              color: renkler.metin,
              fontSize: tema.tipografi.boyut.buyukBaslik,
              fontWeight: '800',
            }}
          >
            {t('home.baslik')}
          </Text>
          {!paywallDurumu.premium && (
            <Text style={{ color: renkler.metinSoluk, fontSize: tema.tipografi.boyut.kucuk }}>
              {t('home.limitBilgi', { limit, mevcut: aliskanliklar.length })}
            </Text>
          )}
        </View>

        <Liste
          veriler={aliskanliklar}
          anahtarCikar={(oge) => oge.id}
          renderItem={({ item }) => (
            <AliskanlikSatiri
              aliskanlik={item}
              yukleniyor={toggleMutasyon.isPending && toggleMutasyon.variables === item.id}
              seriEtiketi={t('home.seriGun')}
              onToggle={() => toggleMutasyon.mutate(item.id)}
            />
          )}
          bosDurum={
            isLoading ? (
              <Text style={{ color: renkler.metinSoluk, textAlign: 'center' }}>
                {t('ortak.yukleniyor')}
              </Text>
            ) : (
              <EmptyState
                baslik={t('home.bosListeBaslik')}
                aciklama={t('home.bosListeAciklama')}
                ikon={<Target color={renkler.metinSoluk} size={48} />}
              />
            )
          }
        />

        <View style={{ padding: tema.bosluk.md, gap: tema.bosluk.sm }}>
          <Button
            baslik={t('home.aliskanlikEkle')}
            varyant="primary"
            testID="home-ekle"
            onPress={ekleBasildi}
          />
          <Button
            baslik={t('home.ayarlaraGit')}
            varyant="secondary"
            testID="home-ayarlar"
            onPress={() => router.push('/ayarlar')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
