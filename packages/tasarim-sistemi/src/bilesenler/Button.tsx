import { ActivityIndicator, Pressable, Text, type ViewStyle } from 'react-native';
import { useTema } from './TemaSaglayici';

export type ButtonVaryanti = 'primary' | 'secondary' | 'ghost' | 'destructive';

export interface ButtonProps {
  baslik: string;
  onPress: () => void;
  varyant?: ButtonVaryanti;
  /** true iken spinner gösterilir ve basılamaz (çift tıklama koruması). */
  yukleniyor?: boolean;
  devreDisi?: boolean;
  style?: ViewStyle;
}

export function Button({
  baslik,
  onPress,
  varyant = 'primary',
  yukleniyor = false,
  devreDisi = false,
  style,
}: ButtonProps) {
  const { renkler, tema } = useTema();

  // Tüm renkler tema token'larından — sabit renk yazmak yasak (TASARIM.md §1).
  const arkaplan: Record<ButtonVaryanti, string> = {
    primary: renkler.birincil,
    secondary: renkler.yuzey,
    ghost: 'transparent',
    destructive: renkler.hata,
  };
  const metinRengi: Record<ButtonVaryanti, string> = {
    primary: renkler.birincilUstu,
    secondary: renkler.metin,
    ghost: renkler.birincil,
    destructive: renkler.birincilUstu,
  };

  const pasif = devreDisi || yukleniyor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: pasif, busy: yukleniyor }}
      onPress={onPress}
      disabled={pasif}
      style={({ pressed }) => [
        {
          backgroundColor: arkaplan[varyant],
          borderRadius: tema.kose.orta,
          paddingVertical: tema.bosluk.md,
          paddingHorizontal: tema.bosluk.lg,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: tema.bosluk.sm,
          borderWidth: varyant === 'secondary' ? 1 : 0,
          borderColor: renkler.kenarlik,
          opacity: pasif ? 0.6 : pressed ? 0.85 : 1,
          minHeight: 48, // dokunma hedefi erişilebilirlik alt sınırı
        },
        style,
      ]}
    >
      {yukleniyor && <ActivityIndicator size="small" color={metinRengi[varyant]} />}
      <Text
        style={{
          color: metinRengi[varyant],
          fontSize: tema.tipografi.boyut.govde,
          fontWeight: '600',
          fontFamily: tema.tipografi.aile ?? undefined,
        }}
      >
        {baslik}
      </Text>
    </Pressable>
  );
}
