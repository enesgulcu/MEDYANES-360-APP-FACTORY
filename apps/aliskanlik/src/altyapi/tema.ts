import { createTheme } from '@medyanes360/tasarim-sistemi';

/**
 * Tema A — Sakin Yeşil (#059669).
 * Karar: 2026-06-11, proje sahibi onayı (Seviye 1).
 */
export const uygulamaTemasi = createTheme({
  renkler: {
    light: {
      birincil: '#059669',
      birincilUstu: '#FFFFFF',
      zemin: '#F0FDF4',
      yuzey: '#FFFFFF',
      metin: '#064E3B',
      metinSoluk: '#64748B',
      kenarlik: '#D1FAE5',
      hata: '#DC2626',
      basari: '#059669',
    },
    dark: {
      birincil: '#34D399',
      birincilUstu: '#064E3B',
      zemin: '#022C22',
      yuzey: '#064E3B',
      metin: '#ECFDF5',
      metinSoluk: '#94A3B8',
      kenarlik: '#065F46',
      hata: '#F87171',
      basari: '#34D399',
    },
  },
});
