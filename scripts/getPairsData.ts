import axios from 'axios';
import hre from 'hardhat';
import { fantomPairs } from '../data/pairs/fantom';
import { IData, ISimplePair } from './interfaces/IPair';

const apiUrl = 'https://api.dexscreener.com/latest/dex/pairs/fantom/';

const getData = async (params: string) => {
  const { data } = await axios.get<IData>(apiUrl + params);

  const { pairs } = data;

  const pairsFound: ISimplePair[] = [];

  for (const pair of pairs) {
    pairsFound.push({
      dexId: pair.dexId,
      liquidity: pair.liquidity.usd,
      pairAddress: pair.pairAddress,
      pair: [`${pair.baseToken.symbol}-${pair.dexId}`, `${pair.quoteToken.symbol}-${pair.dexId}`],
    });
  }

  return pairsFound;
};

const func = async () => {
  async function main() {
    await hre.run('compile');

    let params = '';
    let pairsFound: ISimplePair[] = [];

    for (let i = 0; i < fantomPairs.length; i++) {
      params += fantomPairs[i] + ',';

      if (i % 25 === 0) {
        params += fantomPairs[i];
        const pairsGot = await getData(params);
        pairsFound = [...pairsFound, ...pairsGot];
        params = '';
      }
    }

    console.log(JSON.stringify(pairsFound));

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
