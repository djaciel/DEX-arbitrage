import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  async function main() {

    const {deployments, getNamedAccounts} = hre;

    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    await deploy('Arbitrage', {
      from: deployer,
      log: true,
    });

    return true;
  }

  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  await main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
};

export default func;
