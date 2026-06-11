import { createContext, useContext, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { VARSAYILAN_TEMA, type RenkPaleti, type Tema } from '../tema';

/**
 * Tema bağlamı: bileşenler renk/boşluk/tipografi değerlerini buradan okur.
 * `renkler` alanı aktif moda (açık/koyu) göre ÇÖZÜLMÜŞ paleti taşır;
 * bileşenlerin mod kontrolü yapmasına gerek kalmaz.
 */
export interface TemaBaglami {
  tema: Tema;
  mod: 'light' | 'dark';
  renkler: RenkPaleti;
}

const Baglam = createContext<TemaBaglami>({
  tema: VARSAYILAN_TEMA,
  mod: 'light',
  renkler: VARSAYILAN_TEMA.renkler.light,
});

export interface TemaSaglayiciProps {
  /** Uygulamanın createTheme ile ürettiği teması. */
  tema: Tema;
  /** 'sistem' (varsayılan): cihaz ayarını izler. Kullanıcı ayarı ile ezilebilir. */
  mod?: 'light' | 'dark' | 'sistem';
  children: ReactNode;
}

export function TemaSaglayici({ tema, mod = 'sistem', children }: TemaSaglayiciProps) {
  const sistemModu = useColorScheme();
  // Karanlık mod baştan: kullanıcı seçimi > cihaz ayarı > açık mod (TASARIM.md §3)
  // Cihaz 'unspecified' dönebilir; bilinmeyen her durumda açık moda düşülür.
  const etkinMod: 'light' | 'dark' =
    mod !== 'sistem' ? mod : sistemModu === 'dark' ? 'dark' : 'light';

  return (
    <Baglam.Provider value={{ tema, mod: etkinMod, renkler: tema.renkler[etkinMod] }}>
      {children}
    </Baglam.Provider>
  );
}

/** Bileşenlerin tema token'larına erişim kapısı. */
export function useTema(): TemaBaglami {
  return useContext(Baglam);
}
