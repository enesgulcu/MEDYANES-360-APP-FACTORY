import type { ReactNode } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useTema } from './TemaSaglayici';

export interface CardProps {
  baslik?: string;
  children: ReactNode;
  /** Kartın altında gösterilecek opsiyonel aksiyon alanı (ör. Button). */
  aksiyon?: ReactNode;
  style?: ViewStyle;
}

export function Card({ baslik, children, aksiyon, style }: CardProps) {
  const { renkler, tema } = useTema();

  return (
    <View
      style={[
        {
          backgroundColor: renkler.yuzey,
          borderRadius: tema.kose.buyuk,
          padding: tema.bosluk.md,
          borderWidth: 1,
          borderColor: renkler.kenarlik,
          gap: tema.bosluk.sm,
        },
        style,
      ]}
    >
      {baslik !== undefined && (
        <Text
          style={{
            color: renkler.metin,
            fontSize: tema.tipografi.boyut.baslik,
            fontWeight: '700',
            fontFamily: tema.tipografi.aile ?? undefined,
          }}
        >
          {baslik}
        </Text>
      )}
      {children}
      {aksiyon !== undefined && <View style={{ marginTop: tema.bosluk.sm }}>{aksiyon}</View>}
    </View>
  );
}
