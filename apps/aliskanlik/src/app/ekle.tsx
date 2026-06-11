import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, useTema, useToast } from '@medyanes360/tasarim-sistemi';
import {
  ALISKANLIK_RENKLERI,
  AliskanlikFormSemasi,
  type Aliskanlik,
  type AliskanlikForm,
} from '../domain/aliskanlik';
import {
  aliskanlikDeposu,
  kimlik,
  logger,
  UcretsizAliskanlikLimitiSemasi,
  uzakAyar,
} from '../altyapi/istemciler';
import { usePaywallDurumu } from '../altyapi/store';

export default function AliskanlikEkle() {
  const { t } = useTranslation();
  const { renkler, tema } = useTema();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const paywallDurumu = usePaywallDurumu();

  const uid = kimlik.getCurrentUser()?.uid ?? null;

  const { data: mevcutSayi = 0 } = useQuery({
    queryKey: ['aliskanliklar', uid],
    enabled: uid !== null && aliskanlikDeposu !== null,
    queryFn: async (): Promise<Aliskanlik[]> => {
      if (uid === null || aliskanlikDeposu === null) return [];
      const sonuc = await aliskanlikDeposu.listele(uid);
      if (!sonuc.ok) throw sonuc.error;
      return sonuc.value;
    },
    select: (liste) => liste.length,
  });

  const { control, handleSubmit, watch, setValue } = useForm<AliskanlikForm>({
    resolver: zodResolver(AliskanlikFormSemasi),
    defaultValues: { ad: '', renk: ALISKANLIK_RENKLERI[0] },
  });

  const seciliRenk = watch('renk');

  const ekleMutasyon = useMutation({
    mutationFn: async (form: AliskanlikForm) => {
      if (uid === null || aliskanlikDeposu === null) {
        throw new Error('Oturum hazır değil');
      }
      const sonuc = await aliskanlikDeposu.ekle(uid, form);
      if (!sonuc.ok) throw sonuc.error;
      return sonuc.value;
    },
    onSuccess: (yeni) => {
      logger.log('habit_created', { id: yeni.id });
      void queryClient.invalidateQueries({ queryKey: ['aliskanliklar', uid] });
      toast.goster(t('ortak.tamam'), 'basari');
      router.replace('/home');
    },
    onError: (hata) => {
      logger.logError(hata, 'habit-create');
      toast.goster(t('ortak.hataOlustu'), 'hata');
    },
  });

  function kaydet(form: AliskanlikForm) {
    const limit = uzakAyar.getValue(
      'ucretsiz_aliskanlik_limiti',
      UcretsizAliskanlikLimitiSemasi,
      3,
    );
    if (!paywallDurumu.premium && mevcutSayi >= limit) {
      router.replace('/paywall');
      return;
    }
    ekleMutasyon.mutate(form);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: renkler.zemin }}>
      <View style={{ flex: 1, padding: tema.bosluk.md, gap: tema.bosluk.md }}>
        <Text
          style={{
            color: renkler.metin,
            fontSize: tema.tipografi.boyut.buyukBaslik,
            fontWeight: '800',
          }}
        >
          {t('aliskanlik.form.baslik')}
        </Text>

        <Card baslik={t('aliskanlik.form.adEtiket')}>
          <Controller
            control={control}
            name="ad"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View style={{ gap: tema.bosluk.xs }}>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={t('aliskanlik.form.adPlaceholder')}
                  placeholderTextColor={renkler.metinSoluk}
                  style={{
                    color: renkler.metin,
                    fontSize: tema.tipografi.boyut.govde,
                    borderWidth: 1,
                    borderColor: error !== undefined ? renkler.hata : renkler.kenarlik,
                    borderRadius: tema.kose.orta,
                    padding: tema.bosluk.sm,
                    backgroundColor: renkler.yuzey,
                  }}
                />
                {error?.message !== undefined && (
                  <Text style={{ color: renkler.hata, fontSize: tema.tipografi.boyut.kucuk }}>
                    {t(error.message)}
                  </Text>
                )}
              </View>
            )}
          />
        </Card>

        <Card baslik={t('aliskanlik.form.renkEtiket')}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tema.bosluk.sm }}>
            {ALISKANLIK_RENKLERI.map((renk) => (
              <Pressable
                key={renk}
                onPress={() => setValue('renk', renk, { shouldValidate: true })}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: tema.kose.tam,
                  backgroundColor: renk,
                  borderWidth: seciliRenk === renk ? 3 : 0,
                  borderColor: renkler.metin,
                }}
              />
            ))}
          </View>
        </Card>

        <View style={{ marginTop: 'auto', gap: tema.bosluk.sm }}>
          <Button
            baslik={t('ortak.kaydet')}
            yukleniyor={ekleMutasyon.isPending}
            onPress={() => void handleSubmit(kaydet)()}
          />
          <Button baslik={t('ortak.iptal')} varyant="ghost" onPress={() => router.back()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
