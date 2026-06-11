import { useEffect, useRef } from 'react';
import { Animated, type DimensionValue } from 'react-native';
import { useTema } from './TemaSaglayici';

export interface SkeletonProps {
  /** Esnek ölçü: yüzde de verilebilir ('100%') — sabit piksele zorlamayız. */
  genislik?: DimensionValue;
  yukseklik?: number;
  yuvarlak?: boolean;
}

/**
 * Yükleme iskeleti: içerik gelene kadar "nabız" animasyonuyla yer tutar.
 * Boş beyaz ekran yerine iskelet göstermek algılanan hızı belirgin artırır.
 */
export function Skeleton({ genislik = '100%', yukseklik = 16, yuvarlak = false }: SkeletonProps) {
  const { renkler, tema } = useTema();
  const opaklik = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const dongu = Animated.loop(
      Animated.sequence([
        Animated.timing(opaklik, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opaklik, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    dongu.start();
    return () => dongu.stop();
  }, [opaklik]);

  return (
    <Animated.View
      accessibilityLabel="Yükleniyor"
      style={{
        width: genislik,
        height: yukseklik,
        borderRadius: yuvarlak ? tema.kose.tam : tema.kose.kucuk,
        backgroundColor: renkler.kenarlik,
        opacity: opaklik,
      }}
    />
  );
}
