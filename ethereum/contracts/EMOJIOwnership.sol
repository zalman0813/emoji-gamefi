// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import './EMOJIToken.sol';
import './EMOJIFactory.sol';
import './EMOJIMarket.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract EMOJIOwnership is ReentrancyGuard, EMOJIFactory, EMOJIMarket{
	EMOJIToken public rwd;
	address payable bookmaker;

	constructor(EMOJIToken rwd_) EMOJIFactory(msg.sender) {
		rwd = rwd_;
		bookmaker = payable(msg.sender);
	}

	// Coin Token Swap 
	function exchangeTokens(uint256 amount, uint256 price) public payable nonReentrant {
		require(msg.value == price, 'Please submit the asking price in order to continue');
		rwd.transfer(msg.sender, amount);	
		payable(bookmaker).transfer(msg.value);
	}

	function drawTreasure(string memory tokenURI, uint256 amount) public returns(uint) {
		rwd.transfer(msg.sender, amount);
		uint256 newItemId = mintToken(tokenURI);
		return newItemId;
	}

	// issue rewards
	function issueTokens(address recipient) private {
		rwd.transfer(recipient, 1);
	}
}