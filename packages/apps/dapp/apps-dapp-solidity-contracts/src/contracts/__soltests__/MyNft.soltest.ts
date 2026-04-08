import { expect } from 'chai';
import type { ContractTransactionResponse } from 'ethers';
import { network } from 'hardhat';

const { ethers } = await network.create();

describe('MyNft', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const FiredGuys = await ethers.getContractFactory('FiredGuys');
    const firedGuys = await FiredGuys.deploy();
    await firedGuys.waitForDeployment();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataUri = 'cid/test.png';

    expect(await firedGuys.balanceOf(recipient)).to.equal(0);

    const newlyMintedToken = (await firedGuys.payToMint(
      recipient,
      metadataUri,
      {
        value: ethers.parseEther('0.05'),
      },
    )) as ContractTransactionResponse;

    await newlyMintedToken.wait();

    expect(await firedGuys.balanceOf(recipient)).to.equal(1);

    expect(await firedGuys.isContentOwned(metadataUri)).to.equal(true);
  });
});
