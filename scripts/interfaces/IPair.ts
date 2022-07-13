export interface IData {
  pairs: IPair[];
}

export interface IPair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: IBaseToken;
  quoteToken: IQuoteToken;
  priceNative: string;
  priceUsd: string;
  liquidity: Iliquidity;
}

export interface IBaseToken {
  address: string;
  name: string;
  symbol: string;
}

export interface IQuoteToken {
  symbol: string;
}

export interface Iliquidity {
  usd: string;
}

export interface ISimplePair {
  dexId: string;
  pairAddress: string;
  liquidity: string;
  pair: string[];
}