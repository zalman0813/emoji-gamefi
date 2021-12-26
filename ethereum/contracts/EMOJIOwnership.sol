// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import './EMOJIToken.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract EMOJIOwnership is ReentrancyGuard{
	EMOJIToken public rwd;
	address payable owner;

	constructor(EMOJIToken rwd_) public {
		rwd = rwd_;
		owner = payable(msg.sender);
	}

	// Coin Token Swap 
	function buyTokens(uint256 amount, uint256 price) public payable nonReentrant {
		require(msg.value == price, 'Please submit the asking price in order to continue');
		require(rwd.balanceOf(owner) >= amount, "ERC20: transfer amount exceeds balance");
		rwd.transfer(msg.sender, amount);	
		payable(owner).transfer(msg.value);
	}

	// issue rewards
	function issueTokens(address recipient) private {
		rwd.transfer(recipient, 1);
	}
}