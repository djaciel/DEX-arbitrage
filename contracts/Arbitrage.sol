//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IERC20.sol";
import "hardhat/console.sol";

contract Arbitrage is Ownable {
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
        uint256 amountToPay;
        uint256 deadline;
    }

    struct ActionQuote {
        IUniswapV2Router02 router_a;
        IUniswapV2Router02 router_b;
        address[] path_a;
        address[] path_b;
        address[] path_c;
        uint256 amountToken_a;
    }

    event Quote(uint256[] amounts);
    event Swap(address[] tokens, uint256[] amounts);

    function withdrawal(address token) external onlyOwner {
        IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }

    function performArbitrage(Action calldata _action) external {
        if (IERC20(_action.token_a).balanceOf(address(this)) > _action.amountToken_a) {
            performSwap(_action);
        } else {
            address token0 = _action.pair.token0();
            bytes memory action = abi.encode(_action);

            if (token0 == _action.token_a) {
                _action.pair.swap(_action.amountToken_a, 0, address(this), action);
            } else {
                _action.pair.swap(0, _action.amountToken_a, address(this), action);
            }
        }
    }

    function uniswapV2Call(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        afterCall(amount0, amount1, data);
    }

    function pancakeCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        afterCall(amount0, amount1, data);
    }

    function hook(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        afterCall(amount0, amount1, data);
    }

    function wigoswapCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        afterCall(amount0, amount1, data);
    }

    function soulswapCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        afterCall(amount0, amount1, data);
    }

    function elkCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external payable {
        afterCall(amount0, amount1, data);
    }

    function afterCall(
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) internal {
        assert(amount0 == 0 || amount1 == 0);
        Action memory action = abi.decode(data, (Action));
        uint256 swapResponse = performSwap(action);
        require(swapResponse > action.amountToPay, "not enough");
        IERC20(action.token_a).transfer(msg.sender, action.amountToPay);
    }

    function performSwap(Action memory action) internal returns (uint256) {
        ActionQuote memory actionQuote = ActionQuote(
            action.router_a,
            action.router_b,
            action.path_a,
            action.path_b,
            action.path_c,
            action.amountToken_a
        );
        uint256[] memory amountOutValues = getAmounts(actionQuote);
        uint256[] memory swapResponse;

        swapResponse = action.router_a.swapTokensForExactTokens(
            amountOutValues[0],
            action.amountToken_a,
            action.path_a,
            address(this),
            action.deadline
        );

        emit Swap(action.path_a, swapResponse);

        swapResponse = action.router_b.swapTokensForExactTokens(
            amountOutValues[1],
            amountOutValues[0],
            action.path_b,
            address(this),
            action.deadline
        );

        emit Swap(action.path_b, swapResponse);

        swapResponse = action.router_a.swapTokensForExactTokens(
            amountOutValues[2],
            amountOutValues[1],
            action.path_c,
            address(this),
            action.deadline
        );

        emit Swap(action.path_c, swapResponse);

        return swapResponse[1];
    }

    function getAmounts(ActionQuote memory actionQuote) public view returns (uint256[] memory) {
        uint256[] memory values = new uint256[](3);

        values[0] = actionQuote.router_a.getAmountsOut(actionQuote.amountToken_a, actionQuote.path_a)[1];
        values[1] = actionQuote.router_b.getAmountsOut(values[0], actionQuote.path_b)[1];
        values[2] = actionQuote.router_a.getAmountsOut(values[1], actionQuote.path_c)[1];

        return values;
    }

    function approveTokens(address[] calldata tokens, address router) external onlyOwner {
        for (uint256 i = 0; i < tokens.length; i++) {
            IERC20(tokens[i]).approve(router, type(uint256).max);
        }
    }
}
