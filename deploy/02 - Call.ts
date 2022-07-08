import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ActionStruct, Arbitrage } from '../typechain-types/Arbitrage';
import { bscSwapRouters } from '../scripts/swapRouters/bsc';
import { bscTokens } from '../scripts/tokens/bsc';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  async function main() {

    const { ethers, deployments } = hre;

    //const chainId = network.config.chainId || 0;

    const arbitrageDeployed = await deployments.get('Arbitrage');
    const arbitrage = await ethers.getContractAt(arbitrageDeployed.abi, arbitrageDeployed.address) as Arbitrage;

    const action: ActionStruct = {
      router_a: bscSwapRouters.pancakeswap.router,
      router_b: bscSwapRouters.apeswap.router,
      token_a: bscTokens.usdt,
      token_b: bscTokens.wbnb,
      token_c: bscTokens.eth,
      amountIn: ethers.utils.parseEther('1'),
      path_a: [bscTokens.usdt, bscTokens.wbnb],
      path_b: [bscTokens.wbnb, bscTokens.eth],
      path_c: [bscTokens.eth, bscTokens.usdt],
    };

    const values = arbitrage.performArbitrage(action);

    console.log('values', values)

    console.log(`Done!`);

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
