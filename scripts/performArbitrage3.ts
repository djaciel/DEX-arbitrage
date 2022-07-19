import hre, { deployments, ethers } from 'hardhat';
import { pairsData, paths, routers, tokens } from '../data/fantom';
import { Arbitrage } from '../typechain-types/contracts/Arbitrage';
import { IUniswapV2Router02 } from '../typechain-types/contracts/interfaces/IUniswapV2Router02';
import BigNumber from 'bignumber.js';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const arbitrageContract = await deployments.get('Arbitrage');
    const usdcAddress = tokens['USDC'].address;
    const amount = '100000';
    const forever = true;

    while (forever) {
      // ['WFTM-spookyswap', 'USDC-spookyswap', 'TSHARE-tombswap', 'WFTM-spookyswap']
      for (let i = 700; i < 1050; i++) {
        const path = paths[i];
        const token_a = tokens[path[0].split('-')[0]].address;
        const tokenDecimals_a = tokens[path[0].split('-')[0]].decimals;
        const token_b = tokens[path[1].split('-')[0]].address;
        const token_c = tokens[path[2].split('-')[0]].address;
        const swapper_a = path[0].split('-')[1];
        const swapper_b = path[2].split('-')[1];

        const path_a = [token_a, token_b];
        const path_b = [token_b, token_c];
        const path_c = [token_c, token_a];

        const router_a = routers[swapper_a];
        const router_b = routers[swapper_b];

        let routerContract = (await ethers.getContractAt(`IUniswapV2Router02`, router_a)) as IUniswapV2Router02;

        let amountToAsk;
        if (usdcAddress === token_a) {
          amountToAsk = ethers.BigNumber.from(amount);
        } else {
          try {
            amountToAsk = (await routerContract.getAmountsOut(amount, [usdcAddress, token_a]))[1];
          } catch (error) {
            routerContract = (await ethers.getContractAt(`IUniswapV2Router02`, router_b)) as IUniswapV2Router02;
            try {
              amountToAsk = (await routerContract.getAmountsOut(amount, [usdcAddress, token_a]))[1];
            } catch (error) {
              console.log(`error [${i}] in getAmountsOut`);
              continue;
            }
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

          const amountToAskBN = new BigNumber(amountToAsk.toString()).multipliedBy(1.003);
          const amountToPay = ethers.BigNumber.from(amountToAskBN.toFixed(tokenDecimals_a).toString().split('.')[0]);

          if (values[2].gt(amountToAsk)) {
            console.log(`
          ----- YEAHHHHH ----- [${i}]
          path - ${path}
          amountToAsk - ${amountToAsk}
          ${values[0].toString()} - ${values[1].toString()} - ${values[2].toString()}
          `);

            if (!values[2].gt(amountToPay)) {
              console.log('not enough :(');
              continue;
            }

            let pairAddress = pairsData.find((x) => x.pair.includes(path[0]))?.pairAddress;
            if (!pairAddress) {
              pairAddress = pairsData.find((x) => x.pair.includes(path[1]))?.pairAddress;
            }

            try {
              console.log('Trying arbitrage!!');
              const action: Arbitrage.ActionStruct = {
                router_a: router_a,
                router_b: router_b,
                pair: pairAddress || '',
                token_a: token_a,
                token_b: token_b,
                token_c: token_c,
                path_a: [token_a, token_b],
                path_b: [token_b, token_c],
                path_c: [token_c, token_a],
                amountToken_a: amountToAsk,
                amountToPay: amountToPay,
                deadline: 1720506758,
              };
              console.log('action', action);
              await arbitrage.performArbitrage(action);
            } catch (error) {
              console.log('no se pudo');
              continue;
            }
          } else {
            console.log(`nop [${i}] amountToAsk - ${amountToAsk} - ${values[2].toString()}`);
          }
        } catch (error) {
          console.log(`error [${i}] one failed`);
        }
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
