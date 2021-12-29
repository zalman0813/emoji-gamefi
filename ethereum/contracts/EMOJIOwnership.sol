// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import './EMOJIToken.sol';
import './EMOJIFactory.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract EMOJIOwnership is ReentrancyGuard, EMOJIFactory{
	EMOJIToken public rwd;
	address payable owner;

	constructor(EMOJIToken rwd_) EMOJIFactory(msg.sender) {
		rwd = rwd_;
		owner = payable(msg.sender);
	}

	// Coin Token Swap 
	function exchangeTokens(uint256 amount, uint256 price) public payable nonReentrant {
		require(msg.value == price, 'Please submit the asking price in order to continue');
		rwd.transfer(msg.sender, amount);	
		payable(owner).transfer(msg.value);
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