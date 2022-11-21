module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  transform: {
    '^.+\\.[j|t]s?$': 'ts-jest',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['jest-sinon'],
};
