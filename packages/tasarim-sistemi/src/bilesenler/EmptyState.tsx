import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useTema } from './TemaSaglayici';

export interface EmptyStateProps {
  baslik: string;
  aciklama?: string;
  /** Genellikle bir lucide ikonu (uygulama tarafından verilir). */
  ikon?: ReactNode;
  /** Opsiyonel aksiyon (ör. "İlk kaydını ekle" butonu). */
  aksiyon?: ReactNode;
}

/** Boş durum ekranı: boş liste asla "bomboş beyazlık" olarak bırakılmaz. */
export function EmptyState({ baslik, aciklama, ikon, aksiyon }: EmptyStateProps) {
  const { renkler, tema } = useTema();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: tema.bosluk.xl,
        gap: tema.bosluk.md,
      }}
    >
      {ikon}
      <Text
        style={{
          color: renkler.metin,
          fontSize: tema.tipografi.boyut.baslik,
          fontWeight: '700',
          textAlign: 'center',
          fontFamily: tema.tipografi.aile ?? undefined,
        }}
      >
        {baslik}
      </Text>
      {aciklama !== undefined && (
        <Text
          style={{
            color: renkler.metinSoluk,
            fontSize: tema.tipografi.boyut.govde,
            textAlign: 'center',
          }}
        >
          {aciklama}
        </Text>
      )}
      {aksiyon}
    </View>
  );
}
