import { createTheme, VARSAYILAN_TEMA } from './tema';

describe('createTheme', () => {
  it('ezme olmadan varsayılan temayı döner', () => {
    expect(createTheme()).toEqual(VARSAYILAN_TEMA);
  });

  it('yalnızca verilen alanları ezer, kalanları korur', () => {
    const tema = createTheme({
      renkler: { light: { birincil: '#FF0000' } },
    });

    expect(tema.renkler.light.birincil).toBe('#FF0000');
    // Ezilmeyen alanlar varsayılandan gelir
    expect(tema.renkler.light.zemin).toBe(VARSAYILAN_TEMA.renkler.light.zemin);
    expect(tema.renkler.dark).toEqual(VARSAYILAN_TEMA.renkler.dark);
    expect(tema.bosluk).toEqual(VARSAYILAN_TEMA.bosluk);
  });

  it('varsayılan temayı MUTASYONA UĞRATMAZ (uygulamalar birbirini etkileyemez)', () => {
    const zeminOncesi = VARSAYILAN_TEMA.renkler.light.zemin;
    createTheme({ renkler: { light: { zemin: '#000000' } } });
    expect(VARSAYILAN_TEMA.renkler.light.zemin).toBe(zeminOncesi);
  });

  it('karanlık mod paleti her temada zorunlu olarak mevcuttur', () => {
    const tema = createTheme({ tipografi: { aile: 'Inter' } });
    expect(tema.renkler.dark.zemin).toBeTruthy();
    expect(tema.renkler.dark.metin).toBeTruthy();
  });
});
