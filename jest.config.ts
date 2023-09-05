// eslint-disable-next-line import/no-extraneous-dependencies
import { JestConfigWithTsJest } from 'ts-jest';
import { readdirSync, statSync, existsSync } from 'fs';

const jestProjectConfigFileName = 'jest.config-project.ts';
const jestSetupFileName = 'jest.setup.ts';

const filePaths: string[] = [];
function findFilePaths(
  dirPathRelative: string,
  fileName: string,
  excludeDirNames: string[],
): string[] {
  readdirSync(dirPathRelative).forEach((subFileName) => {
    const filePath = `${dirPathRelative}/${subFileName}`;
    const fileStat = statSync(filePath);

    if (
      fileStat &&
      fileStat.isDirectory() &&
      subFileName[0] !== '.' &&
      !excludeDirNames.includes(subFileName)
    ) {
      findFilePaths(filePath, fileName, excludeDirNames);
    } else if (subFileName === fileName) {
      filePaths.push(filePath);
    }
  });

  return filePaths;
}

findFilePaths('.', jestProjectConfigFileName, [
  'node_modules',
  'build',
  'coverage',
]).slice(1);
const projectJestConfigs = filePaths.map((jestConfigPath) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  const packageJestConfigPartial = require(jestConfigPath)
    .default as JestConfigWithTsJest;

  const packagePathRelative = jestConfigPath.replace(
    `/${jestProjectConfigFileName}`,
    '',
  );

  const packageJsonPathRelative = `${packagePathRelative}/package.json`;
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  const packagePackageJson = require(packageJsonPathRelative);
  const name = packagePackageJson.name.split('/')[1];
  const displayName = name;

  const packagePathSuffix = packagePathRelative.slice(2);
  const packagePathPrefix = '<rootDir>';
  const packageRootDirPath = `${packagePathPrefix}/${packagePathSuffix}`;

  const packageJestConfig: JestConfigWithTsJest = {
    ...packageJestConfigPartial,
    displayName,
    transform: {
      '\\.[jt]sx?$': [
        'ts-jest',
        {
          tsconfig: `${packageRootDirPath}/tsconfig.json`,
        },
      ],
    },
    testMatch: [`${packageRootDirPath}/src/**/?(*.)+(spec|test).[jt]s?(x)`],
  };

  const isJestSetup = existsSync(`${packagePathRelative}/${jestSetupFileName}`);
  if (isJestSetup) {
    const jestSetupRootDirPath = `${packageRootDirPath}/${jestSetupFileName}`;
    packageJestConfig.setupFilesAfterEnv = [jestSetupRootDirPath];
  }

  return packageJestConfig;
}) as JestConfigWithTsJest['projects'];

const jestConfig: JestConfigWithTsJest = {
  collectCoverageFrom: [
    'packages/**/src/**/*.{js,jsx,ts,tsx}',
    '!/**/node_modules/**',
    '!packages/**/src/*',
    '!packages/**/src/**/*constants.ts',
    '!packages/**/src/**/*context.ts',
    '!packages/**/src/**/*exports.ts',
    '!packages/**/src/**/*routes.ts',
    '!packages/**/src/**/*types.ts',
  ],
  coverageReporters: ['html', 'text'],
  projects: projectJestConfigs,
};

export default jestConfig;
