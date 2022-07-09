import hre from 'hardhat';
import { bscSwapRouters } from './swapRouters/bsc';
import { bscTokens } from './tokens/bsc';
import { ActionStruct, Arbitrage } from '../typechain-types/Arbitrage';
import { IERC20 } from '../typechain-types/interfaces/IERC20';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const { ethers, deployments, getNamedAccounts } = hre;
    const richAddress = '0x8894E0a0c962CB723c1976a4421c95949bE2D4E3';
    const {deployer} = await getNamedAccounts();

    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [richAddress],
    });

    const richSigner = ethers.provider.getSigner(richAddress);
    const tokenContract = await ethers.getContractAt(`IERC20`, bscTokens.usdt) as IERC20;
    const arbitrageContract = await deployments.get('Arbitrage');

    // tokenContract.connect(richSigner).transfer(arbitrageContract.address, '10000000000000000000');

    console.log('Arbitrage contract: ', arbitrageContract.address)
    const arbitrage = await ethers.getContractAt(arbitrageContract.abi, arbitrageContract.address) as Arbitrage;

    console.log('deployer ETH balance: ', (await ethers.provider.getBalance(deployer)).toString());
    console.log('arbitrageContract Token balance: ', (await tokenContract.balanceOf(arbitrageContract.address)).toString());

    const action: ActionStruct = {
      router_a: bscSwapRouters.pancakeswap.router,
      router_b: bscSwapRouters.apeswap.router,
      pair: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae',
      token_a: bscTokens.usdt,
      token_b: bscTokens.wbnb,
      token_c: bscTokens.eth,
      path_a: [bscTokens.usdt, bscTokens.wbnb],
      path_b: [bscTokens.wbnb, bscTokens.eth],
      path_c: [bscTokens.eth, bscTokens.usdt],
      amountToAsk: '100000000000000000',
      amountToPay: '100200000000000000',
      deadline: 1720506758
    };

    await arbitrage.performArbitrage(action);

    console.log('deployer ETH balance: ', (await ethers.provider.getBalance(deployer)).toString());
    console.log('arbitrageContract Token balance: ', (await tokenContract.balanceOf(arbitrageContract.address)).toString());

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
