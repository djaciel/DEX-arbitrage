//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IERC20.sol";
import "hardhat/console.sol";

struct Action {
    IUniswapV2Router02 router_a;
    IUniswapV2Router02 router_b;
    IUniswapV2Pair pair;
    address token_a;
    address token_b;
    address token_c;
    address[] path_a;
    address[] path_b;
    address[] path_c;
    uint256 amountToken_a;
    uint256 amountToken_b;
    uint256 amountToken_c;
    uint256 amountToPay;
    uint256 deadline;
}

contract Arbitrage {
    function performArbitrage(Action calldata _action) external {
        address token0 = _action.pair.token0();
        bytes memory action = abi.encode(_action);

        if (token0 == _action.token_a) {
            _action.pair.swap(_action.amountToken_a, 0, address(this), action);
        } else {
            _action.pair.swap(0, _action.amountToken_a, address(this), action);
        }
    }

    function apeCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        assert(amount0 == 0 || amount1 == 0);

        Action memory action = abi.decode(data, (Action));

        uint256 amountReceived_a = performSwap(action);

        //require(amountReceived_a > action.amountToPay, "not enough");

        IERC20(action.token_a).transfer(msg.sender, action.amountToPay);
    }

    function pancakeCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        assert(amount0 == 0 || amount1 == 0);

        Action memory action = abi.decode(data, (Action));

        uint256 amountReceived_a = performSwap(action);

        //require(amountReceived_a > action.amountToPay, "not enough");

        IERC20(action.token_a).transfer(msg.sender, action.amountToPay);
    }

    function performSwap(Action memory action) internal returns (uint256) {
        uint256[] memory amountOutValues = getAmounts(action);

        action.router_a.swapTokensForExactTokens(
            amountOutValues[0],
            action.amountToken_a,
            action.path_a,
            address(this),
            action.deadline
        );

        action.router_b.swapTokensForExactTokens(
            amountOutValues[1],
            action.amountToken_b,
            action.path_b,
            address(this),
            action.deadline
        );

        return action.router_a.swapTokensForExactTokens(
            amountOutValues[2],
            action.amountToken_c,
            action.path_c,
            address(this),
            action.deadline
        )[1];
    }

    function getAmounts(Action memory action) public view returns (uint256[] memory) {
        uint256[] memory values = new uint256[](3);

        values[0] = action.router_a.getAmountsOut(action.amountToken_a, action.path_a)[1];
        values[1] = action.router_b.getAmountsOut(values[0], action.path_b)[1];
        values[2] = action.router_a.getAmountsOut(values[1], action.path_c)[1];

        return values;
    }

    function approveTokens(address[] calldata tokens, address router) external {
        for (uint256 i = 0; i < tokens.length; i++) {
            IERC20(tokens[i]).approve(router, type(uint256).max);
        }
    }
}

// pair address
// amount0, amount1
