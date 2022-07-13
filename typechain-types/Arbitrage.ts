/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type ActionStruct = {
  router_a: PromiseOrValue<string>;
  router_b: PromiseOrValue<string>;
  pair: PromiseOrValue<string>;
  token_a: PromiseOrValue<string>;
  token_b: PromiseOrValue<string>;
  token_c: PromiseOrValue<string>;
  path_a: PromiseOrValue<string>[];
  path_b: PromiseOrValue<string>[];
  path_c: PromiseOrValue<string>[];
  amountToken_a: PromiseOrValue<BigNumberish>;
  amountToken_b: PromiseOrValue<BigNumberish>;
  amountToken_c: PromiseOrValue<BigNumberish>;
  amountToPay: PromiseOrValue<BigNumberish>;
  deadline: PromiseOrValue<BigNumberish>;
};

export type ActionStructOutput = [
  string,
  string,
  string,
  string,
  string,
  string,
  string[],
  string[],
  string[],
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  router_a: string;
  router_b: string;
  pair: string;
  token_a: string;
  token_b: string;
  token_c: string;
  path_a: string[];
  path_b: string[];
  path_c: string[];
  amountToken_a: BigNumber;
  amountToken_b: BigNumber;
  amountToken_c: BigNumber;
  amountToPay: BigNumber;
  deadline: BigNumber;
};

export interface ArbitrageInterface extends utils.Interface {
  functions: {
    "apeCall(address,uint256,uint256,bytes)": FunctionFragment;
    "approveTokens(address[],address)": FunctionFragment;
    "getAmounts((address,address,address,address,address,address,address[],address[],address[],uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
    "pancakeCall(address,uint256,uint256,bytes)": FunctionFragment;
    "performArbitrage((address,address,address,address,address,address,address[],address[],address[],uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "apeCall"
      | "approveTokens"
      | "getAmounts"
      | "pancakeCall"
      | "performArbitrage"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "apeCall",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "approveTokens",
    values: [PromiseOrValue<string>[], PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmounts",
    values: [ActionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "pancakeCall",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "performArbitrage",
    values: [ActionStruct]
  ): string;

  decodeFunctionResult(functionFragment: "apeCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "approveTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAmounts", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pancakeCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "performArbitrage",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Arbitrage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ArbitrageInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    apeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveTokens(
      tokens: PromiseOrValue<string>[],
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAmounts(
      action: ActionStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    pancakeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    performArbitrage(
      _action: ActionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  apeCall(
    sender: PromiseOrValue<string>,
    amount0: PromiseOrValue<BigNumberish>,
    amount1: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveTokens(
    tokens: PromiseOrValue<string>[],
    router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAmounts(
    action: ActionStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  pancakeCall(
    sender: PromiseOrValue<string>,
    amount0: PromiseOrValue<BigNumberish>,
    amount1: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  performArbitrage(
    _action: ActionStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    apeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveTokens(
      tokens: PromiseOrValue<string>[],
      router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAmounts(
      action: ActionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    pancakeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    performArbitrage(
      _action: ActionStruct,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    apeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveTokens(
      tokens: PromiseOrValue<string>[],
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAmounts(
      action: ActionStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pancakeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    performArbitrage(
      _action: ActionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    apeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveTokens(
      tokens: PromiseOrValue<string>[],
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAmounts(
      action: ActionStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pancakeCall(
      sender: PromiseOrValue<string>,
      amount0: PromiseOrValue<BigNumberish>,
      amount1: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    performArbitrage(
      _action: ActionStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}