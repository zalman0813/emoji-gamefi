const hre = require("hardhat");
const fs = require('fs');

async function main() {
	const EMOJIToken = await hre.ethers.getContractFactory("EMOJIToken");
	const emojiToken = await EMOJIToken.deploy();
	await emojiToken.deployed();
	console.log("emojiToken contract deployed to: ", emojiToken.address);
	let config = `
	export const emojiaddress = '${emojiToken.address}'
	`
	let data = JSON.stringify(config)
	fs.writeFileSync('config.js', JSON.parse(data))
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});