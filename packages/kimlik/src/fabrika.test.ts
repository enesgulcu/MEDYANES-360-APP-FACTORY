import { createKimlikIstemcisi } from './fabrika';

describe('createKimlikIstemcisi', () => {
  it('mock modda istemci döner', async () => {
    const istemci = createKimlikIstemcisi('mock');
    const sonuc = await istemci.signInAnonymously();
    expect(sonuc.ok).toBe(true);
  });

  it('canlı modda yapılandırma hatası fırlatır', () => {
    expect(() => createKimlikIstemcisi('canli')).toThrow(/Firebase Auth/);
  });
});
