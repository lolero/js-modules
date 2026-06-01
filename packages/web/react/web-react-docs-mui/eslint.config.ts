import type { EslintConfigList } from '../../../../scripts/eslint/eslint.configs';
import { createEslintConfig } from '../../../../scripts/eslint/eslint.configs';

const eslintConfigList: EslintConfigList = [
  {
    ignores: ['src/_docsExamplesCopy-DO-NOT-EDIT/**'],
  },
  ...createEslintConfig(__dirname),
];
export default eslintConfigList;
