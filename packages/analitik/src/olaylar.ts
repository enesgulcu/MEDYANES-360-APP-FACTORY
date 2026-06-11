import { z } from 'zod';

/**
 * ORTAK OLAY SÖZLÜĞÜ — tüm uygulamalarda AYNI isimler kullanılır.
 * Neden: olay adları uygulamadan uygulamaya değişirse fabrika genelinde
 * karşılaştırmalı analiz (hangi app daha iyi dönüştürüyor?) imkânsızlaşır.
 */
export const ORTAK_OLAYLAR = [
  'app_open',
  'screen_view',
  'paywall_shown',
  'purchase_started',
  'purchase_completed',
  'error',
] as const;

export type OrtakOlay = (typeof ORTAK_OLAYLAR)[number];

/** Olay adı şeması: ortak sözlükten veya uygulamaya özel snake_case ad. */
export const OlayAdiSemasi = z
  .string()
  .min(1)
  .max(40)
  .regex(/^[a-z][a-z0-9_]*$/, 'Olay adları snake_case olmalı (ör. app_open)');

/**
 * Olay parametreleri: yalnızca basit değerler.
 * KVKK gereği kişisel veri (isim, e-posta, telefon) parametre olarak GİREMEZ.
 */
export const OlayParametreleriSemasi = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean()]),
);

export type OlayParametreleri = z.infer<typeof OlayParametreleriSemasi>;
