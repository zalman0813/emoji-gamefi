const hre = require("hardhat");
const fs = require('fs');

async function main() {
	const EMOJIToken = await hre.ethers.getContractFactory("EMOJIToken");
	const emojiToken = await EMOJIToken.deploy();
	await emojiToken.deployed();
	console.log("emojiToken contract deployed to: ", emojiToken.address);

	const EMOJIOwnership = await hre.ethers.getContractFactory("EMOJIOwnership");
	const emojiOwnership = await EMOJIOwnership.deploy(emojiToken.address);
	await emojiOwnership.deployed();
	console.log("emojiOwnership contract deployed to: ", emojiOwnership.address);	

	// Transfer all tokens to emojiOwnership (1 million)
	await emojiToken.transfer(emojiOwnership.address, '1000000000000000000000000')

	let config = `
	export const emojiTokenAddress = '${emojiToken.address}'
	export const emojiOwnershipAddress = '${emojiOwnership.address}'
	`
	let data = JSON.stringify(config);
	fs.writeFileSync('config.js', JSON.parse(data));
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});