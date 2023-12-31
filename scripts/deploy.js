const hre = require("hardhat");

async function main() {
  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy();

  await faucet.deployed();

  console.log(`Contract deployed to ${faucet.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
