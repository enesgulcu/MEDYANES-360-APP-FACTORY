import { z } from 'zod';
import { createMockUzakAyar, PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI } from './client';

describe('createMockUzakAyar', () => {
  it('tanımlı değeri şemadan geçirip döner', () => {
    const ayar = createMockUzakAyar({ deneme_suresi_gun: 7 });
    expect(ayar.getValue('deneme_suresi_gun', z.number().int(), 3)).toBe(7);
  });

  it('tanımsız anahtar varsayılana döner', () => {
    const ayar = createMockUzakAyar();
    expect(ayar.getValue('olmayan_anahtar', z.number(), 42)).toBe(42);
  });

  it('şemadan geçmeyen değer uygulamayı KIRMAZ, varsayılana döner', () => {
    const ayar = createMockUzakAyar({ deneme_suresi_gun: 'yedi' });
    expect(ayar.getValue('deneme_suresi_gun', z.number().int(), 3)).toBe(3);
  });

  it('örnek paywall ayarı uçtan uca çalışır', () => {
    const ayar = createMockUzakAyar({
      paywall: { aktif: false, baslikAnahtari: 'paywall.kampanya', oneCikanUrun: 'aylik_premium' },
    });
    const paywall = ayar.getValue('paywall', PaywallAyariSemasi, VARSAYILAN_PAYWALL_AYARI);
    expect(paywall.aktif).toBe(false);
    expect(paywall.oneCikanUrun).toBe('aylik_premium');
  });
});
