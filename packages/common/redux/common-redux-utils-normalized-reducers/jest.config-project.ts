// eslint-disable-next-line import/no-extraneous-dependencies
import { JestConfigWithTsJest } from 'ts-jest';

const jestConfigProject: JestConfigWithTsJest = {
  testEnvironment: 'jsdom',
};

export default jestConfigProject;
