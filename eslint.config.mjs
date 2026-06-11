import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

const rootDir = dirname(fileURLToPath(import.meta.url));

/**
 * İzolasyon bölgelerini (zones) apps/ klasörünü okuyarak OTOMATİK üretiriz.
 * Böylece yeni bir uygulama eklendiğinde kimsenin ESLint konfigürasyonunu
 * elle güncellemesi gerekmez; kural kendiliğinden geçerli olur. (ANAYASA §4)
 */
function buildIsolationZones() {
  const zones = [
    // Çekirdek (packages/) hiçbir uygulamayı import edemez — tek yönlü bağımlılık.
    {
      target: './packages',
      from: './apps',
      message:
        'Çekirdek paketler uygulamaları import edemez (ANAYASA §4.2 - tek yönlü bağımlılık).',
    },
  ];

  const appsDir = join(rootDir, 'apps');
  if (existsSync(appsDir)) {
    const appFolders = readdirSync(appsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== '_arsiv')
      .map((entry) => entry.name);

    // Her uygulama, kendisi HARİÇ diğer tüm uygulamalardan import yapamaz.
    for (const app of appFolders) {
      zones.push({
        target: `./apps/${app}`,
        from: './apps',
        except: [`./${app}`],
        message: `Uygulamalar birbirini göremez (ANAYASA §4.1): apps/${app} başka bir uygulamadan import yapamaz.`,
      });
    }
  }

  return zones;
}

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.expo/**',
      '**/dist/**',
      '**/coverage/**',
      'apps/_arsiv/**', // arşiv denetlenmez (ANAYASA §4.6)
      '**/babel.config.js',
      '**/metro.config.js',
      '**/tailwind.config.js',
      '**/jest.config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': { typescript: true, node: true },
    },
    rules: {
      // ANAYASA §4: izolasyon kuralları — ihlal commit edilemez.
      'import/no-restricted-paths': ['error', { zones: buildIsolationZones() }],
      // KODLAMA.md §2: any yasak.
      '@typescript-eslint/no-explicit-any': 'error',
      // KODLAMA.md §4: sessiz hata yutma yasak.
      'no-empty': ['error', { allowEmptyCatch: false }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  // CommonJS konfigürasyon dosyaları (jest vb.) node globallerini kullanır.
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { module: 'writable', require: 'readonly', __dirname: 'readonly' },
    },
    rules: {
      // CJS dosyasında require doğru kullanımdır; ESM kuralı burada geçersiz.
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // Paketlere yalnızca resmi giriş kapısından (@medyanes360/<paket>) erişilir.
  {
    files: ['apps/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@medyanes360/*/src/*', '@medyanes360/*/dist/*'],
              message:
                'Derin import yasak: paketi yalnızca @medyanes360/<paket> kökünden import et.',
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
);
