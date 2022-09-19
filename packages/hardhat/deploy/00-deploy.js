// deploy/00_deploy_my_contract.js

// const { ethers } = require("hardhat");

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const token = await deploy("IBoolaTokenV", {
    from: deployer,
    args: [],
    log: true,
  });

  await deploy("IBoolaContractV", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    args: [ token.address ],
    log: true,
  });

  // await deploy("SupportToken", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   //args: [ "Hello", ethers.utils.parseEther("1.5") ],
  //   log: true,
  // });

  // Getting a previously deployed contract
  // const Greeter = new ethers.Contract("Greeter", deployer);

  // await Greeter.setGreeting("Hello Celo!");

  /*
  // If you want to send value to an address from the deployer
  
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some CELO to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
    value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
    LibraryName: **LibraryAddress**
  });
  */

//   Generating typings for: 0 artifacts in dir: types for target: web3-v1
// Successfully generated 42 typings!
// deploying "IBoolaTokenV" (tx: 0x3560170f91544678deb72f7fdb485f681a6584901ed57c2cf8aa239c42bef824)...: deployed at 0x6984495194dad4C9d8e6f99EAd5Bd3b1783aF024 with 1702714 gas
// deploying "IBoolaContractV" (tx: 0x0a0e8349e42a75f77aec755a89a75ae94a9764e0c67839127e79f6e7a458f994)...: deployed at 0xd6a981aAC71aC3A4825B5851EaE08b6F842C53c9 with 5135526 gas
// Done in 22.22s.
};

module.exports.tags = ["IBoolaTokenV", "IBoolaContractV"];
