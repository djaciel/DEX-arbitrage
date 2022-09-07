# DEX Arbitrage

This project was created for academic purposes. It is far from being profitable.

1. Get pairs list from dexscreener
  - Use inspect and grab the pair addresses from the html code
  - Save it on ./data/network/pairs.ts

2. Get pairsData using dexscreener API
  - Run yarn getPairsData, this will print the pairs data from the API
  - Save it on ./data/network/pairsData.ts

3. Get pairsPaths
  - Run yarn getPairsPaths, this builds the paths to do arbitrage, between addresses that share a liquiquidity pool (pair address)
  - Save it on ./data/network/paths.ts
  - TODO: This script can be improved to find better paths. For example.
  - Triple Swap A-B(DEX A) B-C(DEX B) C-A(DEX A). Currently implemented
  - Triple Swap Single (only in the same DEX); A-B(DEX A) B-C(DEX A) C-A(DEX A)
  - Double Swap A-B(DEX A) B-A(DEX B)

4. Get tokens
  - Run yarn getTokensAddress, this get the tokens used in the differents pairs address.
  - Save it on ./data/network/tokens.ts

5. Get routes
  - This is manually. We need to find the router address for each Swapper. This address must be an UniswapV2 router.
  - Save it on ./data/network/routers.ts
