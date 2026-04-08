import type { NewTaskActionFunction } from 'hardhat/types/tasks';

const accountsAction: NewTaskActionFunction = async (_, hre) => {
  const { ethers } = await hre.network.create();
  const accounts = await ethers.getSigners();
  accounts.forEach((account) => {
    console.log(account.address);
  });
};

export default accountsAction;
