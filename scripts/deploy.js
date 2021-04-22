// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const BN = require('bn.js');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const YAOToken = await hre.ethers.getContractFactory("YAOToken");
  const yao = await YAOToken.deploy("Treasury Wallet Address", new BN("37034997000000000000000000").toString());

  await yao.deployed();

  console.log("YAO token smart contract address:", yao.address);
  console.log("YAO token name:", await yao.name());
  console.log("YAO token symbol:", await yao.symbol());
  console.log("YAO token decimals:", await yao.decimals());
  console.log("YAO token total supply:", (await yao.totalSupply()).toString());
  console.log("YAO token amount of account:", (await yao.balanceOf("Treasury Wallet Address")).toString());

  const DAOstake = await hre.ethers.getContractFactory("DAOstake");
  const dao = await DAOstake.deploy("Treasury Wallet Address", "Community Wallet Address", yao.address);

  await yao.deployed();

  console.log("DAO stake smart contract address:", dao.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
