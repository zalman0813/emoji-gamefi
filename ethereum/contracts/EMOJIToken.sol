// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EMOJIToken is ERC20 {
    constructor() ERC20("EMOJI Token", "EMO") public {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
    
}
