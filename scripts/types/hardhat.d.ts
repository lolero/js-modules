declare module '@nomicfoundation/hardhat-chai-matchers';
declare module 'solidity-coverage';

declare module 'mocha' {
  interface MochaOptions {
    spec?: string | string[];
  }
}
