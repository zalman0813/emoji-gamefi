import { ethers } from 'ethers'

let provider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
	// We are in the browser and metamask is running.
	window.ethereum.request({ method: "eth_requestAccounts" });
	provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
	provider = new ethers.providers.JsonRpcProvider();
}

export default provider;