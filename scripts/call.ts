import hre from 'hardhat';
import { bscSwapRouters } from './swapRouters/bsc';
import { bscTokens } from './tokens/bsc';
import { ActionStruct, Arbitrage } from '../typechain-types/Arbitrage';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const { ethers, deployments } = hre;

    //const chainId = network.config.chainId || 0;

    const arbitrageDeployed = await deployments.get('Arbitrage');
    console.log('arbitrageDeployed', arbitrageDeployed.address)
    const arbitrage = await ethers.getContractAt(arbitrageDeployed.abi, arbitrageDeployed.address) as Arbitrage;

    const action: ActionStruct = {
      router_a: bscSwapRouters.pancakeswap.router,
      router_b: bscSwapRouters.apeswap.router,
      token_a: bscTokens.usdt,
      token_b: bscTokens.wbnb,
      token_c: bscTokens.eth,
      path_a: [bscTokens.usdt, bscTokens.wbnb],
      path_b: [bscTokens.wbnb, bscTokens.eth],
      path_c: [bscTokens.eth, bscTokens.usdt],
      amountIn: '1000000000000000000',
    };

    const values = await arbitrage.performArbitrage(action);

    for (const value of values) {
      console.log('values', value.toString())
    }

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

func();
