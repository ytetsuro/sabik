module.exports = {
  setupFilesAfterEnv: [
    './TestBootstrap.ts',
  ],
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/__tests__/**/?(*.)+(spec|test).(ts|tsx|js)',
  ],
  coveragePathIgnorePatterns: [
    'src/TestHelpers',
    'src/Sabik/DIContainer.ts',
    'src/Language/TypeScript/__tests__/fixtures',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
}
