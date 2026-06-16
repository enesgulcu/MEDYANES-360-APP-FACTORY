import {
  servisModuOku,
  ServisYapilandirmaHatasi,
  type AppInfo,
  type ServisModu,
} from '@medyanes360/cekirdek';
import { createMockAnalitik, type AnalitikIstemcisi } from './client';

export function createAnalitikIstemcisi(
  appInfo: AppInfo,
  mod: ServisModu = servisModuOku(),
): AnalitikIstemcisi {
  if (mod === 'canli') {
    throw new ServisYapilandirmaHatasi(
      'analitik',
      'Firebase Analytics henüz bağlanmadı. templates/firebase/README.md',
    );
  }
  return createMockAnalitik(appInfo);
}
