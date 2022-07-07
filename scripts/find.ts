import axios from 'axios';
import { getAddress } from 'ethers/lib/utils';
import hre from 'hardhat';
import { IData } from './interfaces/IPair';

const func = async () => {
  async function main() {
    await hre.run('compile');

    const { data } = await axios.get<IData>(
      'https://api.dexscreener.com/latest/dex/tokens/0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    );

    console.log(JSON.stringify(data));

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
