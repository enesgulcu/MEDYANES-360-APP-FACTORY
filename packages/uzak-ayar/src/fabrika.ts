import { servisModuOku, ServisYapilandirmaHatasi, type ServisModu } from '@medyanes360/cekirdek';
import { createMockUzakAyar, type UzakAyarIstemcisi } from './client';

export function createUzakAyarIstemcisi(
  baslangic?: Record<string, unknown>,
  mod: ServisModu = servisModuOku(),
): UzakAyarIstemcisi & { degerAyarla(anahtar: string, deger: unknown): void } {
  if (mod === 'canli') {
    throw new ServisYapilandirmaHatasi(
      'uzak-ayar',
      'Firebase Remote Config henüz bağlanmadı. templates/firebase/README.md',
    );
  }
  return createMockUzakAyar(baslangic);
}
