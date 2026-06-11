/**
 * Tüm çekirdek paketlerin miras aldığı ortak Jest ayarı.
 * Paketler saf TypeScript olduğu için ts-jest + node ortamı yeterlidir.
 * (Bileşen testleri `tasarim-sistemi` paketinde jest-expo ile koşar.)
 */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // Jest CommonJS çalıştığı için modül ayarlarını burada eziyoruz;
        // paketlerin kendi tsconfig'leri bundler moduna göre ayarlı.
        tsconfig: {
          module: 'commonjs',
          moduleResolution: 'node',
          jsx: 'react-jsx',
        },
      },
    ],
  },
};
