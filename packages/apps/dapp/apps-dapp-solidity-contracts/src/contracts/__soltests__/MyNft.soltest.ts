import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyNft', () => {
  it('Should mint and transfer an NFT to someone', async () => {
    const FiredGuys = await ethers.getContractFactory('FiredGuys');
    const firedGuys = await FiredGuys.deploy();
    await firedGuys.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataUri = 'cid/test.png';

    let balance = await firedGuys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await firedGuys.payToMint(recipient, metadataUri, {
      value: ethers.utils.parseEther('0.05'),
    });

    await newlyMintedToken.wait();

    balance = await firedGuys.balanceOf(recipient);

    expect(balance).to.equal(1);

    expect(await firedGuys.isContentOwned(metadataUri)).to.equal(true);
  });
});
