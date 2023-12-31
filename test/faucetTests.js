const { expect } = require("chai");

describe("Faucet", function () {
  let withdrawAmount;
  let owner, addr2;
  let faucet;

  beforeEach(async () => {
    const Faucet = await ethers.getContractFactory("Faucet");
    faucet = await Faucet.deploy();

    [owner, addr2] = await ethers.getSigners();

    withdrawAmount = ethers.utils.parseUnits("1", "ether");
  });

  it("should deploy and set the owner correctly", async () => {
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withdrawals above .1 ETH at a time", async () => {
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it("should not others can destroy the faucet", async () => {
    await expect(faucet.connect(addr2).destroyFaucet()).to.be.reverted;
  });

  it("should only owner can destroy the faucet", async () => {
    await faucet.connect(owner).destroyFaucet();
  });
});
