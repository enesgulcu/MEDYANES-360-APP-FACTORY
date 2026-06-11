/**
 * Ortamda IndexedDB var mı?
 * Firebase Web SDK Remote Config fetch bu API'ye dayanır; React Native / Expo Go'da yoktur.
 * `'indexedDB' in globalThis` kullanılır — Hermes'te doğrudan erişim ReferenceError fırlatır.
 */
export function indexedDbKullanilabilirMi(): boolean {
  try {
    const kapsam = globalThis as typeof globalThis & { indexedDB?: unknown };
    return 'indexedDB' in kapsam && kapsam.indexedDB != null;
  } catch {
    return false;
  }
}
