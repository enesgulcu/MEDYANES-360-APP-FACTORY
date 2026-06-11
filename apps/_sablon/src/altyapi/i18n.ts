import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { cihazDilindenSec, ORTAK_CEVIRILER, type DilKodu } from '@medyanes360/dil';
import appTr from '../ceviriler/tr.json';
import appEn from '../ceviriler/en.json';

type CeviriAgaci = { [anahtar: string]: string | CeviriAgaci };

/**
 * Ortak çevirilerle uygulama çevirilerini DERİN birleştirir.
 * Sığ birleştirme yetmez: ör. ortak "paywall.geriYukle" ile uygulamanın
 * "paywall.baslik" anahtarı aynı üst başlıkta buluşmak zorunda.
 */
function derinBirlestir(taban: CeviriAgaci, ek: CeviriAgaci): CeviriAgaci {
  const sonuc: CeviriAgaci = { ...taban };
  for (const [anahtar, deger] of Object.entries(ek)) {
    const mevcut = sonuc[anahtar];
    sonuc[anahtar] =
      typeof deger === 'object' && typeof mevcut === 'object'
        ? derinBirlestir(mevcut, deger)
        : deger;
  }
  return sonuc;
}

// Cihaz dili otomatik algılanır; kullanıcı ayarlardan değiştirebilir (prompt §10).
const baslangicDili: DilKodu = cihazDilindenSec(Localization.getLocales()[0]?.languageTag ?? 'en');

void i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: derinBirlestir(ORTAK_CEVIRILER.tr as CeviriAgaci, appTr) },
    en: { translation: derinBirlestir(ORTAK_CEVIRILER.en as CeviriAgaci, appEn) },
  },
  lng: baslangicDili,
  fallbackLng: 'en',
  interpolation: {
    // React zaten XSS koruması yapar; i18next'in ek kaçışına gerek yok.
    escapeValue: false,
  },
});

/** Dil değişimi anında tüm arayüze yansır (react-i18next yeniden çizer). */
export function dilDegistir(dil: DilKodu): void {
  void i18n.changeLanguage(dil);
}

export default i18n;
