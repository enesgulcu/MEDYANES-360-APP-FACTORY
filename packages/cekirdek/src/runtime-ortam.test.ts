import { indexedDbKullanilabilirMi } from './runtime-ortam';

describe('indexedDbKullanilabilirMi', () => {
  const orijinal = Object.getOwnPropertyDescriptor(globalThis, 'indexedDB');

  afterEach(() => {
    if (orijinal !== undefined) {
      Object.defineProperty(globalThis, 'indexedDB', orijinal);
    } else {
      Reflect.deleteProperty(globalThis, 'indexedDB');
    }
  });

  it('indexedDB yoksa false döner (Expo Go / Jest node)', () => {
    Reflect.deleteProperty(globalThis, 'indexedDB');
    expect(indexedDbKullanilabilirMi()).toBe(false);
  });

  it('indexedDB varsa true döner (tarayıcı)', () => {
    Object.defineProperty(globalThis, 'indexedDB', {
      configurable: true,
      value: {},
    });
    expect(indexedDbKullanilabilirMi()).toBe(true);
  });
});
