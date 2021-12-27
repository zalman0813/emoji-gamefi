import { ethers } from 'ethers'

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
	// We are in the browser and metamask is running.
	window.ethereum.request({ method: "eth_requestAccounts" });
	web3 = new Web3(window.ethereum);
  } else {
	// We are on the server *OR* the user is not running metamask
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	web3 = new Web3(provider);
  }