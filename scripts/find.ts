import axios from 'axios';
import hre from 'hardhat';
import { IData } from './interfaces/IPair';

const func = async () => {
  async function main() {
    await hre.run('compile');
    const token = '0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3';

    const { data } = await axios.get<IData>('https://api.dexscreener.com/latest/dex/tokens/' + token);

    const { pairs } = data;

    for (const pair of pairs) {
      if (Number(pair.liquidity.usd) > 100) {
        const msg = `
          base: ${pair.baseToken.symbol}
          swap: ${pair.dexId}
          pairAddress: ${pair.pairAddress}
          quoteToken: ${pair.quoteToken.symbol}
          liquidity: ${pair.liquidity.usd.toString()}
          -------------------------------------
        `;
        console.log(msg);
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
