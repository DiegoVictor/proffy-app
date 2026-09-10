import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: 'tests/coverage',
  coveragePathIgnorePatterns: ['src/services', 'src/types', 'src/index.tsx'],
  coverageReporters: ['text', 'lcov'],
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  transformIgnorePatterns: [],
};

export default config;
