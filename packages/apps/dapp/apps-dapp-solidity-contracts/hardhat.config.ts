// once TS supports ${configDir} outside compilerOptions, move exclude and
// files from tsconfig.build.json and tsconfig.json to
// tsconfig.hardhat.build.json and tsconfig.hardhat.json mixins
// Same for vite packages
// https://github.com/microsoft/TypeScript/issues/56436
// TODO: monitor ${configDir} support (see above)
import hardhatEthers from '@nomicfoundation/hardhat-ethers';
import hardhatEthersChaiMatchers from '@nomicfoundation/hardhat-ethers-chai-matchers';
import hardhatMocha from '@nomicfoundation/hardhat-mocha';
import hardhatVerify from '@nomicfoundation/hardhat-verify';
import * as dotenv from 'dotenv';
import type { HardhatUserConfig } from 'hardhat/config';
import { defineConfig, task } from 'hardhat/config';
import type { HardhatPlugin } from 'hardhat/types/plugins';

dotenv.config();

const pluginAccounts: HardhatPlugin = {
  id: 'local:accounts',
  tasks: [
    task('accounts', 'Prints the list of accounts')
      .setAction(async () => import('./src/tasks/accounts.js'))
      .build(),
  ],
};

const hardhatUserConfig: HardhatUserConfig = defineConfig({
  plugins: [
    hardhatEthers,
    hardhatEthersChaiMatchers,
    hardhatMocha,
    hardhatVerify,
    pluginAccounts,
  ],
  solidity: '0.8.28',
  ...(process.env.ROPSTEN_URL && {
    networks: {
      ropsten: {
        type: 'http',
        url: process.env.ROPSTEN_URL,
        accounts:
          process.env.PRIVATE_KEY !== undefined
            ? [process.env.PRIVATE_KEY]
            : [],
      },
    },
  }),
  ...(process.env.ETHERSCAN_API_KEY && {
    verify: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
      },
    },
  }),
  paths: {
    sources: 'src/contracts',
    cache: 'build/cache',
    artifacts: 'build/artifacts',
  },
  test: {
    mocha: {
      spec: ['src/**/*.soltest.ts', 'src/**/__soltests__/**/*.ts'],
    },
  },
});

export default hardhatUserConfig;
