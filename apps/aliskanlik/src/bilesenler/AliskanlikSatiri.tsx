import { Pressable, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTema } from '@medyanes360/tasarim-sistemi';
import {
  bugunTamamlandiMi,
  bugununTarihi,
  seriHesapla,
  type Aliskanlik,
} from '../domain/aliskanlik';

interface AliskanlikSatiriProps {
  aliskanlik: Aliskanlik;
  yukleniyor: boolean;
  onToggle: () => void;
  seriEtiketi: string;
}

/** Tek alışkanlık satırı — günlük işaretleme + seri göstergesi. */
export function AliskanlikSatiri({
  aliskanlik,
  yukleniyor,
  onToggle,
  seriEtiketi,
}: AliskanlikSatiriProps) {
  const { renkler, tema } = useTema();
  const bugun = bugununTarihi();
  const tamamlandi = bugunTamamlandiMi(aliskanlik, bugun);
  const seri = seriHesapla(aliskanlik.tamamlananGunler, bugun);

  return (
    <Pressable
      onPress={onToggle}
      disabled={yukleniyor}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tema.bosluk.md,
        paddingVertical: tema.bosluk.sm,
        opacity: yukleniyor ? 0.6 : 1,
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: tema.kose.tam,
          borderWidth: 2,
          borderColor: tamamlandi ? aliskanlik.renk : renkler.kenarlik,
          backgroundColor: tamamlandi ? aliskanlik.renk : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {tamamlandi && <Check color={renkler.birincilUstu} size={16} strokeWidth={3} />}
      </View>

      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: tema.kose.tam,
          backgroundColor: aliskanlik.renk,
        }}
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: renkler.metin,
            fontSize: tema.tipografi.boyut.govde,
            fontWeight: '600',
            textDecorationLine: tamamlandi ? 'line-through' : 'none',
          }}
        >
          {aliskanlik.ad}
        </Text>
        {seri > 0 && (
          <Text style={{ color: renkler.metinSoluk, fontSize: tema.tipografi.boyut.kucuk }}>
            {seriEtiketi.replace('{{seri}}', String(seri))}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
