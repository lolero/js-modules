import { network } from 'hardhat';

async function main(): Promise<void> {
  const { ethers } = await network.create();

  const Greeter = await ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');

  await greeter.waitForDeployment();

  console.log('Greeter deployed to:', await greeter.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
