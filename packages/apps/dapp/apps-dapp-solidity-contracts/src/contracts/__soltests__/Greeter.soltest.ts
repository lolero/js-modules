import { expect } from 'chai';
import type { ContractTransactionResponse } from 'ethers';
import { network } from 'hardhat';

const { ethers } = await network.create();

describe('Greeter', function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy('Hello, world!');
    await greeter.waitForDeployment();

    expect(await greeter.greet()).to.equal('Hello, world!');

    const setGreetingTx = (await greeter.setGreeting(
      'Hola, mundo!',
    )) as ContractTransactionResponse;

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
