// eslint-disable-next-line import/no-extraneous-dependencies
import { JestConfigWithTsJest } from 'ts-jest';

export const jestConfigCommon: JestConfigWithTsJest = {
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  testMatch: [`<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)`],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/src/*',
    '!<rootDir>/src/**/*constants.ts',
    '!<rootDir>/src/**/*context.ts',
    '!<rootDir>/src/**/*exports.ts',
    '!<rootDir>/src/**/*routes.ts',
    '!<rootDir>/src/**/*types.ts',
  ],
  coverageReporters: ['html', 'text'],
};
