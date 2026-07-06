import {
  createEslintConfig,
  EslintConfigType,
} from '../../../../scripts/eslint/eslint.configs';

export default createEslintConfig(__dirname, [EslintConfigType.jsdoc]);
