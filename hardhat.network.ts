import { HardhatUserConfig } from 'hardhat/config';
import * as dotenv from 'dotenv';

dotenv.config();

const alchemyUrl = process.env.ALCHEMY_URL || '';
const infuraApiKey = process.env.INFURA_API_KEY;
const mnemonic = process.env.HDWALLET_MNEMONIC;
const forkEnabled = process.env.FORK_ENABLED || false;

const networks: HardhatUserConfig['networks'] = {
  localhost: {
    live: true,
    chainId: 56,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
  },
};

if (forkEnabled) {
  networks.hardhat = {
    live: true,
    chainId: 56,
    forking: {
      url: 'https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3',
    },
    accounts: {
      mnemonic,
    },
  };
} else {
  networks.hardhat = {
    live: false,
    allowUnlimitedContractSize: true,
  };
}

if (mnemonic) {
  networks.bsc = {
    live: true,
    chainId: 56,
    url: 'https://bsc-dataseed.binance.org',
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.bscTestnet = {
    live: true,
    chainId: 97,
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.polygon = {
    live: true,
    chainId: 137,
    url: 'https://polygon-rpc.com',
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.polygonMumbai = {
    live: true,
    chainId: 80001,
    url: 'https://rpc-mumbai.maticvigil.com/',
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.telos = {
    live: true,
    chainId: 40,
    url: 'https://mainnet.telos.net/evm',
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.telosTestnet = {
    live: true,
    chainId: 41,
    url: 'https://testnet.telos.net/evm',
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.fantom = {
    live: true,
    chainId: 250,
    url: 'https://rpc3.fantom.network',
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.harmony = {
    live: true,
    chainId: 1666600000,
    url: 'https://s2.api.harmony.one',
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };
  
}

if (infuraApiKey && mnemonic) {
  networks.kovan = {
    live: true,
    url: `https://kovan.infura.io/v3/${infuraApiKey}`,
    chainId: 42,
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.ropsten = {
    live: true,
    url: `https://ropsten.infura.io/v3/${infuraApiKey}`,
    chainId: 3,
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.rinkeby = {
    live: true,
    url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY,
    blockGasLimit: 8000000,
    chainId: 4,
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.mainnet = {
    live: true,
    url: alchemyUrl,
    chainId: 1,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };
} else {
  console.warn('No infura or hdwallet available for testnets');
}

export default networks;
