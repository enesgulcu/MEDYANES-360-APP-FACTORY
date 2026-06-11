import { forwardRef } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useTema } from './TemaSaglayici';

export interface InputProps extends TextInputProps {
  etiket?: string;
  /** React Hook Form'dan gelen hata mesajı; varsa kenarlık hata rengine döner. */
  hata?: string;
}

/**
 * forwardRef: React Hook Form'un Controller'ı odak yönetimi için ref ister.
 * Tüm TextInput özellikleri (value, onChangeText, placeholder...) geçirilir.
 */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  { etiket, hata, style, ...rest },
  ref,
) {
  const { renkler, tema } = useTema();

  return (
    <View style={{ gap: tema.bosluk.xs }}>
      {etiket !== undefined && (
        <Text
          style={{
            color: renkler.metinSoluk,
            fontSize: tema.tipografi.boyut.kucuk,
            fontFamily: tema.tipografi.aile ?? undefined,
          }}
        >
          {etiket}
        </Text>
      )}
      <TextInput
        ref={ref}
        placeholderTextColor={renkler.metinSoluk}
        accessibilityLabel={etiket}
        style={[
          {
            backgroundColor: renkler.yuzey,
            color: renkler.metin,
            borderWidth: 1,
            borderColor: hata !== undefined ? renkler.hata : renkler.kenarlik,
            borderRadius: tema.kose.orta,
            paddingVertical: tema.bosluk.sm,
            paddingHorizontal: tema.bosluk.md,
            fontSize: tema.tipografi.boyut.govde,
            minHeight: 48,
            fontFamily: tema.tipografi.aile ?? undefined,
          },
          style,
        ]}
        {...rest}
      />
      {hata !== undefined && (
        <Text
          accessibilityRole="alert"
          style={{ color: renkler.hata, fontSize: tema.tipografi.boyut.kucuk }}
        >
          {hata}
        </Text>
      )}
    </View>
  );
});
