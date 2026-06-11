import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Animated, Text } from 'react-native';
import { useTema } from './TemaSaglayici';

export type ToastTuru = 'basari' | 'hata' | 'bilgi';

interface ToastBaglami {
  /** Kısa bilgilendirme mesajı gösterir; birkaç saniye sonra kendiliğinden kaybolur. */
  goster(mesaj: string, tur?: ToastTuru): void;
}

const Baglam = createContext<ToastBaglami>({
  goster() {
    // Sağlayıcı olmadan çağrılırsa görünür uyarı verilir; sessiz yutulmaz.
    console.warn('[tasarim-sistemi] ToastSaglayici bulunamadı; mesaj gösterilemedi.');
  },
});

export function useToast(): ToastBaglami {
  return useContext(Baglam);
}

const GOSTERIM_SURESI_MS = 3000;

export function ToastSaglayici({ children }: { children: ReactNode }) {
  const { renkler, tema } = useTema();
  const [mesaj, setMesaj] = useState<{ metin: string; tur: ToastTuru } | null>(null);
  const opaklik = useRef(new Animated.Value(0)).current;
  const zamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goster = useCallback(
    (metin: string, tur: ToastTuru = 'bilgi') => {
      setMesaj({ metin, tur });
      Animated.timing(opaklik, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      if (zamanlayici.current) clearTimeout(zamanlayici.current);
      zamanlayici.current = setTimeout(() => {
        Animated.timing(opaklik, { toValue: 0, duration: 200, useNativeDriver: true }).start(() =>
          setMesaj(null),
        );
      }, GOSTERIM_SURESI_MS);
    },
    [opaklik],
  );

  // Bileşen kaldırılırken bekleyen zamanlayıcı temizlenir (bellek sızıntısı önlemi).
  useEffect(() => {
    return () => {
      if (zamanlayici.current) clearTimeout(zamanlayici.current);
    };
  }, []);

  const arkaplan: Record<ToastTuru, string> = {
    basari: renkler.basari,
    hata: renkler.hata,
    bilgi: renkler.metin,
  };

  return (
    <Baglam.Provider value={{ goster }}>
      {children}
      {mesaj !== null && (
        <Animated.View
          accessibilityLiveRegion="polite"
          style={{
            position: 'absolute',
            top: tema.bosluk.xl,
            left: tema.bosluk.md,
            right: tema.bosluk.md,
            backgroundColor: arkaplan[mesaj.tur],
            borderRadius: tema.kose.orta,
            padding: tema.bosluk.md,
            opacity: opaklik,
          }}
        >
          <Text
            style={{
              color: renkler.birincilUstu,
              fontSize: tema.tipografi.boyut.govde,
              textAlign: 'center',
            }}
          >
            {mesaj.metin}
          </Text>
        </Animated.View>
      )}
    </Baglam.Provider>
  );
}
