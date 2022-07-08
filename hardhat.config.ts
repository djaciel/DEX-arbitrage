import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import 'hardhat-docgen';
import 'hardhat-abi-exporter';
import networks from './hardhat.network';

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: networks,
  gasReporter: {
    currency: 'USD',
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
    except: ['./test'],
  },
  abiExporter: {
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [':Arbitrage$'],
  },
  contractSizer: {
    runOnCompile: true,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
};

export default config;
