import axios from 'axios';
import hre from 'hardhat';

const func = async () => {
  async function main() {
    await hre.run('compile');

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
