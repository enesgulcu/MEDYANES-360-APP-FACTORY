/**
 * TOKEN TABANLI TEMA (TASARIM.md §1).
 * Bileşenler vücut, tema kıyafettir: yeni uygulama açarken bileşenlere
 * dokunulmaz, yalnızca tema nesnesi değiştirilir. Bileşen içinde sabit
 * renk/boşluk değeri yazmak yasaktır; her değer buradan okunur.
 */

/** Tek bir modun (açık VEYA koyu) renk paleti. */
export interface RenkPaleti {
  /** Marka ana rengi: butonlar, vurgular. */
  birincil: string;
  /** Birincil üzerindeki metin/ikon rengi. */
  birincilUstu: string;
  /** Ekran zemini. */
  zemin: string;
  /** Kart/modal gibi yüzeyler. */
  yuzey: string;
  /** Ana metin. */
  metin: string;
  /** İkincil/soluk metin. */
  metinSoluk: string;
  /** Ayraç ve kenarlıklar. */
  kenarlik: string;
  /** Hata durumları. */
  hata: string;
  /** Başarı durumları. */
  basari: string;
}

export interface Tipografi {
  /** Yazı tipi ailesi; null ise sistem fontu kullanılır. */
  aile: string | null;
  /** Punto ölçeği — sabit piksel değil, adlandırılmış kademeler. */
  boyut: { kucuk: number; govde: number; baslik: number; buyukBaslik: number };
}

/** Boşluk ölçeği: tüm padding/margin değerleri bu kademelerden seçilir. */
export interface BoslukOlcegi {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

/** Köşe yarıçapı kademeleri. */
export interface KoseOlcegi {
  kucuk: number;
  orta: number;
  buyuk: number;
  tam: number;
}

/** Tema: karanlık mod BAŞTAN vardır — light ve dark paletleri zorunludur. */
export interface Tema {
  renkler: { light: RenkPaleti; dark: RenkPaleti };
  tipografi: Tipografi;
  bosluk: BoslukOlcegi;
  kose: KoseOlcegi;
}

/** Derin kısmi tip: tema ezerken yalnızca değişen alanlar yazılır. */
type DerinKismi<T> = { [K in keyof T]?: T[K] extends object ? DerinKismi<T[K]> : T[K] };

export type TemaEzmesi = DerinKismi<Tema>;

/**
 * Fabrika varsayılan teması. Her uygulama bunun üzerine kendi kimliğini
 * `createTheme` ile giydirir; hiçbir uygulama bu nesneyi DOĞRUDAN değiştirmez.
 */
export const VARSAYILAN_TEMA: Tema = {
  renkler: {
    light: {
      birincil: '#2563EB',
      birincilUstu: '#FFFFFF',
      zemin: '#F8FAFC',
      yuzey: '#FFFFFF',
      metin: '#0F172A',
      metinSoluk: '#64748B',
      kenarlik: '#E2E8F0',
      hata: '#DC2626',
      basari: '#16A34A',
    },
    dark: {
      birincil: '#3B82F6',
      birincilUstu: '#FFFFFF',
      zemin: '#0F172A',
      yuzey: '#1E293B',
      metin: '#F1F5F9',
      metinSoluk: '#94A3B8',
      kenarlik: '#334155',
      hata: '#F87171',
      basari: '#4ADE80',
    },
  },
  tipografi: {
    aile: null, // sistem fontu — uygulama markasına göre ezilir
    boyut: { kucuk: 13, govde: 16, baslik: 20, buyukBaslik: 28 },
  },
  bosluk: { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 },
  kose: { kucuk: 6, orta: 12, buyuk: 20, tam: 9999 },
};

/** İki nesneyi derin birleştirir; ezme nesnesindeki alanlar öncelikli. */
function derinBirlestir<T extends object>(taban: T, ezme: DerinKismi<T>): T {
  const sonuc = { ...taban };
  for (const anahtar of Object.keys(ezme) as (keyof T)[]) {
    const ezmeDegeri = ezme[anahtar];
    if (ezmeDegeri === undefined) continue;
    const tabanDegeri = taban[anahtar];
    if (
      typeof ezmeDegeri === 'object' &&
      ezmeDegeri !== null &&
      typeof tabanDegeri === 'object' &&
      tabanDegeri !== null
    ) {
      sonuc[anahtar] = derinBirlestir(
        tabanDegeri as object,
        ezmeDegeri as DerinKismi<object>,
      ) as T[keyof T];
    } else {
      sonuc[anahtar] = ezmeDegeri as T[keyof T];
    }
  }
  return sonuc;
}

/**
 * Uygulamaya özel tema üretir: varsayılan temanın üzerine yalnızca
 * değişen alanlar yazılır. Eksik alan kalmaz; bileşenler her zaman
 * tam bir Tema nesnesiyle çalışır.
 */
export function createTheme(ezme: TemaEzmesi = {}): Tema {
  return derinBirlestir(VARSAYILAN_TEMA, ezme);
}
