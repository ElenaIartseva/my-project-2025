const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const nextOutputPatterns = ['<rootDir>/\\.next/', '<rootDir>/\\.next-dev/'];

const customJestConfig = {
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/test/__mocks__/svgMock.tsx',
  },
  modulePathIgnorePatterns: nextOutputPatterns,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: nextOutputPatterns,
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
