import { abonelikDurumuFromCustomerInfo, periyotFromUrunKimligi } from './yardimci';

describe('periyotFromUrunKimligi', () => {
  it('monthly/yearly kimliklerini doğru eşler', () => {
    expect(periyotFromUrunKimligi('monthly')).toBe('aylik');
    expect(periyotFromUrunKimligi('yearly')).toBe('yillik');
  });
});

describe('abonelikDurumuFromCustomerInfo', () => {
  it('aktif entitlement varsa premium true döner', () => {
    const durum = abonelikDurumuFromCustomerInfo(
      {
        entitlements: {
          active: {
            'Alışkanlık Pro': { expirationDateMillis: 1_700_000_000_000 },
          },
          all: {},
        },
      } as unknown as Parameters<typeof abonelikDurumuFromCustomerInfo>[0],
      'Alışkanlık Pro',
    );
    expect(durum.premium).toBe(true);
    expect(durum.bitisTarihi).toBe(1_700_000_000_000);
  });

  it('entitlement yoksa premium false döner', () => {
    const durum = abonelikDurumuFromCustomerInfo(
      {
        entitlements: { active: {}, all: {} },
      } as unknown as Parameters<typeof abonelikDurumuFromCustomerInfo>[0],
      'Alışkanlık Pro',
    );
    expect(durum.premium).toBe(false);
  });
});
