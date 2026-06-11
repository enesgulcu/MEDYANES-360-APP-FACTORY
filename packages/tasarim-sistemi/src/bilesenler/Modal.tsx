import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, View } from 'react-native';
import { useTema } from './TemaSaglayici';

export interface ModalProps {
  acik: boolean;
  /** Kapatma her zaman mümkün olmalı (erişilebilirlik): arka plana dokunma da kapatır. */
  onKapat: () => void;
  /** 'merkez': klasik diyalog. 'alt': alttan açılan sheet. */
  konum?: 'merkez' | 'alt';
  children: ReactNode;
}

export function Modal({ acik, onKapat, konum = 'merkez', children }: ModalProps) {
  const { renkler, tema } = useTema();

  return (
    <RNModal visible={acik} transparent animationType={konum === 'alt' ? 'slide' : 'fade'}>
      <Pressable
        accessibilityLabel="Kapat"
        onPress={onKapat}
        style={{
          flex: 1,
          // Yarı saydam karartma: tek istisna sabit renk, her temada aynı işlev.
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: konum === 'alt' ? 'flex-end' : 'center',
          padding: konum === 'alt' ? 0 : tema.bosluk.lg,
        }}
      >
        {/* İçeriğe dokunmak kapatmasın diye basışı yutan sarmalayıcı */}
        <Pressable onPress={() => undefined} style={{ width: '100%' }}>
          <View
            style={{
              backgroundColor: renkler.yuzey,
              borderRadius: tema.kose.buyuk,
              borderBottomLeftRadius: konum === 'alt' ? 0 : tema.kose.buyuk,
              borderBottomRightRadius: konum === 'alt' ? 0 : tema.kose.buyuk,
              padding: tema.bosluk.lg,
              gap: tema.bosluk.md,
            }}
          >
            {children}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
