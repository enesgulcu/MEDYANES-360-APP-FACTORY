import { z } from 'zod';
import { OlayAdiSemasi, OlayParametreleriSemasi } from '@medyanes360/analitik';

/**
 * Fabrika genelinde STANDART log olay şeması (ANAYASA §8 / prompt §8).
 * Her log kaydı bu şemadan geçer; alan eksikse kayıt reddedilir.
 * userId anonim de olsa HER ZAMAN vardır — tekil kullanıcı sorun takibi
 * ancak böyle mümkün olur.
 */
export const LogOlayiSemasi = z.object({
  userId: z.string().min(1),
  appId: z.string().min(1),
  event: OlayAdiSemasi,
  params: OlayParametreleriSemasi,
  /** Unix epoch milisaniye. */
  timestamp: z.number().int().positive(),
  appVersion: z.string().min(1),
  platform: z.enum(['ios', 'android']),
});

export type LogOlayi = z.infer<typeof LogOlayiSemasi>;
