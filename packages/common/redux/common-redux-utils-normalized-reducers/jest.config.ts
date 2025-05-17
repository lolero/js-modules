// eslint-disable-next-line import/no-extraneous-dependencies
import { JestConfigWithTsJest } from 'ts-jest';
// eslint-disable-next-line import/no-relative-packages
import { jestConfigCommon } from '../../../../jest.config-common';

const jestConfigProject: JestConfigWithTsJest = {
  ...jestConfigCommon,
  testEnvironment: 'jsdom',
};

export default jestConfigProject;
