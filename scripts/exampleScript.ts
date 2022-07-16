import hre, { ethers } from 'hardhat';
import { routers, tokens } from '../data/fantom';
import { IUniswapV2Router02 } from '../typechain-types/interfaces/IUniswapV2Router02';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const usdcAddress = tokens['USDC'].address;
    const wftmAddress = tokens['WFTM'].address;
    const routerContract = (await ethers.getContractAt(
      `IUniswapV2Router02`,
      routers['spookyswap']
    )) as IUniswapV2Router02;

    const amounts = await routerContract.getAmountsOut('1000000', [usdcAddress, wftmAddress]);

    console.log(amounts[0].toString(), amounts[1].toString());
    console.log(JSON.stringify(amounts[0]));

    const number = ethers.BigNumber.from('1000000');
    console.log(JSON.stringify(number));

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
