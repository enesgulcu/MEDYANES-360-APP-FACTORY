import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import {
  Button,
  Card,
  Modal,
  useTema,
  useToast,
  type TemaModu,
} from '@medyanes360/tasarim-sistemi';
import { DESTEKLENEN_DILLER, type DilKodu } from '@medyanes360/dil';
import { gosterMusteriMerkezi } from '@medyanes360/odeme';
import { dilDegistir } from '../altyapi/i18n';
import {
  aliskanlikDeposu,
  kimlik,
  logger,
  paywall,
  REVENUECAT_AKTIF,
  REVENUECAT_SDK_AKTIF,
} from '../altyapi/istemciler';
import { usePaywallDurumu, useUygulamaDurumu } from '../altyapi/store';

// Yer tutucu: her uygulama yayına çıkmadan kendi gizlilik politikası
// URL'ini koyar (STORE-CHECKLIST §1 — zorunlu).
const GIZLILIK_POLITIKASI_URL = 'https://medyanes360.example.com/gizlilik';

const DIL_ETIKETLERI: Record<DilKodu, string> = { tr: 'Türkçe', en: 'English' };

/** Ayarlardaki tema seçenekleri — etiketler çeviri dosyasından gelir. */
const TEMA_SECENEKLERI: TemaModu[] = ['sistem', 'light', 'dark'];
const TEMA_CEVIRI_ANAHTARLARI: Record<TemaModu, string> = {
  sistem: 'ayarlar.temaSistem',
  light: 'ayarlar.temaAcik',
  dark: 'ayarlar.temaKoyu',
};

/**
 * Ayarlar ekranı (şablon zorunlulukları, prompt §11):
 * dil seçimi + gizlilik politikası linki + hesap/veri silme talebi.
 */
export default function Ayarlar() {
  const { t, i18n } = useTranslation();
  const { renkler, tema } = useTema();
  const toast = useToast();
  const router = useRouter();
  const temaModu = useUygulamaDurumu((d) => d.temaModu);
  const temaModuAyarla = useUygulamaDurumu((d) => d.temaModuAyarla);
  const paywallDurumu = usePaywallDurumu();
  const [silmeOnayiAcik, setSilmeOnayiAcik] = useState(false);
  const [siliniyor, setSiliniyor] = useState(false);
  const [musteriMerkeziAciliyor, setMusteriMerkeziAciliyor] = useState(false);

  async function abonelikYonet() {
    setMusteriMerkeziAciliyor(true);
    const sonuc = await gosterMusteriMerkezi();
    setMusteriMerkeziAciliyor(false);
    if (!sonuc.ok) {
      logger.logError(sonuc.error, 'musteri-merkezi');
      toast.goster(t('ortak.hataOlustu'), 'hata');
      return;
    }
    await paywall.durumuYenile();
  }

  // Apple zorunluluğu: hesap/veri silme uygulama İÇİNDEN erişilebilir olmalı.
  async function hesabiSil() {
    setSiliniyor(true);
    const uid = kimlik.getCurrentUser()?.uid;
    if (uid != null && aliskanlikDeposu !== null) {
      const veriSil = await aliskanlikDeposu.tumunuSil(uid);
      if (!veriSil.ok) {
        logger.logError(veriSil.error, 'habit-delete-all');
      }
    }
    const sonuc = await kimlik.deleteAccount();
    setSiliniyor(false);
    setSilmeOnayiAcik(false);
    if (sonuc.ok) {
      toast.goster(t('ortak.tamam'), 'basari');
      router.replace('/onboarding');
    } else {
      logger.logError(sonuc.error, 'hesap-silme');
      toast.goster(t('ortak.hataOlustu'), 'hata');
    }
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
          {t('ayarlar.baslik')}
        </Text>

        <Card baslik={t('ayarlar.dil')}>
          <View style={{ flexDirection: 'row', gap: tema.bosluk.sm }}>
            {DESTEKLENEN_DILLER.map((dil) => (
              <Button
                key={dil}
                baslik={DIL_ETIKETLERI[dil]}
                varyant={i18n.language === dil ? 'primary' : 'secondary'}
                onPress={() => dilDegistir(dil)}
                style={{ flex: 1 }}
              />
            ))}
          </View>
        </Card>

        <Card baslik={t('ayarlar.karanlikMod')}>
          <View style={{ flexDirection: 'row', gap: tema.bosluk.sm }}>
            {TEMA_SECENEKLERI.map((secenek) => (
              <Button
                key={secenek}
                baslik={t(TEMA_CEVIRI_ANAHTARLARI[secenek])}
                varyant={temaModu === secenek ? 'primary' : 'secondary'}
                onPress={() => temaModuAyarla(secenek)}
                style={{ flex: 1 }}
              />
            ))}
          </View>
        </Card>

        {REVENUECAT_AKTIF && (
          <Card baslik={t('ayarlar.abonelik')}>
            {paywallDurumu.premium && (
              <Text
                style={{
                  color: renkler.basari,
                  fontSize: tema.tipografi.boyut.kucuk,
                  marginBottom: tema.bosluk.sm,
                }}
              >
                {t('ayarlar.premiumAktif')}
              </Text>
            )}
            {REVENUECAT_SDK_AKTIF && (
              <Button
                baslik={t('ayarlar.abonelikYonet')}
                varyant="secondary"
                yukleniyor={musteriMerkeziAciliyor}
                onPress={() => void abonelikYonet()}
              />
            )}
          </Card>
        )}

        <Card>
          <Button
            baslik={t('ayarlar.gizlilikPolitikasi')}
            varyant="ghost"
            onPress={() => void WebBrowser.openBrowserAsync(GIZLILIK_POLITIKASI_URL)}
          />
          <Button
            baslik={t('ayarlar.hesapSil')}
            varyant="destructive"
            onPress={() => setSilmeOnayiAcik(true)}
          />
        </Card>

        <Button baslik={t('ortak.geri')} varyant="ghost" onPress={() => router.back()} />
      </View>

      <Modal acik={silmeOnayiAcik} onKapat={() => setSilmeOnayiAcik(false)}>
        <Text style={{ color: renkler.metin, fontSize: tema.tipografi.boyut.govde }}>
          {t('ayarlar.hesapSilOnay')}
        </Text>
        <Button
          baslik={t('ayarlar.hesapSil')}
          varyant="destructive"
          yukleniyor={siliniyor}
          onPress={() => void hesabiSil()}
        />
        <Button
          baslik={t('ortak.iptal')}
          varyant="ghost"
          onPress={() => setSilmeOnayiAcik(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}
