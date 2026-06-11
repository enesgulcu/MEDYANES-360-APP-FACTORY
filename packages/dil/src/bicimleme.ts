import type { DilKodu } from './diller';

/**
 * Tarih/sayı/para biçimleri YERELE GÖRE otomatik üretilir (prompt §10).
 * Elle "1.234,56 TL" gibi metin kurmak yasaktır; her zaman Intl kullanılır.
 * Intl, Hermes motorunda (React Native) desteklenir.
 */

export function tarihBicimle(tarih: Date, dil: DilKodu): string {
  return new Intl.DateTimeFormat(dil, { dateStyle: 'long' }).format(tarih);
}

export function sayiBicimle(sayi: number, dil: DilKodu): string {
  return new Intl.NumberFormat(dil).format(sayi);
}

export function paraBicimle(tutar: number, paraBirimi: string, dil: DilKodu): string {
  return new Intl.NumberFormat(dil, { style: 'currency', currency: paraBirimi }).format(tutar);
}
