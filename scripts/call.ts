import hre from 'hardhat';
import { tokens, routers } from '../data/fantom';
import { Arbitrage } from '../typechain-types/contracts/Arbitrage';
import { IERC20 } from '../typechain-types/contracts/interfaces/IERC20';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const { ethers, deployments, getNamedAccounts } = hre;
    const richAddress = '0x5aa1039d09330df607f88e72bb9c1e0f66c96aa0';
    const { deployer } = await getNamedAccounts();

    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [richAddress],
    });

    const richSigner = ethers.provider.getSigner(richAddress);
    const tokenContract = (await ethers.getContractAt(`IERC20`, tokens['USDC'].address)) as IERC20;
    const arbitrageContract = await deployments.get('Arbitrage');

    console.log('Arbitrage contract: ', arbitrageContract.address);
    const arbitrage = (await ethers.getContractAt(arbitrageContract.abi, arbitrageContract.address)) as Arbitrage;

    if ((await tokenContract.balanceOf(arbitrageContract.address)).isZero()) {
      await tokenContract.connect(richSigner).transfer(arbitrageContract.address, '100000000');
      const tokensArr = [tokens['USDC'].address, tokens['WFTM'].address, tokens['DAI'].address];
      await arbitrage.approveTokens(tokensArr, routers['spookyswap']);
      await arbitrage.approveTokens(tokensArr, routers['protofi']);
      console.log('tokens sent');
      return;
    }

    console.log('deployer ETH balance: ', (await ethers.provider.getBalance(deployer)).toString());
    console.log(
      'arbitrageContract Token balance: ',
      (await tokenContract.balanceOf(arbitrageContract.address)).toString()
    );

    const action: Arbitrage.ActionStruct = {
      router_a: routers['spookyswap'],
      router_b: routers['protofi'],
      pair: '0xD343b8361Ce32A9e570C1fC8D4244d32848df88B',
      token_a: tokens['USDC'].address,
      token_b: tokens['WFTM'].address,
      token_c: tokens['DAI'].address,
      path_a: [tokens['USDC'].address, tokens['WFTM'].address],
      path_b: [tokens['WFTM'].address, tokens['DAI'].address],
      path_c: [tokens['DAI'].address, tokens['USDC'].address],
      amountToken_a: '1000000',
      amountToPay: '1003000',
      deadline: 1720506758,
    };

    await arbitrage.performArbitrage(action);

    console.log('deployer ETH balance: ', (await ethers.provider.getBalance(deployer)).toString());
    console.log(
      'arbitrageContract Token balance: ',
      (await tokenContract.balanceOf(arbitrageContract.address)).toString()
    );

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
