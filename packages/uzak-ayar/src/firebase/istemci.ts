import type { FirebaseApp } from 'firebase/app';
import {
  fetchAndActivate,
  getAll,
  getRemoteConfig,
  type RemoteConfig,
} from 'firebase/remote-config';
import { parseWith } from '@medyanes360/cekirdek';
import type { z } from 'zod';
import type { UzakAyarIstemcisi } from '../client';

/** Remote Config varsayılanları — sunucu yanıt vermezse bunlar kullanılır. */
export interface FirebaseUzakAyarVarsayilanlari {
  degerler: Record<string, unknown>;
}

function uzakDegeriYerelTipeCevir(deger: string): unknown {
  if (deger === 'true') return true;
  if (deger === 'false') return false;
  const sayi = Number(deger);
  if (!Number.isNaN(sayi) && deger.trim() !== '') return sayi;
  try {
    return JSON.parse(deger) as unknown;
  } catch {
    return deger;
  }
}

/** Firebase Remote Config sarmalayıcısı. */
export function createFirebaseUzakAyar(
  app: FirebaseApp,
  varsayilanlar: FirebaseUzakAyarVarsayilanlari,
): UzakAyarIstemcisi {
  const remoteConfig: RemoteConfig = getRemoteConfig(app);
  remoteConfig.settings = {
    minimumFetchIntervalMillis: process.env.NODE_ENV !== 'production' ? 0 : 60 * 60 * 1000,
    fetchTimeoutMillis: 10_000,
  };
  remoteConfig.defaultConfig = Object.fromEntries(
    Object.entries(varsayilanlar.degerler).map(([anahtar, deger]) => [
      anahtar,
      typeof deger === 'string' ? deger : JSON.stringify(deger),
    ]),
  );

  return {
    getValue<T>(anahtar: string, schema: z.ZodType<T>, varsayilan: T): T {
      try {
        const tumDegerler = getAll(remoteConfig);
        const kayit = tumDegerler[anahtar];
        const ham =
          kayit !== undefined
            ? uzakDegeriYerelTipeCevir(kayit.asString())
            : (varsayilanlar.degerler[anahtar] ?? varsayilan);

        const sonuc = parseWith(schema, ham);
        if (!sonuc.ok) {
          console.warn(`[uzak-ayar] '${anahtar}' şemadan geçmedi, varsayılan kullanılıyor.`);
          return varsayilan;
        }
        return sonuc.value;
      } catch {
        return varsayilan;
      }
    },

    async refresh() {
      await fetchAndActivate(remoteConfig);
    },
  };
}
