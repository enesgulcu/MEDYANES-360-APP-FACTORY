import type { ServisModu } from '@medyanes360/cekirdek';
import { servisModuOku, ServisYapilandirmaHatasi } from '@medyanes360/cekirdek';
import { createMockKimlik, type KimlikIstemcisi } from './client';

/**
 * Tek giriş kapısı: uygulamalar doğrudan mock veya Firebase istemcisi seçmez.
 * Mod mock ise taklit; canlı ise Firebase bağlantısı (henüz iskelet — hesap açılınca tamamlanır).
 */
export function createKimlikIstemcisi(mod: ServisModu = servisModuOku()): KimlikIstemcisi {
  if (mod === 'canli') {
    throw new ServisYapilandirmaHatasi(
      'kimlik',
      'Firebase Auth henüz bağlanmadı. templates/firebase/README.md adımlarını uygula; ' +
        'createFirebaseKimlik eklendikten sonra canlı moda geç.',
    );
  }
  return createMockKimlik();
}
