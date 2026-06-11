import { z } from 'zod';
import { err, ok, type Result } from './types';

/**
 * Dış dünyadan gelen veriyi Zod şemasıyla doğrulayıp Result olarak döner.
 * KODLAMA.md §3 gereği doğrulanmamış dış veri tipli koda giremez;
 * tüm paketler dış veri doğrulamada bu yardımcıyı kullanır.
 */
export function parseWith<T>(schema: z.ZodType<T>, data: unknown): Result<T, z.ZodError> {
  const sonuc = schema.safeParse(data);
  return sonuc.success ? ok(sonuc.data) : err(sonuc.error);
}

/**
 * Exhaustiveness (eksiksizlik) kontrolü: bir union tipinin tüm dalları
 * ele alınmazsa derleyici burada hata verir. Switch'lerin default dalında
 * kullanılır; çalışma zamanına düşerse programcı hatası demektir.
 */
export function assertNever(value: never): never {
  throw new Error(`Beklenmeyen değer: ${JSON.stringify(value)}`);
}

/** Verilen milisaniye kadar bekler (test ve yeniden deneme akışları için). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * JSON.parse'ın güvenli sarmalayıcısı: hem geçersiz JSON'u hem de şema
 * uyuşmazlığını tek Result altında toplar. Remote Config ve API yanıtları
 * gibi "string gelen" dış veriler için kullanılır.
 */
export function safeJsonParse<T>(schema: z.ZodType<T>, raw: string): Result<T, Error> {
  try {
    const parsed: unknown = JSON.parse(raw);
    const sonuc = parseWith(schema, parsed);
    return sonuc.ok ? sonuc : err(new Error(sonuc.error.message));
  } catch (hata) {
    return err(hata instanceof Error ? hata : new Error(String(hata)));
  }
}
