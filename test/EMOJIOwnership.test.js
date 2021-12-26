const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Item } = require("semantic-ui-react");

let emojiToken;
let emojiTokenAddress;
let emojiOwnership;
let emojiOwnershipAddress;
let accounts;

beforeEach( async () => {
	// test for different addresses from different users - test accounts
    // return an array of however many addresses
	accounts = await ethers.getSigners();

    const EMOJIToken = await hre.ethers.getContractFactory("EMOJIToken");
	emojiToken = await EMOJIToken.deploy();
	await emojiToken.deployed();
	emojiTokenAddress = emojiToken.address;

	const EMOJIOwnership = await hre.ethers.getContractFactory("EMOJIOwnership");
	emojiOwnership = await EMOJIOwnership.deploy(emojiTokenAddress);
	await emojiOwnership.deployed();
	emojiOwnershipAddress = emojiOwnership.address;
	// Transfer all tokens to emojiOwnership (1 million)
	await emojiToken.transfer(emojiOwnershipAddress, '1000000000000000000000000');

});

describe('EMOJIOwnership', () => {
	it('EMOJIOwnership has 1 million EMO Tokens', async () => {
		const emoTokens = await emojiToken.balanceOf(emojiOwnershipAddress);
		expect('1000000000000000000000000').to.equal(emoTokens);
	});

	it('Should trade 100 EMOJI tokens', async () => {
		const buyerAddress = accounts[1];
		const ammount = 100;
		const etherPrice = ammount*0.0001;
		const tokenPrice = ethers.utils.parseUnits(etherPrice.toString(), 'ether');
		await emojiOwnership.connect(buyerAddress).buyTokens( ammount.toString(), tokenPrice, {
			value: tokenPrice
		});
		const emoTokens = await emojiToken.balanceOf(buyerAddress['address']);
		expect('100').to.equal(emoTokens);
	}); 
});