#!/usr/bin/env node
/**
 * Uygulama ekran görüntülerini web export + Playwright ile üretir.
 * Çıktı: apps/<uygulama>/docs/onizleme/gorseller/*.png + VITRIN.md
 *
 * Kullanım: pnpm onizleme <uygulama-klasoru>
 * Örnek: pnpm onizleme aliskanlik
 *        pnpm onizleme _sablon
 *
 * Proje sahibi terminal kullanmaz; agent ekran değişince bu komutu çalıştırır.
 */
import { spawn, execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const kok = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const uygulama = process.argv[2];

if (!uygulama) {
  console.error('Kullanim: pnpm onizleme <uygulama-klasoru>');
  console.error('Ornek: pnpm onizleme aliskanlik');
  process.exit(1);
}

const uygulamaKok = join(kok, 'apps', uygulama);
if (!existsSync(uygulamaKok)) {
  console.error(`Uygulama bulunamadi: apps/${uygulama}`);
  process.exit(1);
}

const onizlemeKok = join(uygulamaKok, 'docs', 'onizleme');
const gorselKlasor = join(onizlemeKok, 'gorseller');
const ekranlarYolu = join(onizlemeKok, 'ekranlar.json');
const distKlasor = join(uygulamaKok, '.onizleme-dist');

if (!existsSync(ekranlarYolu)) {
  console.error(`Ekran tanimi yok: apps/${uygulama}/docs/onizleme/ekranlar.json`);
  process.exit(1);
}

/** @type {{ viewport: { width: number; height: number }; akislar: Array<{ id: string; baslik: string; aciklama?: string; adimlar: Array<Record<string, unknown>> }> }} */
const ekranlar = JSON.parse(readFileSync(ekranlarYolu, 'utf8'));

function calistir(komut, args, cwd) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(komut, args, {
      cwd,
      shell: true,
      stdio: 'inherit',
    });
    child.on('exit', (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${komut} ${args.join(' ')} → cikis ${code}`));
    });
  });
}

function bekle(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Expo static ciktisi icin minimal HTTP sunucu. */
function statikSunucuBaslat(kokDizin, port) {
  const mime = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
  };

  return new Promise((resolvePromise) => {
    const sunucu = createServer((istek, yanit) => {
      let yol = istek.url?.split('?')[0] ?? '/';
      if (yol === '/') yol = '/index.html';

      const adaylar = [
        join(kokDizin, yol),
        join(kokDizin, yol.replace(/\/$/, ''), 'index.html'),
        join(kokDizin, `${yol}.html`),
        join(kokDizin, yol, 'index.html'),
      ];

      const dosya = adaylar.find((a) => existsSync(a) && !a.endsWith('/'));
      if (!dosya) {
        yanit.writeHead(404);
        yanit.end('404');
        return;
      }

      const ext = extname(dosya);
      yanit.writeHead(200, { 'Content-Type': mime[ext] ?? 'application/octet-stream' });
      yanit.end(readFileSync(dosya));
    });

    sunucu.listen(port, () => resolvePromise(sunucu));
  });
}

async function playwrightYukle() {
  const require = createRequire(import.meta.url);
  try {
    return require('playwright');
  } catch {
    console.error('[onizleme] Playwright bulunamadi. Kok dizinde: pnpm install');
    process.exit(1);
  }
}

function vitrinMdUret(manifest) {
  const satirlar = [
    `# Görsel Vitrin — ${manifest.uygulamaGorunenAd}`,
    '',
    '> Telefonda gezmek yerine bu sayfadan ekranları inceleyebilirsin.',
    '> Agent ekran değiştirdiğinde bu dosya ve görseller otomatik güncellenir.',
    '',
    `**Son güncelleme:** ${manifest.guncellemeTarihi}`,
    `**Commit:** \`${manifest.commit ?? 'yerel'}\``,
    '',
    '## Nasıl yorum yaparsın?',
    '',
    '1. Aşağıdaki görsellere bak.',
    '2. Beğenmediğin yeri yaz: *"Paywall başlığı çok küçük"* veya *"Ana sayfa renklerini değiştir"*.',
    '3. Agent düzeltir ve bu vitrini yeniler.',
    '',
    '---',
    '',
  ];

  for (const ekran of manifest.ekranlar) {
    satirlar.push(`## ${ekran.baslik}`);
    if (ekran.aciklama) {
      satirlar.push('');
      satirlar.push(ekran.aciklama);
    }
    satirlar.push('');
    satirlar.push(`![${ekran.baslik}](gorseller/${ekran.id}.png)`);
    satirlar.push('');
  }

  return `${satirlar.join('\n')}\n`;
}

function gitCommitAl() {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: kok, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

async function main() {
  mkdirSync(gorselKlasor, { recursive: true });

  console.log(`[onizleme] Web export: apps/${uygulama}`);
  if (existsSync(distKlasor)) rmSync(distKlasor, { recursive: true, force: true });

  await calistir(
    'npx',
    ['expo', 'export', '--platform', 'web', '--output-dir', '.onizleme-dist'],
    uygulamaKok,
  );

  const port = 4173 + Math.floor(Math.random() * 500);
  const sunucu = await statikSunucuBaslat(distKlasor, port);
  const tabanUrl = `http://127.0.0.1:${port}`;

  const playwright = await playwrightYukle();
  const { chromium } = playwright;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    console.log('[onizleme] Chromium indiriliyor (ilk sefer)...');
    await calistir('npx', ['playwright', 'install', 'chromium'], kok);
    browser = await chromium.launch({ headless: true });
  }

  const context = await browser.newContext({
    viewport: ekranlar.viewport ?? { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const manifestEkranlar = [];

  for (const akis of ekranlar.akislar) {
    console.log(`[onizleme]  → ${akis.baslik}`);
    const dosya = join(gorselKlasor, `${akis.id}.png`);

    for (const adim of akis.adimlar) {
      if (adim.tur === 'git') {
        await page.goto(`${tabanUrl}${adim.yol}`, {
          waitUntil: adim.bekleme ?? 'load',
          timeout: 60_000,
        });
      } else if (adim.tur === 'bekle') {
        await bekle(adim.ms ?? 500);
      } else if (adim.tur === 'tikla') {
        const secici = adim.testID
          ? `[data-testid="${adim.testID}"]`
          : (adim.secici ?? `[data-testid="${adim.testId}"]`);
        await page.locator(secici).first().click({ timeout: 15_000 });
      } else if (adim.tur === 'ekranGoruntusu') {
        await page.screenshot({ path: dosya, fullPage: adim.tamSayfa === true });
      }
    }

    manifestEkranlar.push({
      id: akis.id,
      baslik: akis.baslik,
      aciklama: akis.aciklama ?? null,
      dosya: `gorseller/${akis.id}.png`,
    });
  }

  await browser.close();
  sunucu.close();

  const simdi = new Date();
  const tarih = simdi.toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
  const manifest = {
    uygulama,
    uygulamaGorunenAd: ekranlar.uygulamaGorunenAd ?? uygulama,
    guncellemeTarihi: tarih,
    commit: gitCommitAl(),
    viewport: ekranlar.viewport ?? { width: 390, height: 844 },
    not: 'Web onizlemesi; native gorunumle cok yakin ama birebir ayni olmayabilir.',
    ekranlar: manifestEkranlar,
  };

  writeFileSync(
    join(onizlemeKok, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
  writeFileSync(join(onizlemeKok, 'VITRIN.md'), vitrinMdUret(manifest), 'utf8');

  console.log('');
  console.log(`Tamamlandi: apps/${uygulama}/docs/onizleme/VITRIN.md`);
  console.log('Proje sahibi GitHub uzerinden VITRIN.md dosyasini acarak gorebilir.');
}

main().catch((hata) => {
  console.error('[onizleme] Hata:', hata.message);
  process.exit(1);
});
