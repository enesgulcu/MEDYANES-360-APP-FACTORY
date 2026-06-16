import { servisModuOku, ServisYapilandirmaHatasi } from './servis-modu';

describe('servisModuOku', () => {
  it('varsayılan mock döner', () => {
    expect(servisModuOku(undefined)).toBe('mock');
  });

  it('canli modu tanır', () => {
    expect(servisModuOku('canli')).toBe('canli');
  });

  it('geçersiz değerde mock döner', () => {
    expect(servisModuOku('bozuk')).toBe('mock');
  });
});

describe('ServisYapilandirmaHatasi', () => {
  it('anlamlı mesaj taşır', () => {
    const h = new ServisYapilandirmaHatasi('kimlik', 'Firebase bagla');
    expect(h.servis).toBe('kimlik');
    expect(h.message).toContain('Firebase bagla');
  });
});
