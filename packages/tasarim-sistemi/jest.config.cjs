/** Tasarım sistemi bileşen testleri jest-expo ortamında koşar. */
module.exports = {
  preset: 'jest-expo',
  displayName: 'tasarim-sistemi',
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
