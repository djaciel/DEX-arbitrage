import hre, { deployments, ethers } from 'hardhat';
import { paths, routers, tokens } from '../data/fantom';
import { Arbitrage } from '../typechain-types/contracts/Arbitrage';
import { IUniswapV2Router02 } from '../typechain-types/contracts/interfaces/IUniswapV2Router02';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const arbitrageContract = await deployments.get('Arbitrage');
    const usdcAddress = tokens['USDC'].address;

    // ['WFTM-spookyswap', 'USDC-spookyswap', 'TSHARE-tombswap', 'WFTM-spookyswap']
    for (const path of paths) {
      const token_a = tokens[path[0].split('-')[0]].address;
      const token_b = tokens[path[1].split('-')[0]].address;
      const token_c = tokens[path[2].split('-')[0]].address;
      const swapper_a = path[0].split('-')[1];
      const swapper_b = path[2].split('-')[1];

      const path_a = [token_a, token_b];
      const path_b = [token_b, token_c];
      const path_c = [token_c, token_a];

      const router_a = routers[swapper_a];
      const router_b = routers[swapper_b];

      const routerContract = (await ethers.getContractAt(`IUniswapV2Router02`, router_a)) as IUniswapV2Router02;

      let amountToAsk;
      if (usdcAddress === token_a) {
        amountToAsk = ethers.BigNumber.from('500000');
      } else {
        try {
          amountToAsk = (await routerContract.getAmountsOut('500000', [usdcAddress, token_a]))[1];
        } catch (error) {
          console.log('error in getAmountsOut', [usdcAddress, token_a]);
          continue;
        }
      }

      const actionQuote: Arbitrage.ActionQuoteStruct = {
        amountToken_a: amountToAsk.toString(),
        path_a: path_a,
        path_b: path_b,
        path_c: path_c,
        router_a: router_a,
        router_b: router_b,
      };

      try {
        const arbitrage = (await ethers.getContractAt(arbitrageContract.abi, arbitrageContract.address)) as Arbitrage;
        const values = await arbitrage.getAmounts(actionQuote);

        if (values[2].gt(amountToAsk)) {
          console.log(`
          -------------------
          path - ${path}
          amountToAsk - ${amountToAsk}
          ${values[0].toString()} - ${values[1].toString()} - ${values[2].toString()}
          -------------------
          `);
        } else {
          console.log(`nop
          amountToAsk - ${amountToAsk}
          ${values[0].toString()} - ${values[1].toString()} - ${values[2].toString()}`);
        }
      } catch (error) {
        console.log('one failed');
        console.log(JSON.stringify(actionQuote));
      }
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
