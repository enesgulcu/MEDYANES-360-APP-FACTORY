#!/usr/bin/env node
/**
 * Yeni uygulama açma script'i — apps/_sablon kopyalanır ve kimlikler güncellenir.
 * Kullanım: pnpm new-app <uygulama-adi>
 * Örnek: pnpm new-app saglik-takip
 */
import { cpSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const kok = resolve(import.meta.dirname, '..');
const sablon = join(kok, 'apps', '_sablon');
const ad = process.argv[2];

if (!ad) {
  console.error('Kullanim: pnpm new-app <uygulama-adi>');
  console.error('Ornek: pnpm new-app saglik-takip');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(ad)) {
  console.error('Gecersiz ad. Kucuk harf, rakam ve tire; Turkce karakter yok.');
  process.exit(1);
}

if (ad.startsWith('_')) {
  console.error('Uygulama adi _ ile baslayamaz.');
  process.exit(1);
}

const hedef = join(kok, 'apps', ad);
if (existsSync(hedef)) {
  console.error(`Zaten var: apps/${ad}`);
  process.exit(1);
}

const bundleId = `com.medyanes360.${ad.replace(/-/g, '')}`;
const gorunenAd = ad
  .split('-')
  .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
  .join(' ');

console.log(`Kopyalaniyor: _sablon -> ${ad}`);
cpSync(sablon, hedef, { recursive: true });

function dosyaGuncelle(yol, degistir) {
  const tam = join(hedef, yol);
  if (!existsSync(tam)) return;
  writeFileSync(tam, degistir(readFileSync(tam, 'utf8')), 'utf8');
}

dosyaGuncelle('package.json', (s) => s.replace(/"name": "sablon"/, `"name": "${ad}"`));

dosyaGuncelle('app.json', (s) => {
  let j = s;
  j = j.replace(/"name": "Sablon"/, `"name": "${gorunenAd}"`);
  j = j.replace(/"slug": "sablon"/, `"slug": "${ad}"`);
  j = j.replace(/"scheme": "sablon"/, `"scheme": "${ad}"`);
  j = j.replace(/com\.medyanes360\.uygulamaadi/g, bundleId);
  return j;
});

dosyaGuncelle('src/altyapi/appInfo.ts', (s) =>
  s.replace(/com\.medyanes360\.uygulamaadi/g, bundleId),
);

dosyaGuncelle('.maestro/config.yaml', (s) => s.replace(/com\.medyanes360\.uygulamaadi/g, bundleId));
dosyaGuncelle('.maestro/smoke.yaml', (s) => s.replace(/com\.medyanes360\.uygulamaadi/g, bundleId));

dosyaGuncelle('eas.json', (s) =>
  s.replace(/"channel": "production"/g, `"channel": "${ad}-production"`),
);

// docs şablonlarında uygulama adı
dosyaGuncelle('docs/SPEC.md', (s) => s.replace(/\[Uygulama Adı\]/g, gorunenAd));
dosyaGuncelle('docs/STATUS.md', (s) => s.replace(/\[Uygulama Adı\]/g, gorunenAd));
dosyaGuncelle('docs/KARARLAR.md', (s) => s.replace(/\[Uygulama Adı\]/g, gorunenAd));
dosyaGuncelle('docs/IS-AKIS.md', (s) => {
  const bugun = new Date().toISOString().slice(0, 10);
  return s.replace(/\[Uygulama Adı\]/g, gorunenAd).replace(/YYYY-AA-GG/g, bugun);
});

mkdirSync(join(hedef, 'docs'), { recursive: true });

console.log('');
console.log('Tamamlandi.');
console.log(`  Klasor: apps/${ad}`);
console.log(`  Bundle ID: ${bundleId}`);
console.log('');
console.log('Siradaki adimlar:');
console.log('  1. apps/' + ad + '/docs/SPEC.md doldur');
console.log('  2. apps/' + ad + '/docs/IS-AKIS.md — ilk kayit zaten var; yeni isteklerde guncelle');
console.log('  3. pnpm install');
console.log('  4. pnpm verify');
console.log('  5. cd apps/' + ad + ' && pnpm start');
