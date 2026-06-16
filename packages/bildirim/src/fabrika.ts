import { servisModuOku, ServisYapilandirmaHatasi, type ServisModu } from '@medyanes360/cekirdek';
import { createMockBildirim } from './client';

export function createBildirimIstemcisi(mod: ServisModu = servisModuOku()) {
  if (mod === 'canli') {
    throw new ServisYapilandirmaHatasi(
      'bildirim',
      'FCM henüz bağlanmadı. templates/firebase/README.md',
    );
  }
  return createMockBildirim();
}
