import type { ReactElement, ReactNode } from 'react';
import { FlatList, View, type ListRenderItem } from 'react-native';
import { useTema } from './TemaSaglayici';

export interface ListeProps<T> {
  veriler: readonly T[];
  renderItem: ListRenderItem<T>;
  anahtarCikar: (oge: T, indeks: number) => string;
  /** Liste boşken gösterilecek içerik (genellikle <EmptyState />). */
  bosDurum?: ReactNode;
}

/**
 * FlatList sarmalayıcısı: ayraç ve boş durum entegrasyonu standart.
 * FlatList sanallaştırma yaptığı için uzun listelerde de akıcıdır.
 */
export function Liste<T>({
  veriler,
  renderItem,
  anahtarCikar,
  bosDurum,
}: ListeProps<T>): ReactElement {
  const { renkler, tema } = useTema();

  return (
    <FlatList
      data={veriler as T[]}
      renderItem={renderItem}
      keyExtractor={anahtarCikar}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: renkler.kenarlik }} />
      )}
      ListEmptyComponent={
        bosDurum !== undefined ? () => <View style={{ flex: 1 }}>{bosDurum}</View> : undefined
      }
      contentContainerStyle={{ flexGrow: 1, padding: tema.bosluk.md }}
    />
  );
}
