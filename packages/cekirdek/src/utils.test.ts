import { z } from 'zod';
import { err, ok } from './types';
import { parseWith, safeJsonParse } from './utils';

describe('Result yardımcıları', () => {
  it('ok başarılı sonuç üretir', () => {
    expect(ok(5)).toEqual({ ok: true, value: 5 });
  });

  it('err başarısız sonuç üretir', () => {
    const hata = new Error('test');
    expect(err(hata)).toEqual({ ok: false, error: hata });
  });
});

describe('parseWith', () => {
  const sema = z.object({ ad: z.string() });

  it('geçerli veriyi tipli olarak döner', () => {
    const sonuc = parseWith(sema, { ad: 'medyanes' });
    expect(sonuc.ok).toBe(true);
    if (sonuc.ok) expect(sonuc.value.ad).toBe('medyanes');
  });

  it('geçersiz veriyi hata olarak döner (fırlatmaz)', () => {
    const sonuc = parseWith(sema, { ad: 42 });
    expect(sonuc.ok).toBe(false);
  });
});

describe('safeJsonParse', () => {
  const sema = z.object({ aktif: z.boolean() });

  it('geçerli JSON + geçerli şema çalışır', () => {
    const sonuc = safeJsonParse(sema, '{"aktif":true}');
    expect(sonuc.ok).toBe(true);
  });

  it('bozuk JSON hata döner, uygulamayı çökertmez', () => {
    const sonuc = safeJsonParse(sema, '{bozuk');
    expect(sonuc.ok).toBe(false);
  });
});
