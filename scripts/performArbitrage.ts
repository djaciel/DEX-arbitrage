import hre, { deployments, ethers } from 'hardhat';
import { paths, routers, tokens } from '../data/fantom';
import { ActionQuoteStruct, ActionStruct, Arbitrage } from '../typechain-types/Arbitrage';
import { IERC20 } from '../typechain-types/interfaces/IERC20';
import { IUniswapV2Router02 } from '../typechain-types/interfaces/IUniswapV2Router02';

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

      const actionQuote: ActionQuoteStruct = {
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

// const { ethers, deployments, getNamedAccounts } = hre;
//     const { deployer } = await getNamedAccounts();

//     const tokenContract = (await ethers.getContractAt(`IERC20`, bscTokens.usdt)) as IERC20;
//     const arbitrageContract = await deployments.get('Arbitrage');

//     const arbitrage = (await ethers.getContractAt(arbitrageContract.abi, arbitrageContract.address)) as Arbitrage;

//     // console.log('deployer ETH balance: ', (await ethers.provider.getBalance(deployer)).toString());
//     // console.log(
//     //   'arbitrageContract Token balance: ',
//     //   (await tokenContract.balanceOf(arbitrageContract.address)).toString()
//     // );

//     // // const action: ActionStruct = {
//     // //   router_a: bscSwapRouters.pancakeswap.router,
//     // //   router_b: bscSwapRouters.apeswap.router,
//     // //   pair: '0x83c5b5b309ee8e232fe9db217d394e262a71bcc0',
//     // //   token_a: bscTokens.usdt,
//     // //   token_b: bscTokens.wbnb,
//     // //   token_c: bscTokens.eth,
//     // //   path_a: [bscTokens.usdt, bscTokens.wbnb],
//     // //   path_b: [bscTokens.wbnb, bscTokens.eth],
//     // //   path_c: [bscTokens.eth, bscTokens.usdt],
//     // //   amountToken_a: '1000000000000000000',
//     // //   amountToken_b: '0',
//     // //   amountToken_c: '0',
//     // //   amountToPay: '2000000000000000000',
//     // //   deadline: 1720506758,
//     // // };

//     const values = await arbitrage.getAmounts(action);
//     const number = ethers.BigNumber.from(ethers.utils.parseUnits('1.0',2).toString()).toString()

//     const amT_a = values[0].mul(number).toString();
//     const amT_b = values[1].mul(number).toString();
//     const amT_c = values[2].mul(number).toString();
//     console.log(amT_a, amT_b, amT_c)

//     action.amountToken_a = amT_a;
//     action.amountToken_b = amT_b;
//     action.amountToken_c = amT_c;

//     await arbitrage.performArbitrage(action);

//     console.log('deployer ETH balance: ', (await ethers.provider.getBalance(deployer)).toString());
//     console.log(
//       'arbitrageContract Token balance: ',
//       (await tokenContract.balanceOf(arbitrageContract.address)).toString()
//     );
