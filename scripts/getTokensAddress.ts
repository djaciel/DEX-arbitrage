import hre, { ethers } from 'hardhat';
import { bscSwapRouters } from './swapRouters/bsc';
import { IUniswapV2Router02 } from '../typechain-types/interfaces/IUniswapV2Router02';
import { IUniswapV2Pair } from '../typechain-types/interfaces/IUniswapV2Pair';
import { fantomPairData } from '../data/pairs/fantomData';
import { IToken } from './interfaces/IToken';
import { IERC20 } from '../typechain-types/interfaces/IERC20';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const tokens: IToken[] = [];
    const tokensAddress: string[] = [];

    for (const pair of fantomPairData) {
      console.log('reading pairs')
      const pairContract = (await ethers.getContractAt(`IUniswapV2Pair`, pair.pairAddress)) as IUniswapV2Pair;
      tokensAddress.push(await pairContract.token0());
      tokensAddress.push(await pairContract.token1());
    }

    const tokensWithoutDuplicates = tokensAddress.filter((item, index) => tokensAddress.indexOf(item) === index);

    for (const address of tokensWithoutDuplicates) {
      console.log('reading tokens')
      const token0Contract = (await ethers.getContractAt(`IERC20`, address)) as IERC20;
      tokens.push({
        address: address,
        decimals: await token0Contract.decimals(),
        symbol: await token0Contract.symbol(),
      });
    }

    console.log('tokens', JSON.stringify(tokens));

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