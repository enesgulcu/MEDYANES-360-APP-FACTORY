import { createMockKimlik } from './client';

describe('createMockKimlik', () => {
  it('anonim giriş kullanıcı oluşturur', async () => {
    const kimlik = createMockKimlik();
    const sonuc = await kimlik.signInAnonymously();
    expect(sonuc.ok).toBe(true);
    if (sonuc.ok) {
      expect(sonuc.value.anonim).toBe(true);
      expect(sonuc.value.uid).toMatch(/^mock-anon-/);
    }
  });

  it('tekrar giriş aynı oturumu döner (yeni hesap açmaz)', async () => {
    const kimlik = createMockKimlik();
    const ilk = await kimlik.signInAnonymously();
    const ikinci = await kimlik.signInAnonymously();
    if (ilk.ok && ikinci.ok) expect(ikinci.value.uid).toBe(ilk.value.uid);
  });

  it('oturum dinleyicisi giriş ve çıkışta tetiklenir', async () => {
    const kimlik = createMockKimlik();
    const gorulen: (string | null)[] = [];
    kimlik.onAuthStateChanged((k) => gorulen.push(k?.uid ?? null));

    await kimlik.signInAnonymously();
    await kimlik.signOut();

    // abone olunca: null, girişte: uid, çıkışta: null
    expect(gorulen[0]).toBeNull();
    expect(gorulen[1]).toMatch(/^mock-anon-/);
    expect(gorulen[2]).toBeNull();
  });

  it('hesap silme oturumu da kapatır', async () => {
    const kimlik = createMockKimlik();
    await kimlik.signInAnonymously();
    const sonuc = await kimlik.deleteAccount();
    expect(sonuc.ok).toBe(true);
    expect(kimlik.getCurrentUser()).toBeNull();
  });

  it('oturum yokken hesap silme hata döner (sessiz geçmez)', async () => {
    const kimlik = createMockKimlik();
    const sonuc = await kimlik.deleteAccount();
    expect(sonuc.ok).toBe(false);
  });
});
