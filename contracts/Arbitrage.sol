//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IERC20.sol";
import "hardhat/console.sol";

struct Action {
    IUniswapV2Router02 router_a;
    IUniswapV2Router02 router_b;
    address token_a;
    address token_b;
    address token_c;
    address[] path_a;
    address[] path_b;
    address[] path_c;
    uint256 amountIn;
}

contract Arbitrage {
    function performArbitrage(Action calldata action) external view returns(uint256[] memory) {
        uint256[] memory values = new uint256[](3);

        values[0] = action.router_a.getAmountsOut(action.amountIn, action.path_a)[1];
        values[1] = action.router_b.getAmountsOut(values[0], action.path_b)[1];
        values[2] = action.router_a.getAmountsOut(values[1], action.path_c)[1];

        return values;
    }
}
